<script setup>
  import {
    SkyWayContext,
    SkyWayRoom,
    SkyWayStreamFactory,
  } from '@skyway-sdk/room';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const ENTER_ROOM_KEY = 'enter_room';
  const LEAVE_ROOM_KEY = 'leave_room';
  const SUBMIT_TEXT_KEY = 'submit_text';
  const router = useRouter();
  // ブラウザバックを無効化
  // addEventListener('popstate', () => {
  //   router.push('/call');
  // });
  window.addEventListener('popstate', () => {
    console.log('ボタンがクリックされました');
    leaveFunction();
  });
  const myName = ref('');
  const inputSubmitData = ref('');
  const isShowPopup = ref(true);
  let localVideoPublication = null;
  let localAudioPublication = null;
  let localDataPublication = null;
  let channelMember = null;
  let context = null;
  let channel = null;

  const memberList = [];
  const { textMove } = useTextMove();
  const { createRemoteDivAudio, createRemoteDivVideo } = useCallTag();
  // const { dataConnection, dataSubmit, initData } = useCall();

  const myMemberData = {
    dataTyepe: ENTER_ROOM_KEY,
    name: null,
    id: null,
    audioID: null,
    dataID: null,
    videoID: null,
  };
  let dataStream = null;
  let audioStream = null;
  let videoStream = null;
  const setName = () => {
    if (myName.value === '') {
      return;
    }
    isShowPopup.value = false;
    calltSart();
  };

  const writeFunction = () => {
    // 送信ボタンを押したときの処理を作成
    const submitData = {
      dataTyepe: SUBMIT_TEXT_KEY,
      text: inputSubmitData.value,
    };
    dataStream.write(submitData);
    textMove(inputSubmitData.value);
    inputSubmitData.value = '';
  };
  const leaveRoom = () => {
    channelMember = null;
    localVideoPublication = null;
    localAudioPublication = null;
    localDataPublication = null;
    channel = null;
    context = null;
    videoStream = null;
    audioStream = null;
    return navigateTo({
      path: routePathList('call_list'),
    });
  };
  const leaveFunction = () => {
    // 退室ボタンを押したときの処理
    // NOTE:抜ける前にみんなに退室を知らせる
    myMemberData.dataTyepe = LEAVE_ROOM_KEY;
    dataStream?.write(myMemberData);
    localVideoPublication.disable();
    localAudioPublication.disable();
    channelMember.leave();
    channel.dispose();
    context.dispose();
    leaveRoom();
  };

  const videoChange = () => {
    localVideoPublication.disable();
    localAudioPublication.disable();
    localVideoPublication.enable();
    localAudioPublication.enable();
    // channelMember.unpublish(videoStream);
    // channelMember.unpublish(audioStream);
  };
  const calltSart = async function () {
    // const { audio, video } =
    //   await SkyWayStreamFactory.createMicrophoneAudioAndCameraStream();
    videoStream = await SkyWayStreamFactory.createCameraVideoStream();
    audioStream = await SkyWayStreamFactory.createMicrophoneAudioStream();
    dataStream = await SkyWayStreamFactory.createDataStream();
    const remoteMediaArea = document.getElementById('remote-media-area');
    const remoteAudioArea = document.getElementById('remote-audio-area');
    // initData();
    // 自分のビデオエリア作成
    const localVideo = document.createElement('video');
    const divVideo = createLocalDivVideo(myName.value);
    localVideo.playsInline = true;
    localVideo.autoplay = true;
    videoStream.attach(localVideo);
    divVideo.appendChild(localVideo);
    remoteMediaArea.appendChild(divVideo);
    await localVideo.play();

    // dataConnection = dataConnectionCall();
    const taken = await skywayToken();
    context?.dispose();
    context = await SkyWayContext.Create(taken);
    channel = await SkyWayRoom.FindOrCreate(context, {
      // TODO:sfuに変更すればsfu通信に変わる（DATA通信ができないっぽい）
      type: 'p2p',
      // TODO:ROOMのIDに修正
      name: 'nihei',
    });
    channelMember = await channel.join();

    localVideoPublication = await channelMember.publish(videoStream);
    localAudioPublication = await channelMember.publish(audioStream);
    // localVideoPublication.disable();

    localDataPublication = await channelMember.publish(dataStream);

    const subscribeAndAttach = async (publication) => {
      if (publication.publisher.id === channelMember.id) return;

      const { stream } = await channelMember.subscribe(publication.id);
      switch (stream.contentType) {
        case 'video':
          {
            const divVideo = createRemoteDivVideo(stream);
            remoteMediaArea.appendChild(divVideo);
          }
          break;
        case 'audio':
          {
            // TODO:多分これAudioに入れるんじゃなくてビデオに入れる
            const divAudio = createRemoteDivAudio(stream);
            remoteAudioArea.appendChild(divAudio);
          }
          break;
        case 'data': {
          // データコネクション
          myMemberData.id = channelMember.id;
          myMemberData.audioID = audioStream.id;
          myMemberData.videoID = videoStream.id;
          myMemberData.name = myName.value;
          stream.onData.add((receiveData) => {
            // NOTE:きたデータをうけ取る
            if (receiveData.dataTyepe === ENTER_ROOM_KEY) {
              // NOTE:新しく入ってきたメンバーのデータの受け取り
              addMember(receiveData);
            } else if (receiveData.dataTyepe === LEAVE_ROOM_KEY) {
              // NOTE:抜けるメンバーのデータの受け取り
              deleteMember(receiveData.id);
            } else if (receiveData.dataTyepe === SUBMIT_TEXT_KEY) {
              // TODO:チャットを受け取った処理を作成する
              textMove(receiveData.text);
            }
          });
          // NOTE:入ってきた人に向けて自分の情報を送信する
          dataStream.write(myMemberData);
        }
      }
    };
    channel.publications.forEach(subscribeAndAttach);
    channel.onStreamPublished.add((e) => {
      subscribeAndAttach(e.publication);
    });

    channel.onMemberLeft.add((e) => {
      deleteMember(e.member.id);
    });

    function addMember(member) {
      // メンバーが入室したときの処理
      if (isOldMember(member.id)) {
        return;
      }
      dataStream.write(myMemberData);
      const memberData = {
        name: member.name,
        id: member.id,
        audioID: member.audioID,
        dataID: member.dataID,
        videoID: member.videoID,
      };
      memberList.push(memberData);

      // videoに名前を入れる
      Array.from(document.getElementsByClassName('js-video-id')).forEach(
        (e) => {
          if (e.value === member.videoID) {
            const divName = createVideoName(member.name);
            e.closest('.js-video-area').appendChild(divName);
          }
        }
      );
    }
    function deleteMember(memberId) {
      // メンバーが退出したときの処理
      if (!isOldMember(memberId)) {
        return;
      }
      const member = memberList.find((element) => element.id === memberId);
      // ビデオを削除
      Array.from(document.getElementsByClassName('js-video-id')).forEach(
        (e) => {
          if (e.value === member.videoID) {
            e.closest('.js-video-area').remove();
          }
        }
      );
      // オーディオを削除
      Array.from(document.getElementsByClassName('js-audio-id')).forEach(
        (e) => {
          console.log(e.value);
          console.log(member.audioID);
          if (e.value === member.audioID) {
            e.closest('.js-audio-area').remove();
          }
        }
      );
      // memberListから削除
      memberList.splice(
        memberList.value.findIndex((element) => element.id === memberId),
        1
      );
    }
    function isOldMember(memberId) {
      const oldMember = memberList.find((element) => element.id === memberId);
      return oldMember !== undefined;
    }
  };
</script>
<template>
  <div>
    <div class="z-50 m-5 flex justify-between">
      <div class="flex">
        <p class="text-3xl font-bold">星空の夜に語ろう</p>
        <div class="flex items-center justify-center">
          <button
            class="focus:shadow-outline mx-2 rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-700 focus:outline-none"
            type="button"
            @click="leaveFunction"
          >
            退室する
          </button>
        </div>
      </div>
      <div id="my_icon_name">{{ myName }}</div>
    </div>
    <div v-show="isShowPopup" class="fixed inset-0 z-30 bg-black bg-opacity-50">
      <div class="flex h-full w-full items-center justify-center">
        <div class="w-1/2 rounded-md bg-white px-10 py-6">
          <div class="mb-4">
            <label for="member_name" class="mb-2 block font-bold text-gray-700"
              >名前</label
            >
            <input
              id="member_name"
              v-model="myName"
              type="text"
              placeholder="表示する名前を入力してください "
              class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            />
          </div>
          <div class="mb-4 flex justify-around">
            <button
              class="focus:shadow-outline rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-700 focus:outline-none"
              type="button"
              @click="leaveRoom"
            >
              退室する
            </button>
            <button
              class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="button"
              @click="setName"
            >
              設定する
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      id="remote-media-area"
      class="justify-left grid w-full grid-cols-2 items-center justify-center p-8 lg:grid-cols-3"
    ></div>
    <div class="fixed bottom-0 mx-auto w-full bg-gray-300 p-6">
      <div class="">
        <button
          class="focus:shadow-outline mb-2 rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-700 focus:outline-none"
          type="button"
          @click="videoChange"
        >
          ビデオ切り替え
        </button>
      </div>
      <div
        class="flex items-center overflow-hidden rounded-lg border border-gray-300"
      >
        <input
          v-model="inputSubmitData"
          type="text"
          placeholder="送信したいメッセージを入力してください"
          class="w-full bg-white px-4 py-2 text-gray-700 focus:outline-none"
        />
        <button
          class="min-w-[150px] bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
          @click="writeFunction"
        >
          送信する
        </button>
      </div>
    </div>
    <div id="remote-audio-area" hidden></div>
  </div>
</template>

<style>
  .video-class {
    width: 100%;
    background-color: black;
    position: relative;
    video {
      width: 100%;
      padding: 2px;
    }
    .video-name {
      position: absolute;
      top: 0px;
      width: 100%;
      background-color: black;
      color: white;
      opacity: 60%;
      padding-left: 5px;
      padding-right: 5px;
    }
  }
</style>

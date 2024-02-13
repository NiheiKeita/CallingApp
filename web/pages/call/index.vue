<script setup>
  import {
    SkyWayContext,
    SkyWayRoom,
    SkyWayStreamFactory,
  } from '@skyway-sdk/room';
  import { ref } from 'vue';
  const ENTER_ROOM_KEY = 'enter_room';
  const LEAVE_ROOM_KEY = 'leave_room';
  const SUBMIT_TEXT_KEY = 'submit_text';

  const myName = ref('');
  const inputSubmitData = ref('');
  const isShowPopup = ref(true);
  const memberList = [];

  let dataConnection = null;
  const myMemberData = {
    dataTyepe: ENTER_ROOM_KEY,
    name: null,
    id: null,
    audioID: null,
    dataID: null,
    videoID: null,
  };

  const { audio, video } =
    await SkyWayStreamFactory.createMicrophoneAudioAndCameraStream();
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
    dataConnection.write(submitData);
    createText(inputSubmitData.value);
    inputSubmitData.value = '';
  };
  const leaveRoom = () => {
    return navigateTo({
      path: routePathList('call_list'),
    });
  };
  const leaveFunction = () => {
    // 退室ボタンを押したときの処理
    // NOTE:抜ける前にみんなに退室を知らせる
    myMemberData.dataTyepe = LEAVE_ROOM_KEY;
    dataConnection.write(myMemberData);
    leaveRoom();
  };
  const calltSart = async function () {
    const remoteMediaArea = document.getElementById('remote-media-area');
    const remoteAudioArea = document.getElementById('remote-audio-area');

    // 自分のビデオエリア作成
    const divVideo = createLocalDivVideo(myName.value);
    const localVideo = document.createElement('video');
    localVideo.playsInline = true;
    localVideo.autoplay = true;
    video.attach(localVideo);
    divVideo.appendChild(localVideo);
    remoteMediaArea.appendChild(divVideo);
    await localVideo.play();

    dataConnection = await SkyWayStreamFactory.createDataStream();
    const taken = await skywayToken();
    const context = await SkyWayContext.Create(taken);
    const channel = await SkyWayRoom.FindOrCreate(context, {
      // TODO:sfuに変更すればsfu通信に変わる（DATA通信ができないっぽい）
      type: 'p2p',
      // TODO:ROOMのIDに修正
      name: 'nihei',
    });
    const me = await channel.join();

    await me.publish(video);
    await me.publish(audio);
    await me.publish(dataConnection);

    const subscribeAndAttach = async (publication) => {
      if (publication.publisher.id === me.id) return;

      const { stream } = await me.subscribe(publication.id);
      switch (stream.contentType) {
        case 'video':
          {
            // 入ってきた人のvideoを作成する
            const divVideo = createRemoteDivVideo(stream.id);
            const remoteVideo = document.createElement('video');
            remoteVideo.playsInline = true;
            remoteVideo.autoplay = true;
            stream.attach(remoteVideo);
            divVideo.appendChild(remoteVideo);
            remoteMediaArea.appendChild(divVideo);
          }
          break;
        case 'audio':
          {
            // 入ってきた人のAudioを作成する
            const divAudio = document.createElement('div');
            divAudio.setAttribute('class', 'js-audio-area');
            const elm = document.createElement('audio');
            const inputAudioID = document.createElement('input');
            inputAudioID.setAttribute('value', stream.id);
            inputAudioID.setAttribute('class', 'js-audio-id');
            inputAudioID.setAttribute('type', 'hidden');
            elm.controls = true;
            elm.autoplay = true;
            stream.attach(elm);
            divAudio.appendChild(elm);
            divAudio.appendChild(inputAudioID);
            remoteAudioArea.appendChild(divAudio);
          }
          break;
        case 'data': {
          // データコネクション
          myMemberData.id = me.id;
          myMemberData.audioID = me.id;
          myMemberData.dataID = audio.id;
          myMemberData.videoID = video.id;
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
              // elm.innerText += receiveData.text + '\n';
              createText(receiveData.text);
            }
          });

          // NOTE:入ってきた人にいｊぶデータ通信が確立されたときにその人に向けて自分のUserIDと表示の名前を送信する
          dataConnection.write(myMemberData);
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
      // elm.innerText += member.name + 'が入室しました' + '\n';

      dataConnection.write(myMemberData);
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
      const oldMember = memberList.find((element) => element.id == memberId);
      return oldMember !== undefined;
    }
  };
  let count = 0;
  const createText = async (comment) => {
    const divText = document.createElement('div');
    divText.id = 'text' + count; // アニメーション処理で対象の指定に必要なidを設定
    count++;
    divText.style.position = 'fixed'; // テキストのは位置を絶対位置にするための設定
    divText.style.whiteSpace = 'nowrap'; // 画面右端での折り返しがなく、画面外へはみ出すようにする
    divText.style.left = document.documentElement.clientWidth + 'px'; // 初期状態の横方向の位置は画面の右端に設定
    const random = Math.round(
      Math.random() * document.documentElement.clientHeight
    );
    divText.style.top = random + 'px'; // 初期状態の縦方向の位置は画面の上端から下端の間に設定（ランダムな配置に）
    divText.appendChild(document.createTextNode(comment)); // 画面上に表示されるテキストを設定
    divText.style.fontSize = '20px'; // 流れるコメントのサイズを設定
    document.body.appendChild(divText); // body直下へ挿入
    // ライブラリを用いたテキスト移動のアニメーション： durationはアニメーションの時間、
    // 横方向の移動距離は「画面の横幅＋画面を流れるテキストの要素の横幅」、移動中に次の削除処理がされないようawait
    await gsap.to('#' + divText.id, {
      duration: 5,
      x: -1 * (document.documentElement.clientWidth + divText.clientWidth),
    });
    divText.parentNode.removeChild(divText); // 画面上の移動終了後に削除
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
          id="video_change"
          class="focus:shadow-outline mb-2 rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-700 focus:outline-none"
          type="button"
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

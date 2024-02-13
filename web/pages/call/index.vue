<script setup>
  import {
    nowInSec,
    SkyWayAuthToken,
    SkyWayContext,
    SkyWayRoom,
    SkyWayStreamFactory,
    uuidV4,
  } from '@skyway-sdk/room';
  import { ref } from 'vue';
  // const appConfig = useAppConfig();
  const configContentful = useRuntimeConfig();
  // console.log(appConfig);
  console.log(configContentful.public.APP_ID);
  const token = new SkyWayAuthToken({
    jti: uuidV4(),
    iat: nowInSec(),
    exp: nowInSec() + 60 * 60 * 24,
    scope: {
      app: {
        id: configContentful.public.APP_ID,
        turn: true,
        actions: ['read'],
        channels: [
          {
            id: '*',
            name: '*',
            actions: ['write'],
            members: [
              {
                id: '*',
                name: '*',
                actions: ['write'],
                publication: {
                  actions: ['write'],
                },
                subscription: {
                  actions: ['write'],
                },
              },
            ],
            sfuBots: [
              {
                actions: ['write'],
                forwardings: [
                  {
                    actions: ['write'],
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  }).encode(configContentful.public.SECRET_ID);

  const roomNameInput = ref('');
  const myId = ref('');
  const { audio, video } =
    await SkyWayStreamFactory.createMicrophoneAudioAndCameraStream();

  const joinButton = async function () {
    const buttonArea = document.getElementById('button-area');
    const remoteMediaArea = document.getElementById('remote-media-area');

    if (roomNameInput.value === '') return;

    const context = await SkyWayContext.Create(token);
    const room = await SkyWayRoom.FindOrCreate(context, {
      type: 'p2p',
      name: roomNameInput.value,
    });
    const me = await room.join();

    myId.value = me.id;

    await me.publish(audio);
    await me.publish(video);

    const subscribeAndAttach = (publication) => {
      if (publication.publisher.id === me.id) return;

      const subscribeButton = document.createElement('button');
      subscribeButton.textContent = `${publication.publisher.id}: ${publication.contentType}`;
      buttonArea.appendChild(subscribeButton);

      subscribeButton.onclick = async () => {
        const { stream } = await me.subscribe(publication.id);

        let newMedia;
        switch (stream.track.kind) {
          case 'video':
            newMedia = document.createElement('video');
            newMedia.playsInline = true;
            newMedia.autoplay = true;
            break;
          case 'audio':
            newMedia = document.createElement('audio');
            newMedia.controls = true;
            newMedia.autoplay = true;
            break;
          default:
            return;
        }
        stream.attach(newMedia);
        remoteMediaArea.appendChild(newMedia);
      };
    };

    room.publications.forEach(subscribeAndAttach);
    room.onStreamPublished.add((e) => subscribeAndAttach(e.publication));
  };

  onMounted(async () => {
    const localVideo = document.getElementById('local-video');

    video.attach(localVideo);
    await localVideo.play();
  });
</script>
<template>
  <div>
    <p>
      ID: <span id="my-id">{{ myId }}</span>
    </p>
    <div>
      room name: <input id="room-name" v-model="roomNameInput" type="text" />
      <button id="join" @click="joinButton">join</button>
    </div>
    <video id="local-video" width="400" muted playsinline></video>
    <div id="button-area"></div>
    <div id="remote-media-area"></div>
  </div>
</template>

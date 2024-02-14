export const useCallTag = () => {
  const createRemoteDivAudio = function (stream: any): any {
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
    return divAudio;
  };
  const createRemoteDivVideo = function (stream: any): any {
    const divVideo = document.createElement('div');
    divVideo.setAttribute('class', 'js-video-area video-class');
    const inputVideoID = document.createElement('input');
    inputVideoID.setAttribute('value', stream.id);
    inputVideoID.setAttribute('class', 'js-video-id');
    inputVideoID.setAttribute('type', 'hidden');
    divVideo.appendChild(inputVideoID);
    const remoteVideo = document.createElement('video');
    remoteVideo.playsInline = true;
    remoteVideo.autoplay = true;
    stream.attach(remoteVideo);
    divVideo.appendChild(remoteVideo);
    return divVideo;
  };
  return { createRemoteDivAudio, createRemoteDivVideo };
};

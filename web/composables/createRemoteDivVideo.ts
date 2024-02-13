export function createRemoteDivVideo(remoteId: string): any {
  const divVideo = document.createElement('div');
  divVideo.setAttribute('class', 'js-video-area video-class');
  const inputVideoID = document.createElement('input');
  inputVideoID.setAttribute('value', remoteId);
  inputVideoID.setAttribute('class', 'js-video-id');
  inputVideoID.setAttribute('type', 'hidden');
  divVideo.appendChild(inputVideoID);
  return divVideo;
}

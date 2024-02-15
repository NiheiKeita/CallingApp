export function createLocalDivVideo(name: string): any {
  const divVideo = document.createElement('div');
  divVideo.setAttribute('class', 'video-class');
  const divName = createVideoName(name);
  divVideo.appendChild(divName);
  return divVideo;
}

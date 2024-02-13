export function createLocalDivVideo(name: string): any {
  const divVideo = document.createElement('div');
  divVideo.setAttribute('class', 'video-class');
  // const divName = document.createElement('div');
  // divName.innerText = name;
  // divName.setAttribute('class', 'video-name');
  const divName = createVideoName(name);
  divVideo.appendChild(divName);
  return divVideo;
}

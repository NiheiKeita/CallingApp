export function createVideoName(name: string): any {
  const divName = document.createElement('div');
  divName.innerText = name;
  divName.setAttribute('class', 'video-name');
  return divName;
}

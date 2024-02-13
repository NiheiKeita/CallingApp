export function routePathList(pathName: String, id = 0) {
  let route = '/';
  switch (pathName) {
    case 'call_screen':
      route = '/call';
      break;
    case 'call_list':
      route = '/';
      break;
    default:
      route = '/';
  }
  return route;
}

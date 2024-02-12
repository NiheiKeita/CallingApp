export function routePathList(pathName: String, id = 0) {
  let route = '/';
  switch (pathName) {
    case 'information_list':
      route = '/informations';
      break;
    case 'information_detail':
      route = '/informations/' + id;
      break;
    case 'goods_list':
      route = '/goods';
      break;
    case 'character_list':
      route = '/characters';
      break;
    case 'character_ando':
      route = '/characters/ando';
      break;
    case 'character_neko_chan':
      route = '/characters/neko-chan';
      break;
    case 'character_paprika':
      route = '/characters/paprika';
      break;
    case 'character_koto':
      route = '/characters/koto';
      break;

    case 'stamp_ando':
      route =
        'https://line.me/S/sticker/16355691/?lang=ja&utm_source=gnsh_stickerDetail';
      break;
    case 'stamp_koto':
      route =
        'https://store.line.me/stickershop/product/18427147/ja?from=sticker';
      break;
    case 'stamp_paprika':
      route =
        'https://store.line.me/stickershop/product/18427147/ja?from=sticker';
      break;
    case 'stamp_neko_chan':
      route =
        'https://store.line.me/stickershop/product/18427147/ja?from=sticker';
      break;

    case 'shop_neko_chan_sticker':
      route = 'https://suzuri.jp/nakinaki02/5822806/sticker/m/white';
      break;
    case 'shop_neko_chan_sweat':
      route = 'https://suzuri.jp/nakinaki02/5822806/big-sweat/m/white';
      break;
    case 'shop_neko_chan_cup':
      route = 'https://suzuri.jp/nakinaki02/5822806/mug/m/white';
      break;

    case 'shop_ando_t-shirt':
      route = 'https://suzuri.jp/nakinaki02/15014443/t-shirt/s/white';
      break;
    case 'shop_ando_smartphone_case':
      route =
        'https://suzuri.jp/nakinaki02/15014443/clear-smartphone-case/iphone15/clear';
      break;
    case 'shop_ando_cup':
      route = 'https://suzuri.jp/nakinaki02/15014443/mug/m/white';
      break;

    case 'sns_x':
      route = 'https://x.com/andou_san_dayo?s=21&t=XsUEUglZD1BLrqDy4Ts-PA';
      break;
    case 'sns_suzuri':
      route = 'https://suzuri.jp/nakinaki02/home';
      break;

    default:
      route = '/';
  }
  return route;
}

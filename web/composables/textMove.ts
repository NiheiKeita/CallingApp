import { gsap } from 'gsap';

let count = 0;
export const useTextMove = () => {
  const textMove = async function (comment: string) {
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
    divText.removeChild(divText); // 画面上の移動終了後に削除
  };

  return { textMove };
};

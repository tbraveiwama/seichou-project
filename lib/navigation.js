//コンポーネント外で宣言した変数は、レンダリングが起きても変わることがない
//ページの遷移回数を記録するファイル
let pageViews = 0;

export function markPageView() {
  pageViews += 1;
}

//判定
export function hasInAppHistory() {
  if (pageViews > 1) {
    return true;
  } else {
    return false;
  }
}

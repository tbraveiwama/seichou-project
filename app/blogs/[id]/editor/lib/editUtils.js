//環境変数
const ZERO_WIDTH_SPACE = "\u200B";

//使いたいプロパティを配列に格納
const styleArray = ["font-size", "font-weight", "color"];
const styleText = {
  code: "min-height:24px;background-color:#4b5563;border-radius:12px;color:white;padding:8px;margin-block:8px;",
  minTitle:
    "font-weight:700;font-size:24px;line-height:32px;border-bottom:1px solid;padding-bottom:4px;margin-block:8px;",
  mainText: "font-weight: normal;font-size: 16px",
};

//selectionとrangeを取得。選択範囲がbody外ならisOKをfalseに
function getSelectionAndRange() {
  let isOk = true;
  let range = null;
  //選択範囲を取得
  const selection = document.getSelection();
  //getRangeAtはselectionがないと例外が飛ぶので、確認してから処理
  if (selection.rangeCount !== 0) {
    range = selection.getRangeAt(0);
  }

  //body以外での使用を制限
  if (
    !callNodeInId(selection.anchorNode, "body") ||
    !callNodeInId(selection.focusNode, "body")
  )
    isOk = false;

  return {
    isOk: isOk,
    selection: selection,
    range: range,
  };
}

//その他の文字操作用※未完成
function wrapSelection(p) {
  const { isOk, selection, range } = getSelectionAndRange();
  if (!isOk) return;

  //選択範囲がない場合の処理
  //開始位置と終了位置が同じならtrueを返す
  if (selection.isCollapsed) {
    //<div>内に入っていれば中断
    if (callNodeInElement(selection.anchorNode, "DIV")) return;
    const newSpan = document.createElement("span");
    newSpan.style.cssText = p;
    //DOMの都合で「幅０だが一文字ある」状態の文字列を挿入する(これがないとキャレットを置く足場がない)
    const zwspNode = document.createTextNode(ZERO_WIDTH_SPACE);
    newSpan.appendChild(zwspNode);
    range.insertNode(newSpan);
    //新規範囲作成
    const newRange = document.createRange();
    newRange.setStart(newSpan.firstChild, 1);
    newRange.collapse(true);
    //範囲変更
    selection.removeAllRanges();
    selection.addRange(newRange);
    return;
  }

  //div内にいるのか、divを囲んでいるのか、始点又は終点がdiv内にあるかを判断し、適切な処理を行う
  switch (getDivSelectionRelation(selection)) {
    case "outside": {
      wrap(range, p);
      break;
    }
    case "inside": {
      wrap(range, p);
      break;
    }
    case "enclosed": {
      //切り出し
      const content = range.extractContents();
      //content内の<div>を配列化
      const divArray = Array.from(content.querySelectorAll("div"));
      //<div>の数だけループ
      divArray.forEach((div) => {
        //rangeを作って<div>を指定
        const divRange = document.createRange();
        divRange.selectNodeContents(div);
        // ラップ
        wrap(divRange, p);
      });
      range.insertNode(content);

      //残りの部分をラップ
      const firstRange = document.createRange();
      firstRange.setStart(range.startContainer, range.startOffset);
      firstRange.setEndBefore(divArray[0]);
      wrap(firstRange, p);

      const endRange = document.createRange();
      endRange.setStartAfter(divArray[divArray.length - 1]);
      endRange.setEnd(range.endContainer, range.endOffset);
      wrap(endRange, p);
    }
  }
  cleanUp("span");
}

//本文用
function mainText() {
  //キャレットの位置を取得
  const { isOk, selection, range } = getSelectionAndRange();
  if (!isOk) return;

  //キャレットの位置が<div>内なら改行して脱出する
  if (selection.isCollapsed) {
    const br = document.createElement("BR");
    InsertAndEscape(selection, br);
    return;
  }

  //div内にいるのか、divを囲んでいるのか、始点又は終点がdiv内にあるかを判断し、適切な処理を行う
  switch (getDivSelectionRelation(selection)) {
    case "outside": {
      wrap(range, styleText.mainText);
      break;
    }
    case "inside": {
      //親div取得
      const parent = callNodeInElement(selection.anchorNode, "DIV");
      //親divの頭から、rangeの前までを切り出し
      const firstRange = document.createRange();
      firstRange.setStartBefore(parent);
      firstRange.setEnd(range.startContainer, range.startOffset);
      const firstContent = firstRange.extractContents();
      //rangeの最後から、親divの最後までを切り出し
      const lastRange = document.createRange();
      lastRange.setEndAfter(parent);
      lastRange.setStart(range.endContainer, range.endOffset);
      const lastContent = lastRange.extractContents();
      //rangeの<div>を取る
      parent.before(firstContent);
      parent.after(lastContent);

      const children = [...parent.childNodes];
      const first = children[0];
      const last = children[children.length - 1];

      parent.replaceWith(...children);

      const newRange = document.createRange();
      newRange.setStartBefore(first);
      newRange.setEndAfter(last);
      wrap(newRange, styleText.mainText);

      cleanZwspTag("div");
      break;
    }
    case "enclosed":
    case "startInside":
    case "endInside":
    case "insideAnother": {
      //切り出し
      const content = range.extractContents();
      //content内の<div>を配列化
      const divArray = Array.from(content.querySelectorAll("div"));
      //<div>の数だけループ
      divArray.forEach((div) => {
        //展開
        div.replaceWith(...div.childNodes);
      });
      range.insertNode(content);
      wrap(range, styleText.mainText);
      cleanZwspTag("div");
      break;
    }
  }
  cleanUp("span");
}

//小見出し挿入用
function minTitle() {
  wrapDiv(styleText.minTitle, "mt", "小見出し");
}

//コード用の黒いエリアを出す
function code() {
  wrapDiv(styleText.code, "cd", "//ここにコードを入力");
}

//<div>に加工用※未完成
function wrapDiv(cssText, id, childText) {
  const { isOk, selection, range } = getSelectionAndRange();
  if (!isOk) return;
  console.log(getDivSelectionRelation(selection));

  //挿入するエレメントを宣言
  const div = document.createElement("div");
  div.style.cssText = cssText;
  div.id = id;

  switch (getDivSelectionRelation(selection)) {
    case "inside":
      //親<div>の参照を取得
      const parent = callNodeInElement(selection.anchorNode, "DIV");
      let firstContent;
      let lastContent;
      //選択範囲がキャレットのみ
      if (selection.isCollapsed) {
        //rangeに指定してクローン、結合、置き換え
        //初めからキャレットまで
        const firstRange = document.createRange();
        firstRange.setStartBefore(parent);
        firstRange.setEnd(selection.anchorNode, selection.anchorOffset);
        firstContent = firstRange.cloneContents();
        //キャレットから終わりまで
        const lastRange = document.createRange();
        lastRange.setStart(selection.anchorNode, selection.anchorOffset);
        lastRange.setEndAfter(parent);
        lastContent = lastRange.cloneContents();
        //「小見出し」
        const text = document.createTextNode(childText);
        div.appendChild(text);
        //選択範囲がある場合
      } else {
        //選択範囲のクローン
        const content = range.cloneContents();

        //ぴったり選択範囲が<div>とかぶっている場合に不具合が起こるため、rangeを広げる
        if (range.toString() === parent.textContent) {
          range.setStartBefore(callNodeInElement(range.startContainer, "DIV"));
          range.setEndAfter(callNodeInElement(range.endContainer, "DIV"));
        }

        //タグ作成
        div.appendChild(content);
        //初めから選択範囲の始点まで
        const firstRange = document.createRange();
        firstRange.setStartBefore(parent);
        firstRange.setEnd(selection.anchorNode, selection.anchorOffset);
        firstContent = firstRange.extractContents();
        //選択範囲の終点から終わりまで
        const lastRange = document.createRange();
        lastRange.setStart(selection.focusNode, selection.focusOffset);
        lastRange.setEndAfter(parent);
        lastContent = lastRange.extractContents();
      }
      //結合して置き換え
      parent.replaceWith(firstContent, div, lastContent);
      //新しい選択範囲
      const nextRange = document.createRange();
      nextRange.selectNode(div);
      //現在の選択範囲を削除
      selection.removeAllRanges();
      //新しく作成した選択範囲を追加
      selection.addRange(nextRange);
      //無駄なタグが残ってると不具合が出るので
      cleanZwspTag("span");
      cleanZwspTag("div");
      break;

    default:
      //<div>外の時の処理
      //キャレットのみの場合
      if (selection.isCollapsed) {
        const text = document.createTextNode(childText);
        div.appendChild(text);
        range.insertNode(div);

        brController(div);
        bodyDirectlySet(div);

        const nextRange = document.createRange();
        nextRange.setStart(div.firstChild, 0);
        nextRange.setEnd(div.firstChild, div.firstChild.textContent.length);
        selection.removeAllRanges();
        selection.addRange(nextRange);
      }
      //選択範囲がある場合
      else {
        //idが同じ場合
        //rangeを広げる
        const anchor = callNodeInElement(range.startContainer, "DIV");
        const focus = callNodeInElement(range.endContainer, "DIV");
        console.log(anchor);
        if (anchor && anchor.id === id) {
          range.setStartBefore(anchor);
        }
        if (focus && focus.id === id) {
          range.setEndAfter(focus);
        }
        //range内のdivを展開してから
        const content = range.extractContents();
        const divArray = content.querySelectorAll("div");
        divArray.forEach((div) => {
          div.replaceWith(...div.childNodes);
        });
        range.insertNode(content);
        wrap(range, cssText, "div", id);
        //無駄spanが残ってると不具合が出るので
      }
      cleanZwspTag("div");
      cleanZwspTag("span");
      break;
  }
}

//rangeをspanに置き換え
function wrap(range, p, element = "span", id = null) {
  //空のタグを生成
  const draftSpan = document.createElement(element);

  draftSpan.style.cssText = p;

  const newSpan = document.createElement(element);

  //rangeが指す範囲をもとのDOMから切り取って取り出す(タグの不整合があってもうまく補完してくれる)
  const content = range.extractContents();

  //加工したいのはspanタグのみなので配列に全spanタグの参照を格納
  const spanArray = Array.from(content.querySelectorAll(element));

  //子要素にも自分のstyleを追加
  spanArray.forEach((s) => {
    Array.from(draftSpan.style).forEach((ds) => {
      s.style.setProperty(ds, draftSpan.style.getPropertyValue(ds));
    });
  });

  //最後にdraftSpanのstyleプロパティをnewSpanに追加
  Array.from(draftSpan.style).forEach((ds) => {
    newSpan.style.setProperty(ds, draftSpan.style.getPropertyValue(ds));
  });

  //newSpanの子要素に切り取った部分を追加
  newSpan.appendChild(content);
  //id追加
  if (id) {
    newSpan.id = id;
  }

  //extractContents()で中身を抜いたことで、range自体は「中身が空になった、元の位置を指すマーカー」として残っているので、そこにinsertNodeで新しいspanをはめ込む。
  range.insertNode(newSpan);
}

//渡されたNodeが特定のElementに入っているか否かを判定する。返り値は該当Element
function callNodeInElement(node, element) {
  if (node.nodeType === Node.ELEMENT_NODE && node.id === "body") return null;
  if (node.nodeType === Node.ELEMENT_NODE && node.tagName === element)
    return node;
  while (true) {
    const parent = node.parentElement;
    if (parent.id === "body") return null;
    if (parent.tagName === element) {
      return parent;
    }
    node = node.parentElement;
  }
}

//渡されたNodeが特定のidに入っているか否かを判定する。返り値は該当Element
function callNodeInId(node, id) {
  //渡されたNodeのidがbodyそのものだった場合
  if (node.nodeType === Node.ELEMENT_NODE && node.id === id) return node;
  while (node.parentElement) {
    if (node.parentElement.id === id) {
      return node.parentElement;
    }
    node = node.parentElement;
  }
  return null;
}

//選択範囲が<div>を囲んでいる場合:enclosed
//選択範囲が<div>に触れていない場合:outside
//選択範囲が完全に<div>内にある場合:inside
//選択範囲は完全に<div>内にあるが、始点と終点が別の<div>の場合:insideAnother
//始点のみが<div>内にある場合:startInside
//終点のみが<div>内にある場合:endInsideを返す
function getDivSelectionRelation(selection) {
  const range = selection.getRangeAt(0);
  const anchorDiv = callNodeInElement(selection.anchorNode, "DIV");
  const focusDiv = callNodeInElement(selection.focusNode, "DIV");
  //始点も終点も<div>外
  if (!anchorDiv && !focusDiv) {
    //cloneContentsはタグを補完。
    //<div>が選択範囲内にあるか否か
    const rangeClone = range.cloneContents();
    if (rangeClone.querySelectorAll("div").length > 0) {
      return "enclosed";
    } else {
      return "outside";
    }
  }
  //始点も終点も<div>内
  if (anchorDiv && focusDiv) {
    //その<div>が同じ
    if (anchorDiv === focusDiv) {
      return "inside";
    } else {
      return "insideAnother";
    }
  }
  //始点か終点が<div>外
  if (anchorDiv) {
    return "startInside";
  } else {
    return "endInside";
  }
}

//引数のnodeの次のnodeが<br>だった時に消す
function brController(node) {
  const nextElementSibling = node.nextElementSibling;
  if (nextElementSibling) {
    if (nextElementSibling.nodeType === Node.ELEMENT_NODE) {
      if (nextElementSibling.tagName === "BR") {
        nextElementSibling.remove();
      }
    }
  }
}

//<div>をbody直下に置くための処理
function bodyDirectlySet(div) {
  while (div.parentElement.id !== "body") {
    const beforeDiv = div.previousSibling;
    const afterDiv = div.nextSibling;
    if (beforeDiv && afterDiv) {
      const newSpanBefore = document.createElement("span");
      const newSpanAfter = document.createElement("span");

      const nodeArray = Array.from(div.parentElement.childNodes);
      let i = 0;
      while (nodeArray[i] !== div) {
        newSpanBefore.appendChild(nodeArray[i]);
        i++;
      }
      nodeArray.forEach((node, index) => {
        if (index > i) {
          newSpanAfter.appendChild(node);
        }
      });

      Array.from(div.parentElement.style).forEach((st) => {
        newSpanAfter.style.setProperty(
          st,
          div.parentElement.style.getPropertyValue(st),
        );
        newSpanBefore.style.setProperty(
          st,
          div.parentElement.style.getPropertyValue(st),
        );
      });
      div.parentElement.replaceWith(newSpanBefore, div, newSpanAfter);
    } else {
      break;
    }
  }
}

function InsertAndEscape(selection, newNode) {
  //キャレットがある要素を取得
  const node = selection.anchorNode;
  //テキストか否か判断(何もテキストが入っていない場合、<div>自身がnodeに入ってしまうので)
  let targetElement = node;
  //targetElemntが<div>じゃない間はループする
  while (targetElement.tagName !== "DIV") {
    targetElement = targetElement.parentElement;
  }

  if (callNodeInElement(selection.anchorNode, "DIV")) {
    //新しく範囲を作成
    const newRange = document.createRange();
    //targetElementの後ろにnewNodeを挿入
    newRange.setStartAfter(targetElement);
    newRange.insertNode(newNode);
    //入れ込む要素に合わせて選択範囲を変更
    if (newNode.tagName === "BR") {
      newRange.collapse(true);
    } else {
      newRange.setStart(newNode.firstChild, 0);
      newRange.setEnd(newNode.firstChild, newNode.firstChild.length);
    }
    selection.removeAllRanges();
    selection.addRange(newRange);
    return;
  }
}

//DB軽量化のため、無駄なタグをマージする
function cleanUp(tag) {
  mergeNestedTags(tag);
  unwrapSameStyleTags(tag);
  mergeAdjacentStyleTags(tag);
}

//<span><span>aaa</span></span>のような無駄な入れ子構造を統合する
function mergeNestedTags(tag) {
  const body = document.getElementById("body");
  const spanArray = Array.from(body.querySelectorAll(tag));
  spanArray.forEach((sa) => {
    //有効なtextが入っていないか
    const hasNotText = Array.from(sa.childNodes).every((sac) => {
      if (sac.nodeType === Node.TEXT_NODE) {
        if (sac.textContent !== "") {
          return false;
        }
      }
      return true;
    });
    if (hasNotText) {
      //saの子要素すべてを取得
      const childArray = Array.from(sa.querySelectorAll(tag));
      childArray.forEach((child) => {
        //親要素のstyleを子要素に上書きして、さらに子要素のクローンのstyleを上書き(親要素が新しく持っているプロパティを子要素に渡しつつ、子要素にもともとあったプロパティを優先するため)
        const cloneChild = child.cloneNode(false);
        //一旦親要素のstyleをすべて子要素に設定
        Array.from(sa.style).forEach((sas) => {
          child.style.setProperty(sas, sa.style.getPropertyValue(sas));
          //子要素が当該のstyleを持っていた場合のみ発動し、子要素の持っていたstyleに戻す
          if (cloneChild.style.getPropertyValue(sas)) {
            child.style.setProperty(
              sas,
              cloneChild.style.getPropertyValue(sas),
            );
          }
        });
      });
      //親要素の削除
      sa.replaceWith(...sa.childNodes);
    }
  });
  //正規化
  body.normalize();
}

//<span style="color=red">aaa<span style="color=red">bbb</span>ccc</span>のように、親とまったく同じstyleの要素を展開する
function unwrapSameStyleTags(tag) {
  const body = document.getElementById("body");
  const spanArray2 = Array.from(body.querySelectorAll(tag));
  spanArray2.forEach((sp) => {
    //saの親がspanで、自分のstyleと全く同じstyleを持っているなら
    if (
      sp.parentNode.nodeType === Node.ELEMENT_NODE &&
      sp.parentNode.tagName === tag.toUpperCase()
    ) {
      const spStyle = getComputedStyle(sp);
      const parentStyle = getComputedStyle(sp.parentNode);
      const isSame = styleArray.every((st) => {
        spStyle[st] === parentStyle[st];
      });
      if (isSame) {
        sp.replaceWith(...sp.childNodes);
      }
    }
  });
  //正規化
  body.normalize();
}

//<span style="color=red">aaa</span><span style="color=red">bbb</span>のように、隣り合った同じstyleの要素を結合する
function mergeAdjacentStyleTags(tag) {
  const body = document.getElementById("body");
  const spanArray3 = Array.from(body.querySelectorAll(tag));
  spanArray3.forEach((sp) => {
    let node = sp;
    //nodeが存在する間ループ
    while (node !== null) {
      //nodeにnodeの次のnodeを代入(なければnullが返る)
      node = node.nextSibling;
      if (node) {
        //nodeがspan要素ならループ終了
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.tagName === tag.toUpperCase()
        ) {
          break;
        } else if (
          node.nodeType === Node.TEXT_NODE &&
          node.textContent !== ""
        ) {
          //nodeがテキストで、テキストが入っている場合ループ終了
          node = null;
        } else if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.tagName === "DIV"
        ) {
          //nodeがdivならループ終了
          node = null;
        }
      }
    }
    //styleを比較し、同じなら結合
    if (node) {
      const spStyle = getComputedStyle(sp);
      const nodeStyle = getComputedStyle(node);
      const isSame = styleArray.every((st) => spStyle[st] === nodeStyle[st]);
      if (isSame) {
        //nodeの先頭にspを展開
        node.prepend(...sp.childNodes);
        sp.remove();
      }
    }
  });
  //正規化
  body.normalize();
}

//DB軽量化のため、挿入したZERO_WIDTH_SPACEを削除する
function cleanZwspTag(tag) {
  const body = document.getElementById("body");
  let changed = true;
  while (changed) {
    changed = false;
    const spanArray = Array.from(body.querySelectorAll(tag));
    spanArray.forEach((sp) => {
      const isEmpty = sp.textContent.replaceAll(ZERO_WIDTH_SPACE, "") === "";
      if (isEmpty) {
        sp.remove();
        changed = true;
      }
    });
  }
}

function cleanZwsp(html) {
  return html.replaceAll(ZERO_WIDTH_SPACE, "");
}

//キーボード制御
function keyController(event) {
  //Enterキー押下時に処理
  if (event.key === "Enter") {
    //イベントに対してブラウザが本来自動的に行うデフォルトの動作をキャンセルする
    event.preventDefault();
    //キャレットの位置を取得
    const selection = document.getSelection();
    //キャレットがある要素を取得
    const node = selection.anchorNode;
    const parentElement = node.parentElement;
    //parentElementが<div>で、idがmtなら
    if (parentElement.tagName === "DIV") {
      if (parentElement.id === "mt") {
        //新しく範囲を作成
        const newRange = document.createRange();
        //parentElementの後ろに<br>を挿入
        newRange.setStartAfter(parentElement);
        const br = document.createElement("BR");
        newRange.insertNode(br);
        //collapseを行わないと、insertNodeは<br>が選択されてしまう
        newRange.collapse(true);

        selection.removeAllRanges();
        selection.addRange(newRange);
        return;
      }
    }
    if (parentElement.id !== "title") {
      document.execCommand("insertLineBreak");
    }
  }
  if (event.key === "Backspace") {
    //<div>が前にあれば無効化する
    //キャレットのあるノードの、<div id="body">直下の親ノードを抽出する
    const selection = document.getSelection();
    //範囲選択ならリターン
    if (!selection.isCollapsed) {
      return;
    }
    const range = selection.getRangeAt(0);
    //ノードの先頭ならば
    if (range.startOffset === 0) {
      //兄弟ノードがあるノードまでさかのぼる
      let node = selection.anchorNode;
      while (true) {
        if (node.previousSibling) {
          break;
        }
        if (node.parentElement.id === "body") {
          break;
        }
        node = node.parentElement;
      }
      if (node.previousSibling) {
        //直前の""以外のノードが<div>で、テキストが入っているならバックスペースをキャンセルする

        let prev = node.previousSibling;
        while (prev) {
          if (prev.nodeType === Node.TEXT_NODE && prev.data === "") {
            prev = prev.previousSibling;
          } else if (
            prev.nodeType === Node.ELEMENT_NODE &&
            prev.tagName === "DIV" &&
            node.textContent
          ) {
            event.preventDefault();
            break;
          } else {
            break;
          }
        }

        const childArray = Array.from(node.parentNode.childNodes);
        let i;
        let isPreviousBr;
        let isBr;
        while (childArray[i]) {
          if (childArray[i].nodeType === Node.TEXT_NODE) {
            if (!childArray[i].textContent === "") {
              isBr = false;
            }
          } else if (childArray[i].nodeType === Node.ELEMENT_NODE) {
            if (childArray[i].nodeType === "BR") {
              isBr = true;
            }
            if (isBr && childArray[i] === node) {
              isPreviousBr = true;
              break;
            }
          }
          i++;
        }
        //自身が<div>で、テキストが入っていて、isPreviousBrがtrueならバックスペースをキャンセルする
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.tagName === "DIV" &&
          node.textContent &&
          isPreviousBr
        ) {
          event.preventDefault();
        } else {
          return;
        }
      }

      //nodeがbodyの一番初めのchildNodeで(""のテキストノードを除く)なら、isFarstChild=true
      const body = document.getElementById("body");
      const childArray = Array.from(body.childNodes);
      let i = 0;
      let isFarstChild;
      while (childArray[i]) {
        if (childArray[i].nodeType === Node.TEXT_NODE) {
          if (childArray[i].textContent !== "") {
            isFarstChild = false;
            break;
          }
        } else if (
          childArray[i].nodeType === Node.ELEMENT_NODE &&
          childArray[i] === node
        ) {
          isFarstChild = true;
          break;
        }
        i++;
      }
      //自身が<div>で、isFarstChildがtureで、テキストが入っていないなら
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.tagName === "DIV" &&
        isFarstChild &&
        !node.textContent
      ) {
        //bodyが空でないならnodeを削除。bodyが空なら一行入れる
        if (body.textContent) {
          node.remove();
        } else {
          const br = document.createElement("BR");
          node.replaceWith(br);
        }
      }
    }
  }
}

//ペースト時にスタイルが写らないように制御
const handlePaste = (e) => {
  //イベントを受け取る
  e.preventDefault();
  const text = e.clipboardData.getData("text/plain");
  document.execCommand("insertText", false, text);
};

export { keyController, handlePaste, minTitle, code, mainText };

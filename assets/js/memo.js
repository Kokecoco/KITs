// エディタの設定
let currentMemoId = null;
let currentMemoTitle = "";

const editor = new EditorJS({
  holder: "editorjs",
  tools: {
    header: Header,
    Color: {
      class: window.ColorPlugin, // if load from CDN, please try: window.ColorPlugin
      inlineToolbar: true,
      config: {
        colorCollections: [
          "#EC7878",
          "#9C27B0",
          "#673AB7",
          "#3F51B5",
          "#0070FF",
          "#03A9F4",
          "#00BCD4",
          "#4CAF50",
          "#8BC34A",
          "#CDDC39",
          "#FFF",
        ],
        defaultColor: "#FF1300",
        type: "text",
        customPicker: true, // add a button to allow selecting any colour
      },
    },
    Marker: {
      class: window.ColorPlugin, // if load from CDN, please try: window.ColorPlugin
      inlineToolbar: true,
      config: {
        defaultColor: "#FFBF00",
        type: "marker",
        icon:
          `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`,
      },
    },
  },
  inlineCode: InlineCode,
  code: CodeTool,
  hyperlink: {
    class: Hyperlink,
    inlineToolbar: true,
    config: {
      shortcut: "CMD+L",
      target: "_blank",
      rel: "nofollow",
      availableTargets: ["_blank", "_self"],
      availableRels: ["author", "noreferrer"],
      validate: false,
    },
  },

  list: {
    class: NestedList,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  raw: RawTool,
  checklist: {
    class: Checklist,
    inlineToolbar: true,
  },
  quote: Quote,
  image: SimpleImage,
  autofocus: true,
  onChange: () => {
    if (currentMemoId) {
      editor.save().then((outputData) => {
        saveMemo(currentMemoId, currentMemoTitle, outputData.blocks);
      });
    }
  },
});

// ローカルストレージにメモを保存
function saveMemo(id, title, data) {
  const memos = JSON.parse(localStorage.getItem("memos")) || {};
  memos[id] = { title, data };
  localStorage.setItem("memos", JSON.stringify(memos));
}

// ローカルストレージからメモをロード
function loadMemo(id) {
  const memos = JSON.parse(localStorage.getItem("memos")) || {};
  return memos[id] || null;
}

// ローカルストレージからメモを削除
function deleteMemo(id) {
  const memos = JSON.parse(localStorage.getItem("memos")) || {};
  delete memos[id];
  localStorage.setItem("memos", JSON.stringify(memos));
}

// ユニークなIDを生成
function generateUniqueId() {
  return "memo-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}

// モーダルを表示する
function showModal() {
  const modal = document.getElementById("modal");
  const memoList = document.getElementById("memoList");
  const memos = JSON.parse(localStorage.getItem("memos")) || {};

  // メモリストをクリアして再表示
  memoList.innerHTML = "";
  Object.keys(memos).forEach((id) => {
    const listItem = document.createElement("p");
    listItem.textContent = memos[id].title;
    listItem.addEventListener("click", () => {
      modal.style.display = "none";
      openMemo(id);
    });
    listItem.classList.add("memo-list");
    memoList.appendChild(listItem);
  });

  modal.style.display = "block";
}

// モーダルを閉じる
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// メモを開く
function openMemo(id) {
  const memo = loadMemo(id);
  if (memo) {
    editor.render({ blocks: memo.data });
    currentMemoId = id;
    currentMemoTitle = memo.title;
  }
}

// 新しいメモを作成
function createNewMemo(title) {
  const id = generateUniqueId();
  currentMemoId = id;
  currentMemoTitle = title;
  saveMemo(id, title, []);
  editor.clear();
}

// モーダルの操作
document.getElementById("newMemoBtn").addEventListener("click", () => {
  const title = prompt("新しいメモのタイトルを入力してください:");
  if (title) {
    createNewMemo(title);
    closeModal();
  }
});

// ページロード時にモーダルを表示
window.onload = showModal;

// メモを削除
function deleteCurrentMemo() {
  if (currentMemoId && confirm(`「${currentMemoTitle}」を削除しますか？`)) {
    deleteMemo(currentMemoId);
    currentMemoId = null;
    currentMemoTitle = "";
    editor.clear();
    showModal();
  }
}

// エディタの削除機能を追加するボタン
const deleteBtn = document.createElement("button");
deleteBtn.textContent = "メモを削除";
deleteBtn.addEventListener("click", deleteCurrentMemo);
deleteBtn.classList.add("button");
document.getElementsByClassName("container")[0].appendChild(deleteBtn);

function adjustFooter() {
  const footer = document.getElementsByTagName("footer")[0];
  const contentHeight = document.body.scrollHeight;
  const windowHeight = window.innerHeight;

  if (contentHeight > windowHeight) {
    footer.classList.remove("fixed");
  } else {
    footer.classList.add("fixed");
  }
}

// ページロード時にフッターを調整
window.addEventListener("load", adjustFooter);

// ウィンドウサイズが変更された場合にもフッターを調整
window.addEventListener("resize", adjustFooter);

// MutationObserverを使用してコンテンツの変化を監視
const content = document.querySelector(".container");
const observer = new MutationObserver(adjustFooter);

// コンテンツの子要素が変更されたらadjustFooterを呼び出す
observer.observe(content, { childList: true, subtree: true });

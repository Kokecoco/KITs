const editor = document.getElementById("editor");
const preview = document.getElementById("preview");
const downloadBtn = document.getElementById("downloadBtn");
const LOCAL_STORAGE_KEY = "latexEditorContent";

// ローカルストレージから保存された内容を読み込み
window.addEventListener("load", () => {
  const savedContent = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedContent) {
    editor.value = savedContent;
    updatePreview();
  }
});

// 入力があるたびにプレビューを更新し、ローカルストレージに保存
editor.addEventListener("input", () => {
  const latexText = editor.value;
  localStorage.setItem(LOCAL_STORAGE_KEY, latexText);
  updatePreview();
});

// プレビューを更新する関数
function updatePreview() {
  const latexText = editor.value;
  preview.innerHTML = `\\[${latexText}\\]`;
  MathJax.typesetPromise([preview]);
}

// PDFに書き出し
downloadBtn.addEventListener("click", () => {
  html2pdf()
    .set({
      margin: 1,
      filename: "latex_output.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    })
    .from(preview)
    .save();
});

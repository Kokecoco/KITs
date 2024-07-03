// ページ読み込み時
window.onload = function () {
  // ローカルストレージから取得
  document.getElementById('result').value = localStorage.getItem('apa-result') || '';

  // アクセス日を今日に設定
  setAccessDateDefault();
}


// APAスタイル作成
function createAPA() {
  let authorName;
  let publishDate;
  let accessDate = `${$accessMonth.value}. ${$accessDay.value}. ${$accessYear.value}`;

  if ($publishYear.value && $publishMonth.value && $publishDay.value) { publishDate = `${$publishYear.value}, ${$publishMonth.value}, ${$publishDay.value}`; }
  else if ($publishYear.value && $publishMonth.value) { publishDate = `${$publishYear.value}, ${$publishMonth.value}`; }
  else if ($publishYear.value) { publishDate = $publishYear.value; }
  else { publishDate = 'n.d.'; }

  if ($author.value && $site.value) { printAPAResult(`${$author.value}(${publishDate}). ${$page.value}. ${$site.value}. Retrieved ${accessDate}. from ${url.value}`); return;}
  else if ($author.value) { authorName = $author.value; }
  else if ($site.value) { authorName = $site.value; }

  printAPAResult(`${authorName}(${publishDate}). ${$page.value}. Retrieved ${accessDate}. from ${$url.value}`);

  function printAPAResult(result) {
    $result_textarea.value += result + '\n';
    localStorage.setItem('apa-result', document.getElementById('result').value);
  }
}

function setAccessDateDefault() {
  const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // 現在の日付を取得
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // getMonth()は0から始まるため、1を加えます
  const day = today.getDate();

  // 閲覧日を今日の日付に設定
  $accessYear.value = year;
  $accessMonth.value = monthNames[month];
  $accessDay.value = day;
}

function resetForms() {
  $author.value = '';
  $site.value = '';
  $page.value = '';
  $url.value = '';
  $publishYear.value = '';
  $publishMonth.value = '';
  $publishDay.value = '';
  setAccessDateDefault();
}

function copyResult() {
  $result_textarea.select();
  document.execCommand('Copy');
  alert('Copied!');
}

function resetResult() {
  $result_textarea.value = '';
  localStorage.setItem('apa-result', '');
}

// それぞれ取得
const $author = document.getElementById('author');
const $site = document.getElementById('site');
const $page = document.getElementById('page');
const $url = document.getElementById('url');
const $publishYear = document.getElementById('publish-year');
const $publishMonth = document.getElementById('publish-month');
const $publishDay = document.getElementById('publish-day');
const $accessYear = document.getElementById('access-year');
const $accessMonth = document.getElementById('access-month');
const $accessDay = document.getElementById('access-day');
const $result_textarea = document.getElementById('result');

document.getElementById('create-button').addEventListener('click', createAPA);
document.getElementById('reset-button').addEventListener('click', resetForms);
document.getElementById('textarea-copy-button').addEventListener('click', copyResult);
document.getElementById('textarea-reset-button').addEventListener('click', resetResult);


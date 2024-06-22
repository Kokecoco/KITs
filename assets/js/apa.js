// APAスタイル作成
function createAPA() {
  const $result_textarea = document.getElementById('result');
  let autherName;
  let publishDate;
  let accessDate = `${$accessMonth.value}. ${$accessDay.value}. ${$accessYear.value}`;

  if ($publishYear.value && $publishMonth.value && $publishDay.value) { publishDate = `${$publishYear.value}, ${$publishMonth.value}, ${$publishDay.value}`; }
  else if ($publishYear.value && $publishMonth.value) { publishDate = `${$publishYear.value}, ${$publishMonth.value}`; }
  else if ($publishYear.value) { publishDate = $publishYear.value; }
  else { publishDate = 'n.d.'; }

  if ($author.value && $site.value) { printAPAResult(`${$author.value}(${publishDate}). ${$page.value}. ${$site.value}. Retrieved ${accessDate}. from ${url.value}`); return;}
  else if ($author.value) { autherName = $author.value; }
  else if ($site.value) { autherName = $site.value; }

  // alert(`${autherName}(${publishDate}). ${$page.value}. Retrieved ${accessDate}. from ${$url.value}`);
  printAPAResult(`${autherName}(${publishDate}). ${$page.value}. Retrieved ${accessDate}. from ${$url.value}`);

  function printAPAResult(result) {
    $result_textarea.value += result + '\n';
  }
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


const $button = document.getElementById('create-button');
$button.addEventListener('click', createAPA);

// 現在の日付を取得
const today = new Date();

// 年、月、日を取得
const year = today.getFullYear();
const month = today.getMonth() + 1; // getMonth()は0から始まるため、1を加えます
const day = today.getDate();

// 月の数値を英語の名前に変換する配列
const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// 閲覧日を今日の日付に設定
$accessYear.value = year;
$accessMonth.value = monthNames[month];
$accessDay.value = day;

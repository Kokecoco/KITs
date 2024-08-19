// ページ読み込み時
window.onload = function () {
  // ローカルストレージから取得
  document.getElementById('result').value = localStorage.getItem('apa-result') || '';

  // アクセス日を今日に設定
  setAccessDateDefault();
}


// APAスタイル作成
// function createAPA() {
//   let authorName;
//   let publishDate;
//   let accessDate = `${$accessMonth.value}. ${$accessDay.value}. ${$accessYear.value}`;
//
//   if ($publishYear.value && $publishMonth.value && $publishDay.value) { publishDate = `${$publishYear.value}, ${$publishMonth.value}, ${$publishDay.value}`; }
//   else if ($publishYear.value && $publishMonth.value) { publishDate = `${$publishYear.value}, ${$publishMonth.value}`; }
//   else if ($publishYear.value) { publishDate = $publishYear.value; }
//   else { publishDate = 'n.d.'; }
//
//   if ($author.value && $site.value) { printAPAResult(`${$author.value}(${publishDate}). ${$page.value}. ${$site.value}. Retrieved ${accessDate}. from ${url.value}`); return;}
//   else if ($author.value) { authorName = $author.value; }
//   else if ($site.value) { authorName = $site.value; }
//
//   printAPAResult(`${authorName}(${publishDate}). ${$page.value}. Retrieved ${accessDate}. from ${$url.value}`);
//
//   function printAPAResult(result) {
//     $result_textarea.value += result + '\n';
//     localStorage.setItem('apa-result', document.getElementById('result').value);
//   }
// }

// APAスタイル作成
function createAPA() {
  if (mode == 'web') {
    
  }
  else if (mode == 'book') {
    
  } else if (mode == 'journal') {
    
  } else {
    alert('Error: Mode is not available.');
  }
}

class APA_Mode {
  constructor(needs) {
    this.needs = needs;
  }
  needsErrorCheck() {
    return this.needs.filter( need => !need.value )[0]
  }

  getFormatPublish(publishYear, publishMonth, publishDay) {
    if ( publishYear && publishMonth && publishDay ) { return `${publishYear}, ${publishMonth}, ${publishDay}`; }
    else if ( publishYear && publishMonth ) { return `${publishYear}, ${publishMonth}`; }
    else if ( publishYear ) { return `${publishYear}`; }
    else { return 'n.d.'; }
  }

  createAPA() {
    // デフォルトフォーマット([]で囲っているものは必須)
    // Web: [著者あるいはサイト名]([出版日付あるいはn.d.]). [ページ名]. <サイト名>. Retrieved [アクセス日], from [URL]
    // 論文: [著者]([出版年]). [論文タイトル]. [学術誌名], [巻], [ページ数]. <DOI>
    // 書籍: [著者]([出版年]). [書籍タイトル](<版>), [出版社]. <DOI>

    if (this.needsErrorCheck()) { alert('Error: 必要事項を入力してください。');return; }

    let author = $AUTHOR.value; // 著者
    let siteName = $SITE.value; // サイト名
    let publisherName = $PUBLISHER_NAME.value; // 出版社
    let journalName = $JOURNAL_NAME.value; // 学術誌名
    let pageName = $PAGE_NAME.value; // ページ名
    let bookTitle = $BOOK_TITLE.value; // 書籍タイトル
    let paperTitle = $PAPER_TITLE.value; // 論文タイトル
    let edition = $EDITION.value; // 版
    let volume = $VOLUME.value; // 巻
    let pageNumber = $PAGE_NUMBER.value; // ページ数
    let url = $URL.value; // URL
    let doi = $DOI.value; // DOI
    let publishDate = this.getFormatPublish($PUBLISH_YEAR.value, $PUBLISH_MONTH.value, $PUBLISH_DAY.value); // 出版日付
    let publishYear = $PUBLISH_YEAR.value; // 出版年
    let access = `${$ACCESS_MONTH.value}, ${$ACCESS_DAY.value}, ${$ACCESS_YEAR.value}`; // アクセス日

    let isExistAuthor = author != ''; // 著者が入力されているか
    let isExistSiteName = siteName != ''; // サイト名が入力されているか
    let isExistEdition = edition != ''; // 版が入力されているか
    let isExistDoi = doi != ''; // DOIが入力されているか

    if (mode == 'book' && isExistEdition && isExistDoi) return `${author}(${publishYear}). ${bookTitle}(第${edition}版), ${publisherName}. ${doi}`; // 書籍(版・DOI)
    else if (mode == 'book' && isExistEdition) return `${author}(${publishYear}). ${bookTitle}(第${edition}版), ${publisherName}`; // 書籍(版)
    else if (mode == 'book' && isExistDoi) return `${author}(${publishYear}). ${bookTitle}, ${publisherName}. ${doi}`; // 書籍(DOI)
    else if (mode == 'journal' && isExistDoi) return `${author}(${publishYear}). ${paperTitle}. ${journalName}, ${volume}, ${pageNumber}. ${doi}`; // 論文(DOI)
    else if (mode == 'web' && isExistAuthor && isExistSiteName) return `${author}(${publishDate}). ${pageName}. ${siteName}. Retrieved ${access}, from ${url}`; // web(サイト名)
    else if (mode == 'web' && !isExistAuthor && isExistSiteName) return `${siteName}(${publishDate}). ${pageName}. Retrieved ${access}, from ${url}`; // web(著者=サイト名)
    else if (mode == 'web' && isExistAuthor) return `${author}(${publishDate}). ${pageName}. Retrieved ${access}, from ${url}`; // web
    else if (mode == 'book') return `${author}(${publishYear}). ${bookTitle}, ${publisherName}`; // 書籍
    else if (mode == 'journal') return `${author}(${publishYear}). ${paperTitle}. ${journalName}, ${volume}, ${pageNumber}`; // 論文
    else { alert('Error: サイト名または著者名を入力してください');return ''; } // web(Error)
  }

  printAPA() {
    let result = this.createAPA();
    if (!result) return;
    result += '\n';
    $RESULT_TEXTAREA.value += result;
    localStorage.setItem('apa-result', $RESULT_TEXTAREA.value);
  }
}

function setAccessDateDefault() {
  const MONTH_NAME = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // 現在の日付を取得
  const TODAY = new Date();
  const YEAR = TODAY.getFullYear();
  const MONTH = TODAY.getMonth() + 1; // getMonth()は0から始まるため、1を加えます
  const DAY = TODAY.getDate();

  // 閲覧日を今日の日付に設定
  $ACCESS_YEAR.value = YEAR;
  $ACCESS_MONTH.value = MONTH_NAME[MONTH];
  $ACCESS_DAY.value = DAY;
}
function resetForms() {
  $AUTHOR.value = '';
  $SITE.value = '';
  $PUBLISHER_NAME.value = '';
  $JOURNAL_NAME.value = '';
  $PAGE_NAME.value = '';
  $BOOK_TITLE.value = '';
  $PAPER_TITLE.value = '';
  $EDITION.value = '';
  $VOLUME.value = '';
  $PAGE_NUMBER.value = '';
  $URL.value = '';
  $DOI.value = '';
  $PUBLISH_YEAR.value = '';
  $PUBLISH_MONTH.value = '';
  $PUBLISH_DAY.value = '';
  setAccessDateDefault();
}
function copyResult() {
  $RESULT_TEXTAREA.select();
  document.execCommand('Copy');
  alert('Copied!');
}
function resetResult() {
  $RESULT_TEXTAREA.value = '';
  localStorage.setItem('apa-result', '');
}
// フォーム作成
function changeMode(mode) {
  const $FORM_BLOCKS = document.getElementsByName('form-block');
  const MODE_TO_DOC = {'web': $WEB_BUTTON, 'journal': $JOURNAL_BUTTON, 'book': $BOOK_BUTTON};
  let types = {
    // 'names': ['site', 'publisher-name', 'journal-name', 'page-name', 'book-title', 'paper-title', 'detail', 'edition', 'vol', 'pages', 'url', 'doi', 'access'],
    'web': [true, false, false, true, false, false, false, false, false, false, true, false, true],
    'journal': [false, false, true, false, false, true, true, false, true, true, false, true, false],
    'book': [false, true, false, false, true, false, true, true, false, false, false, true, false],
  };
  for (let i = 0; i < $FORM_BLOCKS.length; i++) {
    if (types[mode][i]) $FORM_BLOCKS[i].style.setProperty('display', 'block');
    else $FORM_BLOCKS[i].style.setProperty('display', 'none');
  }
  document.getElementsByClassName('selected')[0].classList.remove('selected');
  MODE_TO_DOC[mode].classList.add('selected');
  return mode;
}

// それぞれ取得
const $AUTHOR = document.getElementById('author');
const $SITE = document.getElementById('site');
const $PUBLISHER_NAME = document.getElementById('publisher-name');
const $JOURNAL_NAME = document.getElementById('journal-name');
const $PAGE_NAME = document.getElementById('page-name');
const $BOOK_TITLE = document.getElementById('book-title');
const $PAPER_TITLE = document.getElementById('paper-title');
const $EDITION = document.getElementById('edition');
const $VOLUME = document.getElementById('vol');
const $PAGE_NUMBER = document.getElementById('page-number');
const $URL = document.getElementById('url');
const $DOI = document.getElementById('doi');
const $PUBLISH_YEAR = document.getElementById('publish-year');
const $PUBLISH_MONTH = document.getElementById('publish-month');
const $PUBLISH_DAY = document.getElementById('publish-day');
const $ACCESS_YEAR = document.getElementById('access-year');
const $ACCESS_MONTH = document.getElementById('access-month');
const $ACCESS_DAY = document.getElementById('access-day');
const $RESULT_TEXTAREA = document.getElementById('result');

const $WEB_BUTTON = document.getElementById('source-web');
const $JOURNAL_BUTTON = document.getElementById('source-journal');
const $BOOK_BUTTON = document.getElementById('source-book');

let mode = changeMode('web');

const WEB = new APA_Mode([$PAGE_NAME, $URL, $ACCESS_YEAR, $ACCESS_MONTH, $ACCESS_DAY]);
const JOURNAL = new APA_Mode([$AUTHOR, $JOURNAL_NAME, $PAPER_TITLE, $VOLUME, $PAGE_NUMBER, $PUBLISH_YEAR]);
const BOOK = new APA_Mode([$AUTHOR, $PUBLISHER_NAME, $BOOK_TITLE, $PUBLISH_YEAR]);

$WEB_BUTTON.addEventListener('click', () => {mode = changeMode('web');});
$JOURNAL_BUTTON.addEventListener('click', () => {mode = changeMode('journal');});
$BOOK_BUTTON.addEventListener('click', () => {mode = changeMode('book');});
document.getElementById('create-button').addEventListener('click', () => {
  if (mode == 'web') WEB.printAPA();
  else if (mode == 'journal') JOURNAL.printAPA();
  else if (mode == 'book') BOOK.printAPA();
});
document.getElementById('reset-button').addEventListener('click', resetForms);
document.getElementById('textarea-copy-button').addEventListener('click', copyResult);
document.getElementById('textarea-reset-button').addEventListener('click', resetResult);


const dayName = ["日", "月", "火", "水", "木", "金", "土"];

function updateClock() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // パディングを追加
    let month_formatted = ("0" + (month + 1)).slice(-2) + "月";
    let date_formatted = ("0" + date).slice(-2) + "日";
    let hours_formatted = ("0" + hours).slice(-2);
    let minutes_formatted = ("0" + minutes).slice(-2);
    let seconds_formatted = ("0" + seconds).slice(-2);

    // 時計の表示を更新
    document.getElementById("clock").innerHTML =
        year +
        "年" +
        month_formatted +
        date_formatted +
        "(" +
        dayName[day] +
        ")" +
        "<br/>" +
        hours_formatted +
        ":" +
        minutes_formatted +
        "." +
        seconds_formatted;
}

setInterval(updateClock, 100);
updateClock();

document.addEventListener('keydown', (function() {
    const sequences = {
        rainbow: 'rainbow',
        golden: 'golden'
    };
    let currentIndex = { rainbow: 0, golden: 0 };
    let rainbowOn = false;
    let goldenOn = false;

    return function(event) {
        const key = event.key.toLowerCase();
        const clock = document.getElementById('clock');

        // 処理を統一するため、どちらのシーケンスのキー入力かを判定
        if (sequences.rainbow[currentIndex.rainbow] === key) {
            currentIndex.rainbow++;
            if (currentIndex.rainbow === sequences.rainbow.length) {
                // 「rainbow」シーケンスが完成した場合
                if (goldenOn) {
                    // golden がオンの場合は golden をオフにする
                    clock.classList.remove('golden');
                    goldenOn = false;
                }
                rainbowOn = !rainbowOn;
                if (rainbowOn) {
                    clock.classList.add('rainbow');
                } else {
                    clock.classList.remove('rainbow');
                }
                currentIndex.rainbow = 0; // シーケンスをリセット
                currentIndex.golden = 0; // golden のシーケンスもリセット
            }
        } else if (sequences.golden[currentIndex.golden] === key) {
            currentIndex.golden++;
            if (currentIndex.golden === sequences.golden.length) {
                // 「golden」シーケンスが完成した場合
                if (rainbowOn) {
                    // rainbow がオンの場合は rainbow をオフにする
                    clock.classList.remove('rainbow');
                    rainbowOn = false;
                }
                goldenOn = !goldenOn;
                if (goldenOn) {
                    clock.classList.add('golden');
                } else {
                    clock.classList.remove('golden');
                }
                currentIndex.golden = 0; // シーケンスをリセット
                currentIndex.rainbow = 0; // rainbow のシーケンスもリセット
            }
        } else {
            // 入力がシーケンスと異なる場合、シーケンスをリセット
            if (key !== sequences.rainbow[currentIndex.rainbow]) {
                currentIndex.rainbow = 0;
            }
            if (key !== sequences.golden[currentIndex.golden]) {
                currentIndex.golden = 0;
            }
        }
    };
})());


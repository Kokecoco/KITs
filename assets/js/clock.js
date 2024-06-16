const dayName = ["日", "月", "火", "水", "木", "金", "土"];

function updateClock(){
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); 
    const date = now.getDate();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // パディングを追加
    let month_formated = ("0" + (month + 1)).slice(-2) + "月";
    let date_formated = ("0" + date).slice(-2) + "日";
    let hours_formated = ("0" + hours).slice(-2);
    let minutes_formated = ("0" + minutes).slice(-2);
    let seconds_formated = ("0" + seconds).slice(-2);

    // 時計の表示を更新
    document.getElementById('clock').innerHTML = year + "年" + month_formated + date_formated + "(" + dayName[day] + ")" + "<br/>" + hours_formated + ":" + minutes_formated + "." + seconds_formated;
}


setInterval(updateClock, 100);
updateClock();

function convertNumber() {
    const units = [
        '', '万', '億', '兆', '京', '垓', String.fromCodePoint(153457), '穣', '溝', '澗', '正', 
        '載', '極', '恒河沙', '阿僧祇', '那由他', '不可思議', 
        '無量大数'
    ];
    let number = document.getElementById('numberInput').value;

    if (number === 'rainbow' || number === 'gaming') {
        const num_title = document.getElementById('num-title');
        num_title.classList.toggle('rainbow');
        return;
    }

    if (!/^\d+$/.test(number)) {
        alert("有効な数値を入力してください。半角整数値のみ使用できます。");
        return;
    }

    if (number.length > units.length * 4) {
        alert("数値が大きすぎます。72桁以内で入力してください。");
        return;
    }

    let result = '';
    let unitIndex = 0;
    const chunkSize = 4
    while (number.length > chunkSize) {
        const part = number.slice(-chunkSize);
        number = number.slice(0, -chunkSize);
        if (parseInt(part) !== 0) {
            result = parseInt(part) + units[unitIndex] + result;
        }
        unitIndex++;
    }

    // 4桁未満の残りの数値を結果に追加
    if (number.length > 0 && parseInt(number) !== 0) {
        result = parseInt(number) + units[unitIndex] + result;
    }

    if (result === '') {
        result = '0';
    }

    document.getElementById('result').textContent = result;
}

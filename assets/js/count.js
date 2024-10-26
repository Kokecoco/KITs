document.addEventListener("DOMContentLoaded", () => {
  const counterElement = document.getElementById("counter");
  const confirmationElement = document.getElementById("confirmation");
  let count = 0;

  // ページロード時にlocalStorageからカウント値を取得
  if (localStorage.getItem("counterValue")) {
    count = parseInt(localStorage.getItem("counterValue"));
  }

  const updateCounter = () => {
    counterElement.textContent = count;
    localStorage.setItem("counterValue", count); // カウンターの値をlocalStorageに保存
  };

  // カウンターをクリックしたときに数値を変更
  counterElement.addEventListener("click", () => {
    const inputValue = prompt("新しい値を入力してください:", count);
    const parsedValue = parseInt(inputValue);
    if (!isNaN(parsedValue)) {
      count = parsedValue;
      updateCounter();
    }
  });

  document.getElementById("increase1").addEventListener("click", () => {
    count += 1;
    updateCounter();
  });

  document.getElementById("increase10").addEventListener("click", () => {
    count += 10;
    updateCounter();
  });

  document.getElementById("increase100").addEventListener("click", () => {
    count += 100;
    updateCounter();
  });

  document.getElementById("decrease1").addEventListener("click", () => {
    count -= 1;
    updateCounter();
  });

  document.getElementById("decrease10").addEventListener("click", () => {
    count -= 10;
    updateCounter();
  });

  document.getElementById("decrease100").addEventListener("click", () => {
    count -= 100;
    updateCounter();
  });

  document.getElementById("reset").addEventListener("click", () => {
    confirmationElement.style.display = "block"; // 確認ダイアログを表示
  });

  document.getElementById("confirmYes").addEventListener("click", () => {
    count = 0; // カウントをリセット
    updateCounter();
    confirmationElement.style.display = "none"; // ダイアログを非表示
  });

  document.getElementById("confirmNo").addEventListener("click", () => {
    confirmationElement.style.display = "none"; // ダイアログを非表示
  });

  document.getElementById("increaseCustom").addEventListener("click", () => {
    const customValue = parseInt(
      document.getElementById("customIncrease").value,
    );
    if (!isNaN(customValue)) {
      count += customValue;
      updateCounter();
      // ここでは入力フィールドをクリアしない
    }
  });

  document.getElementById("decreaseCustom").addEventListener("click", () => {
    const customValue = parseInt(
      document.getElementById("customDecrease").value,
    );
    if (!isNaN(customValue)) {
      count -= customValue;
      updateCounter();
      // ここでは入力フィールドをクリアしない
    }
  });

  // n倍にする処理
  document.getElementById("multiply").addEventListener("click", () => {
    const multiplier = parseFloat(document.getElementById("multiplier").value);
    if (!isNaN(multiplier)) {
      // multiplierが数値であるか確認
      count *= multiplier;
      updateCounter();
    } else {
      alert("正しい数値を入力してください。");
    }
  });

  // n分の1にする処理
  document.getElementById("divide").addEventListener("click", () => {
    const divider = parseFloat(document.getElementById("divider").value);
    if (!isNaN(divider) && divider !== 0) {
      // dividerが0でないことを確認
      count /= divider;
      updateCounter();
    } else {
      alert("0以外の数値を入力してください。");
    }
  });

  // 初期表示のカウンターを更新
  updateCounter();
});


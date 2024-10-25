document.addEventListener("DOMContentLoaded", () => {
  const counterElement = document.getElementById("counter");
  const confirmationElement = document.getElementById("confirmation");
  let count = 0;

  const updateCounter = () => {
    counterElement.textContent = count; // 桁数に応じて自動で表示
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
});


const qrCodeHistoryContainer = document.querySelector("#qr-code-history");
const btnClearHistory = document.querySelector("#btn-clear");

let historyArr = JSON.parse(localStorage.getItem("historyArr")) || [];

document.addEventListener("DOMContentLoaded", () => {
  displayQRCodeHistory();
});

const clearHistory = (e) => {
  btnClearHistory.preventDefault ();
}

function displayQRCodeHistory() {
  qrCodeHistoryContainer.innerHTML = ""; // Limpa o container antes de adicionar os QR codes

  historyArr.forEach((data) => {
    const qrCodeItem = document.createElement("div");
    qrCodeItem.classList.add("qr-code-item");

    const qrCodeImg = document.createElement("img");
    qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data}`;

    const qrCodeText = document.createElement("p");
    qrCodeText.textContent = data;

    qrCodeItem.appendChild(qrCodeImg);
    qrCodeItem.appendChild(qrCodeText);
    qrCodeHistoryContainer.appendChild(qrCodeItem);
  });
}

btnClearHistory.addEventListener("click", clearHistory => {
  localStorage.clear(); // Remove todos os itens do Local Storage
  console.log("Histórico limpo");
})




const container = document.querySelector(".container");
const inputQRCode = document.querySelector("#qr-input");
const qrCodeBtn = document.querySelector("#generator-btn button");
const qrCodeImg = document.querySelector("#qr-code img");
const btnCreateQRCode = document.querySelector("#btn-create-qrcode");

// Carregar histórico do localStorage
let historyArr = JSON.parse(localStorage.getItem("historyArr")) || [];

// Funções
generateQRCode = () => {
  // Seletor do valor inserido no input
  const qrCodeInputValue = inputQRCode.value;

  // Validação de input vazio com retorno
  if (!qrCodeInputValue) {
    return;
  }

  qrCodeBtn.innerText = "Gerando código...";

  // Usando API baseado na imagem de QR Code do HTML
  qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrCodeInputValue}`; //${} -> Contém o valor digitado no input

  historyArr.push(qrCodeInputValue);

  // Salvar histórico no localStorage
  localStorage.setItem("historyArr", JSON.stringify(historyArr));

  //Evento que vai ativar a classe ao container apenas quando a imagem for carregada
  qrCodeImg.addEventListener("load", () => {
    //Adiciona ao container no HTML a classe "active"
    container.classList.add("active");
    qrCodeBtn.innerText = "Código criado!";
  });
};

// Função para direcionar a página do gerador de QR Code
qrCodeBtn.addEventListener("click", () => {
  generateQRCode();
});

//Dispara evento de gerar QR Code ao teclar o Enter
inputQRCode.addEventListener("keydown", (e) => {
  //Verifica se o objeto do evento está sendo acessado pela tecla "Enter"
  if (e.code === "Enter") {
    generateQRCode();
  }
});

//Dispara evento de gerar QR Code ao limpar o input
inputQRCode.addEventListener("keyup", (e) => {
  //Verifica se há algum valor no input
  if (!inputQRCode.value) {
    //Remove a classe active do container e retorna ao formato inicial do layout
    container.classList.remove("active");
    qrCodeBtn.innerText = "Gerar QR Code";
  }
});

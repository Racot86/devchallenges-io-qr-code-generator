let downloadBtn = document.querySelector(".download");
let shareBtn = document.querySelector(".share");
let qrCode = document.querySelector(".qrcode");
let generateBtn = document.querySelector(".btn-code");
let urlInput = document.querySelector(".url-input");
let codeGenDiv = document.querySelector(".code-generator");
let codeGenOutputDiv = document.querySelector(".code-generator-output");
let header = document.querySelector("header");
let logo = document.querySelector(".logo");

const saveImage = (downloadUrl) => {
    const downloadImage = document.createElement("a");
    document.body.appendChild(downloadImage);
    downloadImage.setAttribute("download", "qrcode.png");
    downloadImage.href = downloadUrl;
    downloadImage.click();
    downloadImage.remove();
};


generateBtn.addEventListener("click", () => {
    if (urlInput.value !== "") {
        codeGenDiv.style.display = "none";
        codeGenOutputDiv.style.display = "flex";
        header.style.display = "flex";

        let qrcode = new QRCode(document.querySelector(".qrcode"), {
            text: urlInput.value,
            width: 184,
            height: 184,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

    } else {
        alert("Please enter a valid URL");
    }
})

downloadBtn.addEventListener("click", () => {
    saveImage(qrCode.querySelector('img').src)
})

shareBtn.addEventListener("click", () => {

    const canvas = qrCode.querySelector('canvas');

    canvas.toBlob((blob) => {
        const item = new ClipboardItem({"image/png": blob});
        navigator.clipboard.write([item]);
    });

})

logo.addEventListener("click", () => {
    codeGenDiv.style.display = "flex";
    codeGenOutputDiv.style.display = "none";
    header.style.display = "none";
    qrCode.innerHTML = "";
    urlInput.value = "";
})
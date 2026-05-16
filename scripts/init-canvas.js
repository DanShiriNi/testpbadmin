// Инициализация полотна
import {applyTransform} from '/scripts/move-canvas.js';
import {redraw} from '/scripts/paint-pixel.js';

canvas.width = imgWidth;
canvas.height = imgHeight;

function getCanvasData() {
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, imgWidth, imgHeight);
    baseImageData = imageData.data;
    ctx.clearRect(0, 0, imgWidth, imgHeight);
}

function centerCanvas() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    translateX = Math.round((vw - imgWidth * scale) / 2);
    translateY = Math.round((vh - imgHeight * scale) / 2);
}

export function updateButtons() {
    backBtn.disabled = historyIndex <= 0;
    forwardBtn.disabled = historyIndex >= history.length - 1;
    backBtn.style.opacity = backBtn.disabled ? 0.4 : 1;
    forwardBtn.style.opacity = forwardBtn.disabled ? 0.4 : 1;
    backBtn.style.pointerEvents = backBtn.disabled ? "none" : "auto";
    forwardBtn.style.pointerEvents = forwardBtn.disabled ? "none" : "auto";
}

function initEditor() {
    const img = new Image();
    img.src = "https://pb.diddont.ru/history/canvas.png";
    // img.src = "/testpbadmin/canvas.png";
    img.onload = () => {
        baseImage = img;

        imgWidth = img.width;
        imgHeight = img.height;

        canvas.width = imgWidth;
        canvas.height = imgHeight;

        tg.ready();
        tg.expand();

        getCanvasData();
        centerCanvas();
        applyTransform();
        redraw();
        updateButtons();
    };
}

initEditor();

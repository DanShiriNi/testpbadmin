// Управление полотна
import {paintPixel} from '/scripts/paint-pixel.js';

function snapToPixel() {
    const screenCenterX = window.innerWidth / 2;
    const screenCenterY = window.innerHeight / 2;
    
    const gridX = Math.floor((screenCenterX - translateX) / scale);
    const gridY = Math.floor((screenCenterY - translateY) / scale);
    
    const clippedX = Math.max(0, Math.min(imgWidth - 1, gridX));
    const clippedY = Math.max(0, Math.min(imgHeight - 1, gridY));
    
    translateX = screenCenterX - clippedX * scale - 0.5 * scale;
    translateY = screenCenterY - clippedY * scale - 0.5 * scale;
}

export function applyTransform() {
    canvas.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

export function startCanvasDrag(e) {
    if (e.button !== 0) return;
    isDragging = true;
    isClick = true;
    startX = e.clientX;
    startY = e.clientY;
    startTransX = translateX;
    startTransY = translateY;
    e.preventDefault();
}

export function canvasDrag(e) {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) isClick = false;
    
    translateX = startTransX + dx;
    translateY = startTransY + dy;
    applyTransform();
}

function findPixel(e) {
    const pixelX = Math.floor((e.clientX - translateX) / scale);
    const pixelY = Math.floor((e.clientY - translateY) / scale);

    if (pixelX >= 0 && pixelX < imgWidth && pixelY >= 0 && pixelY < imgHeight) {
        const selectedPixel = {x: pixelX, y: pixelY};
        return selectedPixel;
    }

    return;
}

export function endCanvasDrag(e) {
    snapToPixel();
    applyTransform();
    if (!isDragging) return;
    isDragging = false;
    if (isClick) {
        const pixel = findPixel(e);

        const x = pixel.x;
        const y = pixel.y;
        console.log(x, y);
        
        if (x >= 0 && x < imgWidth && y >= 0 && y < imgHeight) {
            paintPixel(x, y, selectedColor || "#ffffff");
        }
    }
}

function setCanvasScale(e) {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 2 : 0.5;
    const oldScale = scale;
    scale = Math.max((1 / 64), Math.min(1024, scale * delta));
    
    translateX = e.clientX - (e.clientX - translateX) * (scale / oldScale);
    translateY = e.clientY - (e.clientY - translateY) * (scale / oldScale);
    applyTransform();
}

canvas.addEventListener("mousedown", startCanvasDrag);
canvas.addEventListener("mousemove", canvasDrag);
canvas.addEventListener("mouseup", endCanvasDrag);
canvas.addEventListener("wheel", setCanvasScale, { passive: false });
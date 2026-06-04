// Перекраска полотна
import {saveState} from './save-canvas.js';

function getCurrentPixelColor(x, y) {
    const existing = currentPixels.find(p => p.x === x && p.y === y);
    if (existing) return existing.color;

    const idx = (y * imgWidth + x) * 4;

    const r = baseImageData[idx];
    const g = baseImageData[idx + 1];
    const b = baseImageData[idx + 2];

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function redraw() {
    ctx.clearRect(0, 0, imgWidth, imgHeight);
    if (baseImage) ctx.drawImage(baseImage, 0, 0);
    for (const p of currentPixels) {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 1, 1);
    }
}

export function paintPixel(x, y, color) {
    if (getCurrentPixelColor(x, y) === color) return;

    const existingIndex = currentPixels.findIndex(p => p.x === x && p.y === y);
    
    if (existingIndex !== -1) {
        currentPixels[existingIndex].color = color;
    } else {
        currentPixels.push({ x, y, color });
    }

    redraw();
    saveState();
}

// Сохранение полотна
import {redraw} from './paint-pixel.js';
import {updateButtons} from './init-canvas.js';

export function saveState() {
    if (historyIndex < history.length - 1) history = history.slice(0, historyIndex + 1);
    history.push(JSON.parse(JSON.stringify(currentPixels)));
    historyIndex++;
    updateButtons();
}

function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        currentPixels = JSON.parse(JSON.stringify(history[historyIndex]));
        redraw();
        updateButtons();
    }
}

function redo() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        currentPixels = JSON.parse(JSON.stringify(history[historyIndex]));
        redraw();
        updateButtons();
    }
}

backBtn.addEventListener("click", undo);
forwardBtn.addEventListener("click", redo);
saveBtn.addEventListener("click", async () => {
    try {
        const dataToSend = JSON.stringify(history[historyIndex]);

        if (!tg.sendData) {
            throw new Error("sendData not available");
        }

        tg.sendData(dataToSend);
        tg.close();
    } catch (error) {
        console.error("Send error:", error);
        if (tg.showPopup) {
            tg.showPopup({ title: "Ошибка", message: error.message, buttons: [{ type: "ok" }] });
        } else {
            alert(error);
        }
    }
});

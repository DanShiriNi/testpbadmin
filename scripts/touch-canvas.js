// Сенсорное управление полотна
import {applyTransform, startCanvasDrag, canvasDrag, endCanvasDrag} from './move-canvas.js';
import {setAnimation, setCenterPixel} from './move-canvas.js'; // Добавлены недостающие импорты

function createFakeMouseEvent(type, touch) {
    return {
        type,
        clientX: touch.clientX,
        clientY: touch.clientY,
        button: 0,
        preventDefault: () => {},
        deltaY: 0,
    };
}

function startTouch(e) {
    e.preventDefault();
    const touches = e.touches;
    if (touches.length === 1) {
        const touch = touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        touchMoved = false;
        const fakeEvent = createFakeMouseEvent('mousedown', touch);
        startCanvasDrag(fakeEvent);
    } 
    else if (touches.length === 2) {
        const t1 = touches[0], t2 = touches[1];
        const dx = t1.clientX - t2.clientX;
        const dy = t1.clientY - t2.clientY;
        touchStartDistance = Math.sqrt(dx*dx + dy*dy);
        touchStartScale = scale;
        isPinching = true;
        touchMoved = true;
    }
}

function touchMove(e) {
    e.preventDefault();
    const touches = e.touches;
    if (touches.length === 1) {
        const touch = touches[0];
        if (Math.abs(touch.clientX - startX) > TAP_THRESHOLD ||
            Math.abs(touch.clientY - startY) > TAP_THRESHOLD) {
            touchMoved = true;
        }
        
        const fakeEvent = createFakeMouseEvent('mousemove', touch);
        canvasDrag(fakeEvent);
    }
    else if (touches.length === 2 && isPinching) {
        const t1 = touches[0], t2 = touches[1];
        const dx = t1.clientX - t2.clientX;
        const dy = t1.clientY - t2.clientY;
        const currentDistance = Math.sqrt(dx*dx + dy*dy);

        if (touchStartDistance > 0) {
            const centerX = (t1.clientX + t2.clientX) / 2;
            const centerY = (t1.clientY + t2.clientY) / 2;
            
            const delta = currentDistance / touchStartDistance;
            const oldScale = scale;
            scale = Math.max(1/64, Math.min(1024, touchStartScale * delta));

            translateX = centerX - (centerX - translateX) * (scale / oldScale);
            translateY = centerY - (centerY - translateY) * (scale / oldScale);

            // Добавлена логика обновления, которая была в рабочем файле
            if (isAnimating) setAnimation();
            applyTransform();
            setCenterPixel();
        }
    }
}

function touchEnd(e) {
    e.preventDefault();
    const touches = e.touches;
    if (touches.length === 0) {
        const lastTouch = e.changedTouches[0];
        const fakeEvent = createFakeMouseEvent('mouseup', lastTouch);
        endCanvasDrag(fakeEvent);
        
        isPinching = false;
        touchMoved = false;
    }
    else if (touches.length === 1 && isPinching) {
        isPinching = false;
        touchMoved = false;
    }
}

function touchCancel(e) {
    e.preventDefault();
    const fakeEvent = { clientX: 0, clientY: 0, preventDefault: () => {} };
    endCanvasDrag(fakeEvent);
    isPinching = false;
    touchMoved = false;
}

// Добавлено ключевое слово export, чтобы функцию можно было вызвать извне
export function initTouchControls() {
    canvasContainer.addEventListener('touchstart', startTouch, { passive: false });
    canvasContainer.addEventListener('touchmove', touchMove, { passive: false });
    canvasContainer.addEventListener('touchend', touchEnd, { passive: false });
    canvasContainer.addEventListener('touchcancel', touchCancel, { passive: false });
}

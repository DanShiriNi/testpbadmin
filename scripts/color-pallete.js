// палитра цветов - выбор цвета

colors.forEach(color => {
    const colorBtn = document.createElement("li");
    colorBtn.classList.add('palette_color');
    colorBtn.style.backgroundColor = color;
    colorBtn.addEventListener('click', function(e) {
        colorPalletBtn.style.backgroundColor = color;
        selectedColor = color;
        closeColorPallet();
    });
    colorPallet.appendChild(colorBtn);
});

function openColorPallet() {
    colorPalletDropdown.classList.add('color_palette_visible_dropdown');
}

function closeColorPallet() {
    colorPalletDropdown.classList.remove('color_palette_visible_dropdown');
}

colorPalletBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = colorPalletDropdown.classList.contains('color_palette_visible_dropdown');
    if (isVisible) {
        closeColorPallet();
    } else {
        openColorPallet();
    }
});

document.addEventListener('click', (e) => {
    if (!colorPalletDropdown.contains(e.target) && e.target !== colorPalletBtn) {
        closeColorPallet();
    }
});
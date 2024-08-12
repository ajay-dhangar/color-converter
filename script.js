function convertColor() {
    const hex = document.getElementById('colorInput').value;
    if (hex.length !== 6) {
        alert("Please enter a valid 6 digits hex color code");
        return;
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const rgbColor = `rgb(${r}, ${g}, ${b})`;
    document.getElementById('rgbColor').value = rgbColor;

    const {h, s, l} = rgbToHsl(r, g, b);
    const hslColor = `hsl(${h}, ${s}%, ${l}%)`;
    document.getElementById('hslColor').value = hslColor;

    document.getElementById('cssColor').value = hexToCss(hex);
    document.getElementById('colorPreview').style.backgroundColor = rgbColor;
}

function reset() {
    document.getElementById('colorInput').value = '';
    document.getElementById('rgbColor').value = '';
    document.getElementById('hslColor').value = '';
    document.getElementById('cssColor').value = '';
    document.getElementById('colorPreview').style.backgroundColor = 'transparent';
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100)};
}

function hexToCss(hex) {
    return `#${hex}`;
}

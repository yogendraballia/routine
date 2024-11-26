const canvas = document.getElementById('coloring-canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color-picker');
const brushSize = document.getElementById('brush-size');
const canvasContainer = document.getElementById('canvas-container');

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentColor = colorPicker.value;
let currentSize = brushSize.value;

// Update brush settings
colorPicker.addEventListener('change', () => {
    currentColor = colorPicker.value;
});

brushSize.addEventListener('change', () => {
    currentSize = brushSize.value;
});

// Drawing functions
function startDrawing(e) {
    isDrawing = true;
    const { x, y } = getCanvasCoordinates(e);
    lastX = x;
    lastY = y;
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!isDrawing) return;

    const { x, y } = getCanvasCoordinates(e);

    ctx.lineWidth = currentSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastX = x;
    lastY = y;
}

function getCanvasCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    return { x, y };
}

// Attach event listeners
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// For touch devices
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

// Load a coloring page outline
function loadPage(pageName) {
    const img = new Image();
    img.src = `${pageName}-outline.png`; // Ensure the files match the naming convention
    img.onload = () => {
        canvasContainer.style.display = 'block';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
}

// Print the coloring page
function printPage() {
    const dataUrl = canvas.toDataURL('image/png');
    const printWindow = window.open('');
    printWindow.document.write(`<img src="${dataUrl}" style="width:100%;">`);
    printWindow.print();
}

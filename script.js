let brushColor = '#ff0000';
let brushSize = 10;
let painting = false;

function loadPage(theme) {
    const canvasContainer = document.getElementById('canvas-container');
    const canvas = document.getElementById('coloring-canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions for mobile
    canvas.width = Math.min(window.innerWidth - 20, 600);
    canvas.height = canvas.width;

    // Clear canvas and load image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    img.src = `${theme}-outline.png`;
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvasContainer.style.display = 'block';
        enableColoring(canvas, ctx);
    };
}

function enableColoring(canvas, ctx) {
    const colorPicker = document.getElementById('color-picker');
    const brushSizeInput = document.getElementById('brush-size');

    // Update brush settings
    colorPicker.addEventListener('input', (e) => (brushColor = e.target.value));
    brushSizeInput.addEventListener('input', (e) => (brushSize = e.target.value));

    const startPainting = (x, y) => {
        painting = true;
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const paint = (x, y) => {
        if (!painting) return;
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopPainting = () => {
        painting = false;
        ctx.closePath();
    };

    // Event listeners for desktop and touch
    canvas.addEventListener('mousedown', (e) => startPainting(e.offsetX, e.offsetY));
    canvas.addEventListener('mousemove', (e) => paint(e.offsetX, e.offsetY));
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);

    canvas.addEventListener('touchstart', (e) => {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        startPainting(touch.clientX - rect.left, touch.clientY - rect.top);
    });

    canvas.addEventListener('touchmove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        paint(touch.clientX - rect.left, touch.clientY - rect.top);
    });

    canvas.addEventListener('touchend', stopPainting);
}

function printPage() {
    const canvas = document.getElementById('coloring-canvas');
    const dataURL = canvas.toDataURL();
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<img src="${dataURL}" style="width:100%;"/>`);
    printWindow.print();
}

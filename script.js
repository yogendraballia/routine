let brushColor = '#ff0000'; // Default brush color
let brushSize = 5; // Default brush size
let painting = false;

function loadPage(theme) {
    const canvasContainer = document.getElementById('canvas-container');
    const canvas = document.getElementById('coloring-canvas');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Load the selected coloring page image
    const img = new Image();
    img.src = `${theme}-outline.png`; // Assuming the image names are 'nature-outline.png' and 'space-outline.png'
    
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvasContainer.style.display = 'block';
        enableColoring();
    }
}

function enableColoring() {
    const canvas = document.getElementById('coloring-canvas');
    const ctx = canvas.getContext('2d');

    // Update brush color and size based on user selection
    const colorPicker = document.getElementById('color-picker');
    const brushSizeSelector = document.getElementById('brush-size');

    colorPicker.addEventListener('input', (e) => {
        brushColor = e.target.value;
    });

    brushSizeSelector.addEventListener('change', (e) => {
        brushSize = e.target.value;
    });

    // Mouse events
    canvas.addEventListener('mousedown', (e) => {
        painting = true;
        ctx.strokeStyle = brushColor; // Set stroke color to selected color
        ctx.lineWidth = brushSize; // Set line width to selected size
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!painting) return;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    });

    canvas.addEventListener('mouseup', () => {
        painting = false;
        ctx.closePath();
    });

    canvas.addEventListener('mouseleave', () => {
        painting = false;
        ctx.closePath();
    });
}

function printPage() {
    const canvas = document.getElementById('coloring-canvas');
    const dataURL = canvas.toDataURL();
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<img src="' + dataURL + '" style="width:100%;height:auto;"/>');
    printWindow.document.close();
    printWindow.print();
}

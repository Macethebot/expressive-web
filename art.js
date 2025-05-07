// Simple drawing logic for art.html
const canvas = document.getElementById('draw-canvas');
const ctx = canvas.getContext('2d');
let drawing = false, brushColor = '#188c6c', brushSize = 8;
let paths = [], currentPath = [];

function startDraw(e) {
  drawing = true;
  currentPath = [];
  draw(e);
}
function endDraw() {
  drawing = false;
  if (currentPath.length) paths.push({points: currentPath, color: brushColor, size: brushSize});
}
function draw(e) {
  if (!drawing) return;
  const rect = canvas.getBoundingClientRect();
  const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
  const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
  currentPath.push([x, y]);
  redraw();
}
function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const path of paths) {
    ctx.strokeStyle = path.color;
    ctx.lineWidth = path.size;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.beginPath();
    for (let i = 0; i < path.points.length; i++) {
      const [x, y] = path.points[i];
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  // Draw current path
  if (currentPath.length) {
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.beginPath();
    for (let i = 0; i < currentPath.length; i++) {
      const [x, y] = currentPath[i];
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('touchstart', startDraw);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchmove', draw);
window.addEventListener('mouseup', endDraw);
window.addEventListener('touchend', endDraw);

// Brush color
Array.from(document.querySelectorAll('.art-brush-color')).forEach(el => {
  el.addEventListener('click', () => {
    document.querySelectorAll('.art-brush-color').forEach(e => e.classList.remove('selected'));
    el.classList.add('selected');
    brushColor = el.getAttribute('data-color');
  });
});
// Brush size
const brushSizeInput = document.getElementById('brushSize');
brushSizeInput.addEventListener('input', e => {
  brushSize = +e.target.value;
});
// Clear
const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', () => {
  paths = [];
  currentPath = [];
  redraw();
});
// Undo
const undoBtn = document.getElementById('undoBtn');
undoBtn.addEventListener('click', () => {
  paths.pop();
  redraw();
});
// Submit (placeholder)
document.getElementById('submitBtn').addEventListener('click', () => {
  alert('Submitted!');
});
// Refresh
document.querySelector('.art-refresh').addEventListener('click', () => {
  location.reload();
}); 
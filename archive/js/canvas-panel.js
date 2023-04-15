function updateCanvasDimensions(width, height) {
  canvas.width = width;
  canvas.height = height;
}

let editMode = null;
function setEditMode(mode) {
  editMode = mode;
}

updateCanvasDimensions(800, 600);

window.addEventListener("load", init, false);
function init() {
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  // draw
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

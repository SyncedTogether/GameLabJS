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

// ! DECIDE WHETHER TO USE CLASS OR NOT

class Canvas {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
    this.scenes = [];

    this.editMode = defaultEditMode;

    this.listen();
    this.animate();
  }

  animate() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    this.ctx.fillRect(0, 0, this.width, this.height);

    requestAnimationFrame(this.animate);
  }

  listen() {
    // ! CHECK IF THIS NEEDS TO BE CALLED ONCE OR CONTINUOUSLY
    canvas.addEventListener("mousedown", function (event) {
      if (editMode === "pan") {
        // ! HANDLE PANNING
      } else if (editMode === "zoom") {
        // ! HANDLING ZOOMING
      }
    });
  }

  updateCanvasDimensions(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
  }

  setEditMode(mode) {
    this.editMode = mode;
  }
}

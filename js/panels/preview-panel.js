document.addEventListener("DOMContentLoaded", function () {
  initPreviewPanel();
  initSceneListeners();
  centerCanvas();
});

function initPreviewPanel() {
  drawBackgroundCanvas();
  drawSceneCanvas();
}

function drawBackgroundCanvas() {
  if (isDisplayingGrid) {
    backgroundCanvas.width = previewContainer.clientWidth;
    backgroundCanvas.height = previewContainer.clientHeight;

    // Draw chess board background
    backgroundCanvasCtx.fillStyle = "#111111";
    backgroundCanvasCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
    backgroundCanvasCtx.fillStyle = "#222222";
    for (let i = 0; i < backgroundCanvas.width; i += bgPatterSize) {
      for (let j = 0; j < backgroundCanvas.height; j += bgPatterSize) {
        if ((i + j) % (bgPatterSize * 2) == 0) {
          backgroundCanvasCtx.fillRect(i, j, bgPatterSize, bgPatterSize);
        }
      }
    }
  } else {
    backgroundCanvas.width = previewContainer.clientWidth;
    backgroundCanvas.height = previewContainer.clientHeight;

    // Draw solid background
    backgroundCanvasCtx.fillStyle = "#111111";
    backgroundCanvasCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

  }
}

function drawSceneCanvas() {
  canvas.width = 100;
  canvas.height = 100;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function centerCanvas() {
  const containerWidth = previewContainer.clientWidth;
  const containerHeight = previewContainer.clientHeight;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  const x = (containerWidth - canvasWidth) / 2;
  const y = (containerHeight - canvasHeight) / 2;

  canvas.style.transform = `translate(${x}px, ${y}px)`;
}

function initSceneListeners() {
  const containerWidth = previewContainer.clientWidth;
  const containerHeight = previewContainer.clientHeight;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // start pan from center of canvas
  let startPanX = (containerWidth - canvasWidth) / 2;
  let startPanY = (containerHeight - canvasHeight) / 2;
  let offsetPanX = startPanX;
  let offsetPanY = startPanY;

  backgroundCanvas.addEventListener("mousedown", (e) => {
    isPanning = true;
    startPanX = e.clientX - offsetPanX;
    startPanY = e.clientY - offsetPanY;
  });

  backgroundCanvas.addEventListener("mousemove", (e) => {
    if (isPanning) {
      offsetPanX = e.clientX - startPanX;
      offsetPanY = e.clientY - startPanY;
      canvas.style.transform = `translate(${offsetPanX}px, ${offsetPanY}px)`;
    }
  });

  backgroundCanvas.addEventListener("mouseup", (e) => {
    isPanning = false;
  });

  backgroundCanvas.addEventListener("mouseleave", (e) => {
    isPanning = false;
  });

  canvas.addEventListener("mousedown", (e) => {
    isPanning = true;
    startPanX = e.clientX - offsetPanX;
    startPanY = e.clientY - offsetPanY;
  });

  canvas.addEventListener("mousemove", (e) => {
    if (isPanning) {
      offsetPanX = e.clientX - startPanX;
      offsetPanY = e.clientY - startPanY;
      canvas.style.transform = `translate(${offsetPanX}px, ${offsetPanY}px)`;
    }
  });

  canvas.addEventListener("mouseup", (e) => {
    isPanning = false;
  });

  canvas.addEventListener("mouseleave", (e) => {
    isPanning = false;
  });

  propertiesPanelHandle.addEventListener("click", () => {
    // Check if the properties panel is hidden or visible
    const isHidden = propertiesPanel.style.right === "-200px";

    // Set the right property to show or hide the panel
    propertiesPanel.style.right = isHidden ? "0px" : "-200px";

    // Rotate the handle arrow based on the panel's visibility
    propertiesPanelHandle.innerHTML = isHidden ? "&#x25B6;" : "&#x25C0;";
  });

  toggleGridButton.addEventListener("click", function () {
    isDisplayingGrid = !isDisplayingGrid;
    initPreviewPanel();
  });
}

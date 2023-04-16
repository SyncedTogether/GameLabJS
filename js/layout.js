document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("layout-container");

  const config = {
    content: [
      {
        type: "row",
        content: [
          {
            type: "column",
            content: [
              {
                type: "component",
                componentName: "previewPanel",
                title: "Preview Panel",
              },
              {
                type: "component",
                componentName: "assetPanel",
                title: "Asset Panel",
              },
            ],
          },
          {
            type: "component",
            componentName: "codePanel",
            title: "Code Panel",
          },
        ],
      },
    ],
  };

  myLayout = new GoldenLayout(config, container);

  // * Preview Panel Component
  myLayout.registerComponent("previewPanel", function (container, state) {
    container.getElement().html(
      `<div class="panel-content"><div class="preview-toolbar">
      <!-- Toolbar buttons -->
      <button class="icon-btn" id="select-btn">
        <img src="imgs/cursor.png" alt="Play Icon" class="icon" />
      </button>
      <button class="icon-btn" id="pan-btn">
        <img src="imgs/pan.png" alt="Play Icon" class="icon" />
      </button>
      <button class="icon-btn" id="zoom-btn">
        <img src="imgs/zoom.png" alt="Play Icon" class="icon" />
      </button>
      <button class="icon-btn" id="scale-btn">
        <img src="imgs/scale.png" alt="Play Icon" class="icon" />
      </button>
      <button class="icon-btn" id="rotate-btn">
        <img src="imgs/rotate.png" alt="Play Icon" class="icon" />
      </button>
      <button id="toggle-grid">Toggle Grid</button>
      <button id="toggle-properties">Toggle Properties</button>
    </div>
    <!-- <img src="imgs/bg.png" alt="Preview" class="bg" /> -->
    <canvas id="preview-canvas"></canvas>
    <div class="properties-panel">
      <!-- ! Properties panel content -->
    </div></div>`
    );
  });

  // * Asset Panel Component
  myLayout.registerComponent("assetPanel", function (container, state) {
    container.getElement().html(`
    <div class="grid-container">
    <div class="grid-child" id="folder-panel">
        <div id="file-tree"></div>
    </div>
    <div class="grid-child">
      <div class="sub-grid-container">
        <div id="file-path-container">
          <p id="file-path"></p>
          <button id="back-button">Back</button>
        </div>
        <div id="content-section"></div>
      </div>
    </div>
    </div>
    `);
  });

  // * Code Panel Component
  myLayout.registerComponent("codePanel", function (container, state) {
    container
      .getElement()
      .html(
        `<div class="editor-container"><div id="monaco-editor"></div></div>`
      );
  });

  myLayout.on("initialised", function () {
    StaggeredDOMInit();
  });

  myLayout.on("stateChanged", () => {
    // Sometimes a glitch happens when you change windows around the editor, this fixes the empty space the glitch creates
    myLayout.updateSize();
  });

  myLayout.init();
});

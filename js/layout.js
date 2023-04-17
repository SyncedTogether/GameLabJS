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
            id: "mainCodePanel",
          },
        ],
      },
    ],
  };


  myLayout = new GoldenLayout(config, container);

  // * Preview Panel Component
  myLayout.registerComponent("previewPanel", function (container, state) {
    container.getElement().html(
      `<div class="preview-container" id="preview-container-id">
      <div class="preview-toolbar">
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
    <div class="canvas-container">
    <canvas id="bg-canvas"></canvas>
    <canvas id="preview-canvas"></canvas>
    </div>
    <div class="properties-panel">
      <div class="properties-panel-handle">&#x25C0;</div>
      Test content
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
          <button id="back-button"><img src="/imgs/back.png" alt="Back"/></button>
        </div>
        <div id="content-section"></div>
      </div>
    </div>
    </div>
    `);
  });

  // * Code Panel Component
  myLayout.registerComponent("codePanel", function (container, componentState) {
    const editorContainer = document.createElement("div");
    editorContainer.classList.add("editor-container");
    container.getElement().append(editorContainer);

    const editor = monaco.editor.create(editorContainer, {
      language: "javascript",
      theme: "vs-dark",
    });

    // Add the 'monaco-editor' class to the editor's DOM node
    editor.getDomNode().classList.add("monaco-editor");

    container.on("resize", () => {
      editor.layout();
    });

    container.on("destroy", () => {
      editor.dispose();
    });

    container.editor = editor;
  });



  myLayout.on("initialised", function () {
    StaggeredDOMInit();
  });

  myLayout.on("stateChanged", () => {
    initPreviewPanel();
  });

  myLayout.init();
});

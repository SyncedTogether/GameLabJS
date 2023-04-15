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
    container.getElement().html(`<div class="panel-content"><div class="folders-section"><div id="file-tree"></div></div>
      <div class="assets-section">
        <div class="filepath-section">
          <p id="filepath-display"></p>
        </div>
        <div class="content-section">
          <div class="folder-item new-folder" id="new-folder">
            <div class="folder-icon">+</div>
            <p>New Folder</p>
          </div>
          <div class="folder-item add-item" id="add-file">
            <div class="folder-icon">+</div>
            <p>Add File</p>
          </div>
        </div>
      </div>
    </div>t</div>`);
  });

  // * Code Panel Component
  myLayout.registerComponent("codePanel", function (container, state) {
    container
      .getElement()
      .html('<div class="panel-content">Code Panel Content</div>');
  });

  myLayout.init();
});

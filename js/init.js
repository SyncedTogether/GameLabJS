// Description: This file is used to initialize the Golden Layout and the DOM elements

// Variables

let projectName = "New Project";

// Golden Layout Variables
let myLayout = null;
let filePath = null;

// Canvas Variables
const modes = {
  SELECT: "select",
  PAN: "pan",
  ZOOM: "zoom",
};
let editMode = modes.PAN;
let mouseDown = false;
let isPanning = false;
let lastMousePos = { x: 0, y: 0 };
let panOffset = { x: 0, y: 0 };
let zoomLevel = 1;
let isDisplayingGrid = true;

// Global Access to Golden Layout's DOM Elements
let pFilePath = null;
let previewContainer = null;
let backgroundCanvas = null;
let backgroundCanvasCtx = null;
let propertiesPanel = null;
let propertiesPanelHandle = null;
let canvas = null;
let ctx = null;
let toggleGridButton = null;
let homeButton = null;
let newProjectButton = null;
let saveProjectButton = null;
let projectSettingsButton = null;
const bgPatterSize = 10;

// DOM Elements added into Golden Layout don't immediately get added to the DOM
// This is why we need to wait for the layout to be ready before we can access the DOM elements
function StaggeredDOMInit() {
  pFilePath = document.getElementById("file-path");
  previewContainer = document.getElementById("preview-container-id");
  backgroundCanvas = document.getElementById("bg-canvas");
  backgroundCanvasCtx = backgroundCanvas.getContext("2d");
  canvas = document.getElementById("preview-canvas");
  ctx = canvas.getContext("2d");
  propertiesPanel = document.querySelector(".properties-panel");
  propertiesPanelHandle = document.querySelector(".properties-panel-handle");
  toggleGridButton = document.getElementById("toggle-grid");
  homeButton = document.getElementById("home-button");
  newProjectButton = document.getElementById("new-project-button");
  saveProjectButton = document.getElementById("save-project-button");
  projectSettingsButton = document.getElementById("project-settings-button");

  initListeners();
  initPreviewPanel();
}


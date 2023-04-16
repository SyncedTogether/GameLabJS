// Description: This file is used to initialize the Golden Layout and the DOM elements

// Variables
let myLayout = null;
let projectName = "New Project";
let filePath = null;

// Global Access to Golden Layout's DOM Elements
let pFilePath = null;

// DOM Elements added into Golden Layout don't immediately get added to the DOM
// This is why we need to wait for the layout to be ready before we can access the DOM elements
function StaggeredDOMInit() {
  pFilePath = document.getElementById("file-path");
}

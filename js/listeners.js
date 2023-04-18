// Handle Window Resize
window.addEventListener("resize", function () {
  // Updates the layout since it gets stuck if update isn't called on resize
  myLayout.updateSize();
  // Needs to be called twice because of weird bug with GoldenLayout
  myLayout.updateSize();
});

function initListeners() {
  homeButton.addEventListener("click", function () {
    displayHomeScreen();
  });

  newProjectButton.addEventListener("click", function () {
    if (filePath) {
      window.location.reload();
    }
  });

  saveProjectButton.addEventListener("click", function () {
    if (filePath) {
      saveProject();
    }
  });

  projectSettingsButton.addEventListener("click", function () {
    if (filePath) {
      showProjectSettings();
    }
  });
}
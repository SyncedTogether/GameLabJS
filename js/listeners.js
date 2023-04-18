// Handle Window Resize
window.addEventListener("resize", function () {
  // Updates the layout since it gets stuck if update isn't called on resize
  myLayout.updateSize();
  // Needs to be called twice because of weird bug with GoldenLayout
  myLayout.updateSize();
});

function initListeners() {
  // Show the modal when the home button is clicked
  homeButton.addEventListener('click', () => {
    homeModal.style.display = 'block';
  });

  // Hide the modal when the user clicks outside the modal content
  window.addEventListener('click', (event) => {
    if (event.target === homeModal) {
      homeModal.style.display = 'none';
    }
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

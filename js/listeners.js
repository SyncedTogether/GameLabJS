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
    if (event.target === settingsModal) {
      settingsModal.style.display = 'none';
    }
  });

  newProjectButton.addEventListener("click", function () {
    if (filePath) {
      // Ask the user if they want to create a new project, unsaved changes will be lost
      const result = confirm("Are you sure you want to create a new project? Any unsaved changes will be lost.");
      if (result) {
        window.location.reload();
      }
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

  gettingStartedButton.addEventListener("click", function () {
    window.open("https://github.com/SyncedTogether/GameLabJS/blob/main/docs/getting-started.md", "_blank");
  });

  documentationButton.addEventListener("click", function () {
    winwdow.open("https://github.com/SyncedTogether/GameLabJS/wiki", "_blank");
  });

  contributeButton.addEventListener("click", function () {
    window.open("https://github.com/SyncedTogether/GameLabJS/blob/main/docs/contributing.md", "_blank");
  });

  communityButton.addEventListener("click", function () {
    window.open("https://discord.gg/MbVE9ujcFt", "_blank");
  });

  createProject.addEventListener("click", function () {
    createNewProject();
  });

  openProject.addEventListener("click", function () {
    openExistingProject();
  });
}

function saveProject() {
  //throw function not impelemented
  console.error("saveProject() not implemented");
}

function showProjectSettings() {
  //throw function not impelemented
  settingsModal.style.display = 'block';
}

function createNewProject() {
  //throw function not impelemented
  console.error("createNewProject() not implemented");
}

function openExistingProject() {
  //throw function not impelemented
  console.error("openExistingProject() not implemented");
}
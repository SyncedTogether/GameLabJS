// Updates the file path display in the asset panel to start with the project name and continue with the file path
function updateFilePath() {
  pFilePath.textContent = projectName + ":/" + filePath;
}

// Displays the contents of a folder in the asset panel by adding a new folder and add file button and then adding a folder item for each child of the folder
function displayFolderContents(node) {
  var contentSection = $(".content-section");

  contentSection.empty();

  contentSection.append(`
        <div class="folder-item new-folder">
          <div class="folder-icon">+</div>
          <p>New Folder</p>
        </div>
        <div class="folder-item add-item">
              <div class="folder-icon">+</div>
              <p>Add File</p>
          </div>
      `);

  node.children.forEach(function (childId) {
    var childNode = $("#file-tree").jstree(true).get_node(childId);
    contentSection.append(`
          <div class="folder-item" data-id="${childId}">
            <div class="folder-icon">${childNode.icon}</div>
            <p>${childNode.text}</p>
          </div>
        `);
  });
}

// Creates a new folder in the file tree
function createNewFolder() {
  var parentNode = $("#file-tree").jstree("get_selected", true)[0];
  if (!parentNode) {
    alert("Please select a folder in the tree before creating a new folder.");
    return;
  }

  var folderName = prompt("Enter the name for the new folder:");
  if (folderName) {
    $("#file-tree").jstree("create_node", parentNode, {
      text: folderName,
      type: "folder",
    });
  }
}

// Adds a new file to the file tree
function addNewFile() {
  var parentNode = $("#file-tree").jstree("get_selected", true)[0];
  if (!parentNode) {
    alert("Please select a folder in the tree before adding a new file.");
    return;
  }

  var fileName = prompt("Enter the name for the new file:");
  if (fileName) {
    $("#file-tree").jstree("create_node", parentNode, {
      text: fileName,
      type: "file",
    });
  }
}

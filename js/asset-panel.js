// Updates the file path display in the asset panel to start with the project name and continue with the file path
function updateFilePath() {
  pFilePath.textContent = projectName + ":/" + filePath;
}

// Displays the contents of a folder in the asset panel by adding a new folder and add file button and then adding a folder item for each child of the folder
function displayFolderContents(node) {
  let contentSection = $("#content-section");

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
    // Get the node object for the child
    let childNode = $("#file-tree").jstree(true).get_node(childId);

    // Set the class based on the type of node
    let itemClass =
      childNode.type === "folder" ? "folder-item folder" : "folder-item asset";

    // Get the non sheet version of the icon
    let icon = childNode.icon.replace("sheet", "").trim();

    // Add the folder item to the content section
    contentSection.append(`
      <div class="folder-item ${itemClass}" data-id="${childId}">
        <div class="folder-icon"><img src="${icon}" alt="${itemClass}" /></div>
        <p>${childNode.text}</p>
      </div>
    `);
  });

  // This is a handler for the new folder button
  $(".new-folder").on("click", function () {
    createNewFolder();
  });

  // This is a handler for the add file button
  $(".add-item").on("click", function () {
    addNewFile();
  });

  // Handle Folder Item Click
  $(".folder").on("click", function (event) {
    let childId = $(this).data("id");
    let childNode = $("#file-tree").jstree(true).get_node(childId);
    filePath += childNode.text + "/";
    updateFilePath();
    displayFolderContents(childNode);

    // Select the clicked folder in the jsTree
    $("#file-tree").jstree("deselect_all"); // Deselect any currently selected nodes
    $("#file-tree").jstree("select_node", childId); // Select the clicked folder node
  });

  // Handle Asset Item Click
  $(".asset").on("click", function (event) {
    console.log("Asset item clicked");
  });
}

function createNewFolder() {
  var parentNode = $("#file-tree").jstree("get_selected", true)[0];
  if (!parentNode) {
    alert("Please select a folder in the tree before creating a new folder.");
    return;
  }

  var folderName = prompt("Enter the name for the new folder:");
  if (folderName) {
    $("#file-tree").jstree(
      "create_node",
      parentNode,
      {
        text: folderName,
        type: "folder",
      },
      "last"
    );
    // Refresh the file path and folder contents display
    updateFilePath();
    displayFolderContents(parentNode);
  }
}

// Adds a new file to the file tree
function addNewFile() {
  // * TODO: Allow to import file from local machine
  console.log("Adding new file");

  // ! Temporary Code
  var parentNode = $("#file-tree").jstree("get_selected", true)[0];
  if (!parentNode) {
    alert("Please select a folder in the tree before creating a new folder.");
    return;
  }

  var assetName = prompt("Enter the name for the new Asset:");
  if (assetName) {
    $("#file-tree").jstree(
      "create_node",
      parentNode,
      {
        text: assetName,
        type: "asset",
      },
      "last"
    );
    // Refresh the file path and folder contents display
    updateFilePath();
    displayFolderContents(parentNode);
  }
}

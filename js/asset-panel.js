$(document).ready(function () {
  // Add event handlers
  $("#content-section").on("click", ".new-folder", createNewFolder);
  $("#content-section").on("click", ".add-item", addNewFile);
  $("#content-section").on("dblclick", ".folder-item.folder", folderClicked);
  $("#content-section").on("dblclick", ".folder-item.asset", assetClicked);
  $("#back-button").click(backClicked);
});

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
    let itemClass = childNode.type === "folder" ? "folder-item folder" : "folder-item asset";

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
  // Create a file input element
  const fileInput = document.createElement("input");
  fileInput.type = "file";

  // Listen for the file input change event
  fileInput.addEventListener("change", (event) => {
    // Get the selected file
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    // Prepare the form data for the upload request
    const formData = new FormData();
    formData.append("file", file);

    // Send the upload request
    $.ajax({
      url: "/upload",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: (response) => {
        console.log("File uploaded successfully");

        // Add the file to the file tree
        const parentNode = $("#file-tree").jstree("get_selected", true)[0];
        if (!parentNode) {
          alert("Please select a folder in the tree before creating a new folder.");
          return;
        }

        $("#file-tree").jstree(
          "create_node",
          parentNode,
          {
            id: response.id,
            text: response.text,
            type: "asset",
            data: { path: response.data.path },
          },
          "last"
        );
        // Refresh the file path and folder contents display
        updateFilePath();
        displayFolderContents(parentNode);
      },
      error: () => {
        console.error("File upload failed");
      },
    });
  });

  // Trigger the file input click event to show the file dialog
  fileInput.click();
}

function folderClicked() {
  console.log("folder clicked");
  let childId = $(this).data("id");
  let childNode = $("#file-tree").jstree(true).get_node(childId);
  filePath += childNode.text + "/";

  // Select the clicked folder in the jsTree
  $("#file-tree").jstree("deselect_all"); // Deselect any currently selected nodes
  $("#file-tree").jstree("select_node", childId); // Select the clicked folder node
}

async function assetClicked() {
  // Get the 'data-id' attribute of the clicked element
  let fileId = $(this).data("id");

  // Get the corresponding jstree node using the 'data-id' attribute
  let fileNode = $("#file-tree").jstree(true).get_node(fileId);

  // Display the file name (stored in the 'text' property of the jstree node)
  console.log("File name:", fileNode.text);

  const mainCodePanel = myLayout.root.getItemsById("mainCodePanel")[0];

  if (mainCodePanel) {
    // Check if a tab with the same ID already exists
    let codePanel = myLayout.root.getItemsById(`${fileNode.text}`)[0];

    if (!codePanel) {
      // If the tab does not exist, create it
      mainCodePanel.parent.addChild({
        type: "component",
        componentName: "codePanel",
        title: `${fileNode.text}`,
        id: `${fileNode.text}`,
      });

      // Get the newly created code panel component
      codePanel = myLayout.root.getItemsById(`${fileNode.text}`)[0];

      // Get the Monaco editor instance
      const editor = codePanel.container.editor;
      console.log('editor: ', editor);

      // Get the file content
      const fileContent = await getFileContent(fileNode.data.path);

      // Check the file extension
      const fileExtension = fileNode.data.path.split('.').pop();

      // Set the language of the editor
      try {
        const model = editor.getModel();
        monaco.editor.setModelLanguage(model, fileExtension);
      } catch (error) {
        console.log("Error setting language:", error);
      }

      // Set the file content to the editor
      editor.setValue(fileContent);
    } else {
      // If the tab already exists, activate it
      codePanel.parent.setActiveContentItem(codePanel);
    }
  } else {
    console.error("No mainCodePanel found");
  }
}

function backClicked() {
  // Get the parent folder of the current folder
  let parentNode = $("#file-tree").jstree(true).get_node($("#file-tree").jstree("get_selected", true)[0].parent);

  // If the parent folder is the root folder, then we can't go back any further
  if (parentNode.id === "#") {
    return;
  } else {
    // go to the parent folder
    filePath = filePath.substring(0, filePath.lastIndexOf("/", filePath.length - 2) + 1);

    // Select the parent folder in the jsTree
    $("#file-tree").jstree("deselect_all"); // Deselect any currently selected nodes
    $("#file-tree").jstree("select_node", parentNode.id); // Select the parent folder node
  }
}


function getFileContent(path) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${path}`,
      type: "GET",
      success: (response) => {
        console.log("File content retrieved successfully");
        resolve(response);
      },
      error: () => {
        console.error("File content retrieval failed");
        reject();
      },
    });
  });
}
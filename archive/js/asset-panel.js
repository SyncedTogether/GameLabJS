let filePath = null;

function updateFilePath() {
  filePathDisplay.textContent = projectName + ":/" + filePath;
}

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

function createNewFolder() {
  console.log("Creating new folder");
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

// ! NEED TO FIX NODE HANDLING FOR NEW FOLDER AND ADD FILE VS GENERIC FOLDER ITEM

$("#file-tree").on("changed.jstree", function (e, data) {
  if (data.selected.length) {
    var selectedNode = data.instance.get_node(data.selected[0]);
    displayFolderContents(selectedNode);
  }
});

$(".content-section").on("click", ".folder-item", function (event) {
  event.stopPropagation();

  var nodeId = $(this).data("id");
  var treeInstance = $("#file-tree").jstree(true);
  var node = treeInstance.get_node(nodeId);
  console.log(nodeId);
  try {
    if (node.state.opened != undefined) {
      treeInstance.deselect_all();
      treeInstance.select_node(nodeId);
      treeInstance.open_node(nodeId);

      displayFolderContents(node);
    }
  } catch {}
});

$("#new-folder").on("click", function (event) {
  event.stopPropagation();
  console.log("clicking new folder");
  createNewFolder();
});

$("#add-file").on("click", function (event) {
  event.stopPropagation();
  console.log("clicking add file");
  addNewFile();
});

// ! NEED TO FIX NODE HANDLING FOR NEW FOLDER AND ADD FILE VS GENERIC FOLDER ITEM

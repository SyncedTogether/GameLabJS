$(function () {
  var treeData = [
    {
      text: "Root",
      state: { opened: true },
      type: "folder",
      children: [
        {
          text: "Subfolder 1",
          type: "folder",
          children: [
            { text: "Subfolder 1.1", type: "folder" },
            { text: "Subfolder 1.2", type: "folder" },
          ],
        },
        { text: "Subfolder 2", type: "folder" },
        { text: "Subfolder 3", type: "folder" },
      ],
    },
  ];

  $("#file-tree").jstree({
    core: {
      data: treeData,
      check_callback: true,
    },
    plugins: ["types"],
    types: {
      folder: {
        icon: "/imgs/foldersheet.png",
      },
      asset: {
        icon: "/imgs/assetsheet.png",
      },
    },
  });

  $("#file-tree").jstree({
    core: {
      data: treeData,
      check_callback: true,
      themes: {
        name: "default",
        responsive: true,
      },
    },
    plugins: ["dnd", "contextmenu", "wholerow"],
    contextmenu: {
      items: function (node) {
        return {
          create: {
            label: "Create folder",
            action: function (data) {
              var inst = $.jstree.reference(data.reference),
                obj = inst.get_node(data.reference);
              inst.create_node(
                obj,
                { text: "New folder" },
                "last",
                function (new_node) {
                  setTimeout(function () {
                    inst.edit(new_node);
                  }, 0);
                }
              );
            },
          },
          rename: {
            label: "Rename",
            action: function (data) {
              var inst = $.jstree.reference(data.reference),
                obj = inst.get_node(data.reference);
              inst.edit(obj);
            },
          },
          delete: {
            label: "Delete",
            action: function (data) {
              var inst = $.jstree.reference(data.reference),
                obj = inst.get_node(data.reference);
              if (inst.is_selected(obj)) {
                inst.delete_node(inst.get_selected());
              } else {
                inst.delete_node(obj);
              }
            },
          },
        };
      },
    },
  });

  $("#file-tree").on("ready.jstree", function (e, data) {
    // Find the root folder named "Root"
    var rootNode = data.instance
      .get_node("#")
      .children.find(function (childId) {
        var childNode = data.instance.get_node(childId);
        return childNode.text === "Root";
      });

    // Select the root folder
    if (rootNode) {
      data.instance.select_node(rootNode);
    }
    createEventHandlers();
  });

  $("#file-tree").on("changed.jstree", function (e, data) {
    if (data.selected.length) {
      console.log(data.selected);
      filePath = data.instance.get_path(data.selected[0], "/");
      updateFilePath();

      var selectedNode = data.instance.get_node(data.selected[0]);
      displayFolderContents(selectedNode);
    }
  });
});

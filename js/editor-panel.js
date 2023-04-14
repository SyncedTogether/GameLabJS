require.config({
  paths: {
    vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.31.0/min/vs",
  },
});

require(["vs/editor/editor.main"], function () {
  const editor = monaco.editor.create(document.getElementById("editor-panel"), {
    language: "javascript",
    theme: "vs-dark",
    wordWrap: "on",
  });
});

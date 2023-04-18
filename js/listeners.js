// Handle Window Resize
window.addEventListener("resize", function () {
  // Updates the layout since it gets stuck if update isn't called on resize
  myLayout.updateSize();
  // Needs to be called twice because of weird bug with GoldenLayout
  myLayout.updateSize();
});


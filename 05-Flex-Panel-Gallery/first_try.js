let panel = document.querySelectorAll(".panel");

function toggleOpen() {
  this.classList.toggle("open");
}
function toggleTextActive(event) {
  if (event.propertyName === ("flex-grow")){
    this.classList.toggle("show-text");
  }
}


panel.forEach(async (panel) => {
  panel.addEventListener("click", toggleOpen);
  panel.addEventListener("transitionend", toggleTextActive);
});
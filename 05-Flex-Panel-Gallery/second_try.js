let panels = document.querySelectorAll(".panel");

function toggleOpen() {
  this.classList.toggle("open");
  let subTitle = this.children[0];
  let title = this.children[1];
  subTitle.classList.toggle("text-active");
  title.classList.toggle("text-active");
}

panels.forEach((panel) => {
  panel.addEventListener("click", toggleOpen);
})
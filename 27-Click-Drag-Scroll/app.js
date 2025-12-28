const slider = document.querySelector(".items");
let isDown = false;
let scrollLeft, startXCoord;

function handleDrag(e) {
  if (!isDown) return;
  console.log("Mouse being dragged");
  let drag = e.pageX - startXCoord;
  slider.scrollLeft = scrollLeft + drag;
}

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");
  startXCoord = e.pageX;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("active");
  console.log("mouse clicked off");
});
slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mousemove", handleDrag);

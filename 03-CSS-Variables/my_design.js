let inputs = document.querySelectorAll(".controls input");
let img = document.querySelector("img");

function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  // console.log(this.name)
  // console.log(this.value)
  // console.log(this.dataset.sizing)
  img.style.setProperty(`--${this.name}`, this.value + suffix);
}


for (let i=0; i<inputs.length; i++) {
  inputs[i].addEventListener("change", handleUpdate);
  inputs[i].addEventListener("mousemove", handleUpdate);
}
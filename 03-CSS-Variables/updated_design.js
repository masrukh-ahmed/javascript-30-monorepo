let img = document.querySelector(".img-container img");
let inputs = document.querySelectorAll("input");

function handleUpdate() {
const suffix = this.dataset.sizing || '';

if (this.type === "color"){
  let colorHexCode = document.querySelector(".color-hex-code");
  colorHexCode.textContent = this.value;
}

img.style.setProperty(`--${this.name}`,`${this.value}${suffix}`)
}

for (let i=0; i<inputs.length; i++) {
  inputs[i].addEventListener("change", handleUpdate);
  inputs[i].addEventListener('mousemove', handleUpdate);
}
const canvas = document.querySelector("#draw-canvas");
canvas.width = canvas.offsetWidth;   // match CSS width
canvas.height = canvas.offsetHeight; // match CSS height

const ctx = canvas.getContext("2d");

let isDrawing = false; //used as a flag to check whether to draw or not
let lastX = 0;
let lastY = 0;
let hue = 1;
let change = false;

function draw(e) {
  if (!isDrawing) return;
  // console.log(e);
  ctx.beginPath();
  //setting for the drawing brush
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  // ctx.lineWidth = 1;

  ctx.moveTo(lastX, lastY); //start from
  ctx.lineTo(e.offsetX, e.offsetY); // end from
  ctx.stroke(); // this is for rendering the line on the canvas

  [lastX, lastY] = [e.offsetX, e.offsetY]; // update lastX and lastY to current position

  hue++; //changing color
  if (hue > 360) { //condition to reset the hue wheel once it reaches max
    hue = 0;
  }

  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    change = !change;
  }
  console.log(ctx.lineWidth);
  if (change) {
    ctx.lineWidth--;
  } else {
    ctx.lineWidth++;
  }

}


canvas.addEventListener("mousedown", (event) => {
  isDrawing = true;
  [lastX, lastY] = [event.offsetX, event.offsetY]; // update lastX and lastY to current position
  hue = 0; //reset the hue wheel everytime a new line starts
  ctx.lineWidth = 1;
});
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", ()=> isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);

function clearCanvas(e) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const resetBtn = document.querySelector("#reset-btn");
let currentRotation = 0;
resetBtn.addEventListener("click", () => {
  clearCanvas();
  currentRotation += 180;  
  resetBtn.style.transform = `rotate(${currentRotation}deg)`;
});
function clockTick(){
  const date = new Date();
  const seconds = date.getSeconds();
  const min = date.getMinutes();
  const hour = date.getHours();

  let secondHand = document.querySelector(".sec-hand");
  secondHand.style.transform = `rotate(${seconds*6}deg)`;
  // console.log(seconds);

  let minHand = document.querySelector(".min-hand");
  minHand.style.transform = `rotate(${(min*6)+(seconds/10)}deg)`;

  let hourHand = document.querySelector(".hour-hand");
  hourHand.style.transform = `rotate(${((hour%12)*30)+(min/2)}deg)`;

  let audio = document.querySelector("audio");
  audio.play();
  audio.currentTime = 0;
}

setInterval(clockTick,1000);
function setDate() {
  const date = new Date();

  // Logic for the seconds hand rotation
  const seconds = date.getSeconds();
  const secondInDegrees = ((seconds/60*360)+90);
  const secondHand = document.querySelector(".second-hand");
  secondHand.style.transform = `rotate(${secondInDegrees}deg)`;

  // Logic for the minute hand rotation
  const minutes = date.getMinutes();
  const minInDegrees = ((minutes/60*360)+90);
  const minHand = document.querySelector(".min-hand");
  minHand.style.transform = `rotate(${minInDegrees}deg)`;

  // Logic for the hour hand rotation
  const hours = date.getHours()%12;
  const hourInDegrees = ((hours/12*360)+90);
  const hourHand = document.querySelector(".hour-hand");
  hourHand.style.transform = `rotate(${hourInDegrees}deg)`;
}

setInterval(setDate,1000);
document.addEventListener("keydown", (event) => {
  let audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
  audio.play();
  audio.currentTime = 0;

  // selecting the div which is going to play the audio and apply the playing animation
  let keyDiv = document.querySelector(`div[data-key="${event.keyCode}"]`);
  keyDiv.classList.add("playing");

  // using the transition end event listener so that when the transtion ends
  // for keyDiv playing animation it gets removed so that 
  keyDiv.addEventListener("transitionend", () => {
    keyDiv.classList.remove("playing");
  })
})
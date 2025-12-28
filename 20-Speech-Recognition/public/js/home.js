const wordContainer = document.querySelector(".words");
let p = document.createElement('p');
wordContainer.appendChild(p);
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = "en-US";
recognition.start();

recognition.addEventListener("result", (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");
  console.log(transcript);

  if (e.results[0].isFinal) {
    p = document.createElement("p");
    wordContainer.appendChild(p);
    p.innerText = transcript;
  }
});

recognition.addEventListener("end", () => {
  recognition.start();
});

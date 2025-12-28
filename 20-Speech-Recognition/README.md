## Native Speech Recognition — JS30 Challenge 20

This project is my attempt at the **Native Speech Recognition** challenge from the JS30 series. I had to do this one on my laptop since my main PC doesn’t have a microphone.

I built this mostly on my own. I barely followed the tutorial and instead relied on **official documentation** and some targeted questions when I got stuck. This challenge pushed me to understand how browser APIs actually work instead of just copying patterns.

---

## What I Learned

### Accessing the Web Speech API

I learned how to access and initialize the Web Speech API using the browser-specific fallback:

```js
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
```

This made it clear that not all browser APIs are standardized the same way yet.

---

### Understanding SpeechRecognition Properties

I worked with a few core properties:

```js
recognition.interimResults = true;
recognition.lang = "EN-US";
recognition.start();
```

The confusing part was **`interimResults`**.

At first, I didn’t understand what changed when it was `true` vs `false`. After reading the docs, it clicked:

- When `true`, the API gives **live, changing interpretations** while the user is speaking
- When the speech ends, a **final result** is produced
- This behaves like live typing that keeps correcting itself until it settles

---

### Mistake While Reading Results

I initially tried accessing the transcript incorrectly. The correct way required understanding that `e.results` is **not a simple array**.

Correct approach:

```js
const transcript = Array.from(e.results)
  .map((result) => result[0])
  .map((result) => result.transcript)
  .join("");
```

This helped me understand how nested browser event data is usually structured.

---

### Keeping the Microphone Always On

I wasn’t sure how to keep the mic active continuously, but experimenting led me to the `end` event.

```js
recognition.addEventListener("end", () => {
  recognition.start();
});
```

This restarts speech recognition every time it stops, making the mic feel “always on”.

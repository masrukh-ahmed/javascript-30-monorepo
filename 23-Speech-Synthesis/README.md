## 📝 JS30 — Challenge 23: Speech Synthesis

This challenge introduced a **completely new browser API** and a lot of moving parts. I completed it entirely on my own by researching the Web Speech API and experimenting, only watching the tutorial once to understand the expected outcome — not the implementation.

Below are the **key concepts I learned** and **mistakes I made (and corrected)** during the process.

---

### **1. Core Architecture of Speech Synthesis**

Speech synthesis is split into **two distinct parts**, and understanding this separation is crucial.

#### **a. Speech Controller**

```js
let voice = window.speechSynthesis;
```

This is the **global controller** responsible for:

- speaking
- stopping
- pausing
- resuming
- managing the available voices list

It does **not** hold the text.

#### **b. Utterance Object**

```js
const utterance = new SpeechSynthesisUtterance();
```

This is the **message container**.

- Any text that needs to be spoken goes inside the utterance.
- We never speak raw text directly.
- The utterance is passed to the controller.

👉 This separation made it clear that **speech = controller + utterance**, not just a single function call.

---

### **2. Learning and Using `.find()` Properly**

I learned the `.find()` array method and its practical usage.

**Syntax:**

```js
array.find(callbackFn, thisArg);
```

**Example:**

```js
const numbers = [5, 12, 8, 130, 44];
const found = numbers.find((n) => n > 10);
console.log(found); // 12
```

It stops as soon as the condition is satisfied — unlike `filter`.

I used this method to locate specific controls from the options array:

```js
const voiceRateSlider = options.find((element) => element.name === "rate");

const voicePitchSlider = options.find((element) => element.name === "pitch");
```

This avoided unnecessary loops and made the intent very clear.

---

### **3. Voice List Loads Asynchronously (Important)**

One thing that **will break your app** if you don’t understand it:

👉 **The voice list does NOT load immediately.**

Because of that, calling `speechSynthesis.getVoices()` on page load can return an empty array.

The correct way is to listen for the `voiceschanged` event:

```js
voice.addEventListener("voiceschanged", populateVoiceList);

function populateVoiceList() {
  voices = voice.getVoices();
  voicesDropdown.innerHTML = voices
    .map((voice) => {
      return `<option value="${voice.lang}">${voice.name}</option>`;
    })
    .join("");
}
```

Without this event, the dropdown would randomly fail depending on browser timing.

---

### **4. Difference Between `utterance.lang` and `utterance.voice`**

This was a **conceptual clarification**, not just syntax.

```js
utterance.lang = selectedLanguage;
utterance.voice = selectedVoiceObject;
```

- **`.lang`**

  - Controls pronunciation rules and accent
  - Example: `en-US`, `en-GB`, `hi-IN`

- **`.voice`**

  - Controls the actual voice persona
  - Example: male/female, robotic/natural, Google/Microsoft voices

👉 Language ensures correctness
👉 Voice controls character

They are related but **not interchangeable**.

---

### **5. Mistake: Misunderstanding `<select>` Events**

I initially made a wrong assumption.

I thought I had to:

- attach click listeners to `<option>` elements
- use event delegation

That was incorrect.

**Options don’t emit click events reliably.**
The correct event to listen for is `change` on the `<select>` itself.

Correct implementation:

```js
voicesDropdown.addEventListener("change", setVoice);

function setVoice(e) {
  const selectedVoice = e.currentTarget.value;

  utterance.lang = selectedVoice;
  utterance.voice = voices.find((voice) => {
    return voice.lang === selectedVoice;
  });

  if (voice.speaking) {
    voice.cancel();
    speakTextAloud();
  }
}
```

Once I understood this, the logic became much simpler and more reliable.

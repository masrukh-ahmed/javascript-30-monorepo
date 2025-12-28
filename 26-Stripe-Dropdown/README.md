# JS30 — Challenge 26: Stripe Follow-Along Dropdown

This exercise was about recreating the smooth dropdown animation seen on Stripe’s website.
Even though it looks simple visually, it has quite a lot of things to implement. Mine is a small copy of the original one, cuz the real one has much better animations and responsiveness compared to mine:

- how `this` behaves in event handlers
- how timeouts interact with fast mouse movements
- how to position an element relative to its parent using `getBoundingClientRect()`

I watched the tutorial just enough to understand the direction, then wrote the logic myself.
The main learning came from fixing bugs rather than copying code.

---

# 1. Remembering How `this` Works (Normal Function vs Arrow Function)

Inside a normal function attached to a DOM element:

```js
triggers.forEach((trigger) =>
  trigger.addEventListener("mouseenter", handleEnter)
);

function handleEnter() {
  this.classList.add("trigger-enter");
}
```

`this` refers to **the DOM element that fired the event**.

But inside an arrow function, `this` does **not** reset.
Arrow functions **inherit `this` from whatever outer scope they are inside**.

Example from the challenge:

```js
this.classList.add("trigger-enter");

// arrow function inherits this from handleEnter()
setTimeout(() => {
  if (this.classList.contains("trigger-enter")) {
    this.classList.add("trigger-enter-active");
  }
}, 150);
```

Why this matters here:

- we needed to check and add a class after a delay
- if we used a normal function inside `setTimeout`, `this` would no longer point to the hovered element
- using an arrow function keeps the correct `this` without binding anything manually

That was the refresher.

---

# 2. Handling the Delay Bug (Fast Leaving vs setTimeout)

We wanted a smooth animation:

- Add a class on hover
- Wait 150ms
- Then add the “active” class so the dropdown fades in

The issue appeared when the mouse left too fast.

Example code:

```js
setTimeout(() => {
  if (this.classList.contains("trigger-enter")) {
    this.classList.add("trigger-enter-active");
  }
}, 150);
```

The key detail is the `if` check.
Without it:

- the timeout fires after 150ms
- but the mouse may have already left
- the class gets added anyway
- the dropdown stays “active” even though the pointer is gone

So the lesson was:

**never assume delayed UI still matches the current UI state.
Always check the state again when the delay fires.**

---

# 3. Positioning the Background Correctly (Bounding Rect Problem)

This was the main struggle.

Goal:

- the dropdown appears below a menu item
- a background `<div>` should resize and move behind it smoothly

Attempt:

```js
const dropdown = this.querySelector(".dropdown");
const dropdownCoords = dropdown.getBoundingClientRect();

dropdownBg.style.width = `${dropdownCoords.width}px`;
dropdownBg.style.height = `${dropdownCoords.height}px`;
dropdownBg.style.transform = `translate(${dropdownCoords.left}px, ${dropdownCoords.top}px)`;
```

Problem:

- the values from `getBoundingClientRect()` are **relative to the entire page**
- but the dropdown background is positioned **relative to the nav**
- so the background always sat lower than expected

Reason:

A child positioned absolutely inside a parent needs **coordinates relative to that parent**, not the page.

Fix:

Subtract the nav’s bounding rectangle:

```js
const navCoords = nav.getBoundingClientRect();
const dropCoords = dropdown.getBoundingClientRect();

const coords = {
  width: dropCoords.width,
  height: dropCoords.height,
  top: dropCoords.top - navCoords.top,
  left: dropCoords.left - navCoords.left,
};

dropdownBg.style.width = `${coords.width}px`;
dropdownBg.style.height = `${coords.height}px`;
dropdownBg.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
```

This works because:

- page-level numbers from the child
- minus page-level numbers from the parent
- equals **numbers relative to the parent**

That is exactly what absolute positioning inside a parent needs.

---

# ✔ Final Takeaways

This challenge taught three practical ideas:

### 1. Arrow functions and `this`

Use arrow functions inside timeouts when you want to keep `this` from the outer function.

### 2. UI timing is never guaranteed

If you delay anything visual, always re-check the current state before applying styles.

### 3. Positioning elements requires the correct coordinate system

Bounding rectangles give **page coordinates**.
Subtract the parent rectangle when positioning inside a parent.

These are all real problems you meet in dropdowns, modals, tooltips, and hover menus.

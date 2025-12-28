# JS30 – Challenge 28: Video Controller UI

## Overview

This challenge is about building a **custom playback speed controller** for a video.

The UI works by:

- dragging the mouse vertically
- changing the height of a bar
- mapping that height to a playback speed

Most of the concepts used here were already familiar from earlier challenges.
The **only real difficulty** was understanding **how to measure mouse position correctly** and convert that into a usable percentage.

This README exists mainly to remember:

- where I got stuck
- why the math felt confusing
- how the calculation actually works

---

## What the UI Is Supposed to Do

- Click inside the speed controller area
- Drag the mouse up or down
- The bar height changes visually
- The video playback speed updates based on that height

So the UI bar is acting as a **visual representation of speed**.

---

## Where I Struggled

The confusion started here:

> “How do I calculate the bar height based on mouse drag?”

I understood:

- mouse events
- dragging logic
- playbackRate

But I got stuck on **measurement**:

- Which Y value should I use?
- Relative to what?
- How does this turn into a percentage?

The problem was not mouse events.
The problem was **coordinate space**.

---

## The Core Idea Behind the Calculation

To control the bar properly, I needed **three things**:

1. Where the mouse is **inside the container**
2. The **total height** of the container
3. A way to convert that into a percentage

Once I focused on these three, everything made sense.

---

## Understanding the Key Line (Most Important Part)

```js
let clickY = e.pageY - e.currentTarget.offsetTop;
```

This line measures:

- `e.pageY` → mouse position relative to the entire page
- `offsetTop` → top position of the speed container

By subtracting them, I get:

> mouse position **inside the container**, not the page

This was the missing piece.

Without this subtraction:

- the bar height would be wrong
- the speed would feel inconsistent
- dragging would break visually

---

## Converting Mouse Position to Percentage

Once I had `clickY`, the rest became logical.

```js
let percent = clickY / e.currentTarget.offsetHeight;
```

What this does:

- `clickY` → how far down I dragged
- `offsetHeight` → total height of the controller
- dividing them → percentage (0 to 1)

This percentage is the **source of truth**.

---

## Using the Percentage

### 1. Set the bar height

```js
speedBar.style.height = `${Math.round(percent * 100)}%`;
```

This:

- converts decimal to percentage
- updates the UI visually
- keeps the bar in sync with the mouse

### 2. Show playback speed

```js
speedBar.innerHTML = `${percent.toFixed(2) * videoSpeedMax}x`;
```

This:

- scales the percentage to max speed
- displays readable playback rate
- helps visually confirm the logic

### 3. Apply playback speed

```js
video.playbackRate = percent.toFixed(2) * videoSpeedMax;
```

This directly links:

- mouse position
- UI bar
- actual video speed

All three now use the **same calculation**.

---

## The Actual Code (Problem Area)

```js
speedContainer.addEventListener("mousemove", (e) => {
  if (!isMouseDown) return;

  // Mouse position inside the container
  let clickY = e.pageY - e.currentTarget.offsetTop;

  // Convert position to percentage
  let percent = clickY / e.currentTarget.offsetHeight;

  // Update UI bar height
  speedBar.style.height = `${Math.round(percent * 100)}%`;

  // Display playback speed
  speedBar.innerHTML = `${percent.toFixed(2) * videoSpeedMax}x`;

  // Apply playback speed to video
  video.playbackRate = percent.toFixed(2) * videoSpeedMax;
});
```

---

## Correct Mental Model (Important)

- Mouse events give **absolute position**
- UI logic needs **relative position**
- Relative position is found by subtraction
- Percentage connects:

  - mouse
  - UI
  - behavior

Once the percentage is correct, everything else falls into place.

---

## Final Takeaway

This challenge was not hard because of JavaScript.

It was hard because:

- I was thinking in page coordinates
- instead of component coordinates

Once I started measuring **inside the element**, the math became simple.

The biggest learning:

> UI problems are often math problems, not logic problems.

Fix the measurement, and the feature works.

---

## What I Learned From This Challenge

- Mouse position must be calculated relative to the target element
- `offsetTop` and `offsetHeight` are critical for UI math
- Percentages are the cleanest way to link UI and behavior
- One correct calculation can drive multiple features

This challenge strengthened my understanding of **UI measurements and control logic**, not just mouse events.

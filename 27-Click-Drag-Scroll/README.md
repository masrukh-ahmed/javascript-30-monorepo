# JS30 – Challenge 27: Click and Drag Scroll

## Overview

This challenge is about implementing **click-and-drag horizontal scrolling** using mouse events.

This was not a copy-paste task for me.
I spent a lot of time stuck because my **mental model of mouse events was wrong**. I expected the browser to tell me how much the mouse moved, but that assumption was incorrect.

After fixing that thinking, the entire logic became simple and predictable.

This README exists mainly for **future reference** — to remember:

- where my thinking went wrong
- what mouse events actually provide
- how drag-to-scroll really works

---

## The Core Problem I Faced

When I started working on drag-to-scroll, I assumed:

> “The browser should give me the amount the mouse moved.”

I was actively looking for a property like:

- `e.dragX`
- `e.deltaX`
- or something similar

That property **does not exist for mouse events**.

This wrong expectation caused most of my confusion.

---

## Where My Thinking Was Wrong

### Mouse events do NOT give movement

They only give **position**.

Examples:

- `e.pageX`
- `e.clientX`

These values tell:

- where the mouse is **right now**

They do **not** tell:

- how far the mouse moved
- how much it was dragged

So waiting for the browser to give “pixels dragged” was a dead end.

---

## The Correct Way to Think About Dragging

Dragging is **not** a special browser feature.

Dragging is just:

> comparing two positions at different times

That’s it.

To make drag-to-scroll work, I needed to do **three very clear things**:

1. Store the mouse position when dragging starts
2. Store the current scroll position at that same moment
3. On every mouse move, calculate the difference and apply it

No shortcuts. No magic.

---

## Why `scrollLeft` Is Necessary (Big Learning)

This line confused me a lot at first:

```js
scrollLeft = slider.scrollLeft;
```

### What I tried first (wrong approach)

Initially, I tried using `transform: translateX()` in CSS.

That was a mistake because:

- `translateX` moves the entire container
- I needed to scroll **inside** the container

So I was solving the wrong problem with the wrong tool.

### What `scrollLeft` actually does

`scrollLeft` represents:

- how much the content inside the element is already scrolled

This line:

```js
scrollLeft = slider.scrollLeft;
```

does **not** perform any action.

It only:

- remembers the current scroll position before dragging starts

### Why storing it is required

Without storing `scrollLeft`:

- the slider would jump
- previous scroll position would be lost
- dragging would feel broken

With it:

- new movement is added on top of existing scroll
- the motion feels smooth and natural

---

## What Is Actually Happening During Drag

Let’s break it down clearly:

- `startXCoord` → mouse position when clicked
- `e.pageX` → mouse position right now
- `drag = e.pageX - startXCoord` → mouse movement
- `scrollLeft + drag` → final scroll position

So the browser gives **positions**
and **I calculate movement myself**

That was the missing link.

---

## The Correct Mental Model (Important)

- Mouse events give **position**, not movement
- Movement is calculated using **subtraction**
- Drag scrolling is:

```
starting scroll position + mouse movement
```

Once I stopped searching for a magic property and started thinking in terms of:

- state
- difference
- relative change

everything clicked.

---

## Final Takeaway

Drag-to-scroll is **not complicated**.

My confusion came from expecting the browser to:

- calculate movement
- handle drag logic for me

The correct approach is always:

1. Capture the starting state
2. Track how values change
3. Apply changes relative to that state

Once this mindset was clear, the implementation became obvious.

---

## Final Code (Core Logic)

```js
const slider = document.querySelector(".items");

let isDown = false;
let scrollLeft, startXCoord;

function handleDrag(e) {
  if (!isDown) return;

  // Calculate mouse movement
  let drag = e.pageX - startXCoord;

  // Apply movement relative to stored scroll position
  slider.scrollLeft = scrollLeft + drag;
}

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");

  // Store starting state
  startXCoord = e.pageX;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("active");
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("active");
});

slider.addEventListener("mousemove", handleDrag);
```

---

## What I Learned From This Challenge

- Mouse events do not track movement for you
- Dragging is just math, not magic
- Storing state before change is critical
- `scrollLeft` is the correct tool for scrolling content
- Trying wrong approaches still helped me understand the right one

This challenge fixed a **fundamental misunderstanding**, and that made it worth the struggle.

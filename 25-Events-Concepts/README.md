# 📌 JS30 — Challenge 25: Event Capture, Propagation, Bubbling and Once

This challenge did not ask us to build a feature.
Instead, it forced us to **understand how browser events actually travel inside the DOM**.
This matters because modern UI code sits inside complex parent–child structures.
Without this knowledge, you get random bugs, unwanted clicks, and confusing interactions.

The colored nested boxes (like in the image) help you **see the travel order**.

---

# 1. Event Bubbling (Default Behavior)

Bubbling means:

- the event starts at the **target element** (the one actually clicked)
- then it travels upward through the parent elements
- finally it reaches the document and window

Example travel when clicking a small box:

```
.box  →  .container  →  .parent  →  document  →  window
```

Why this is important:

- parent elements can “hear” events triggered by children
- you can attach one listener to a parent instead of 100 children
  (this is called **event delegation**)

Basic example:

```js
parent.addEventListener("click", () => {
  console.log("Parent received the click");
});
```

Even if a child was clicked, the parent logs it.
That is bubbling.

---

# 2. Event Capture (Opposite Direction)

Capture moves **from the outside inward**:

```
window → document → parent → container → box
```

It is turned off by default.
You activate it by using an options object:

```js
element.addEventListener("click", handler, { capture: true });
```

Why this exists:

- sometimes the parent should **intercept clicks before children**
- you want control before the event reaches the inner element

Good use-cases:

- blocking a click before a child does something
- global rules before local rules

---

# 3. Stopping Event Propagation

The browser will keep moving the event through the chain unless you tell it to stop.

You stop it with:

```js
event.stopPropagation();
```

This ends the travel right there.
No parent will receive the event after that.

Why you use this:

- clicking inside a dropdown menu should NOT trigger the page behind it
- clicking inside a modal should NOT close the modal
- child button clicks should NOT trigger parent button actions

Do not overuse this.
It is strong and can hide bugs.

---

# 4. The `{ once: true }` Option

This one is small but very helpful.

```js
element.addEventListener("click", handler, { once: true });
```

Meaning:

- the event will fire only **one time**
- the browser **removes the listener** automatically after that

The old way was:

```js
element.addEventListener("click", handler);
element.removeEventListener("click", handler);
```

Now the cleanup is automatic.

Why this matters:

- first-time tutorials
- popups that should disappear forever
- expensive event listeners you do not want running repeatedly

---

# 5. How All These Ideas Fit Together

With these tools, you can now control event behavior at three levels:

- **direction** (capture vs bubbling)
- **cut the line** (stopPropagation)
- **auto-cleanup** (once)

This lets you build UI elements like:

- dropdowns
- modals
- click-outside detection
- nested buttons
- forms with multiple layers
- components that should react only once

Once you understand event travel, events stop feeling “mysterious.”
You treat them like a **flow** you can adjust:

- let it travel down (capture)
- let it travel up (bubbling)
- stop it when required
- make it run once and retire

That’s the whole point of this challenge.
It is not about the boxes — it is about learning **real DOM control**.

## JS30 – Challenge 22

### Follow Along Links (Stripe-style Hover Effect)

This challenge is a mini version of the follow-along link highlight effect used on the Stripe website.

I completed this challenge mostly on my own. I watched the tutorial once just to understand what the goal was, then rebuilt the entire thing myself without copying the logic. The challenge itself was fairly straightforward, but one part made me stop and rethink my assumptions.

![demo preview](<GIF demo preview.gif>)

### What I learned

#### 1. Using `getBoundingClientRect()` properly

I revisited `getBoundingClientRect()` and this time it finally felt intuitive. Spending time understanding what each returned value represents (`top`, `left`, `width`, `height`) made it much easier to use.

```js
const linkCoords = e.currentTarget.getBoundingClientRect();

let coords = {
  top: linkCoords.top + window.scrollY,
  left: linkCoords.left + window.scrollX,
  height: linkCoords.height,
  width: linkCoords.width,
};
```

At first, I assumed that directly using the returned values would be enough. That assumption was wrong.

The bug appeared when the page was scrolled — the highlight was offset incorrectly. After digging a bit, I realized I had completely ignored page scroll. Adding `window.scrollX` and `window.scrollY` fixed the issue immediately. That was a good reminder that DOM coordinates are viewport-relative, not page-relative.

---

#### 2. Rethinking the hover animation behavior

Initially, I thought the highlight looked odd while moving across the page and tried hiding it when the mouse left a link:

```js
// highlight.style.display = "none";
```

But this made the animation feel disconnected and abrupt. After testing it properly, I realized the continuous movement actually feels smoother and more intentional — similar to how Stripe handles it. So I removed that logic entirely.

---

### Takeaway

This challenge reinforced an important lesson:
small visual bugs usually come from incorrect assumptions, not complex logic.

Understanding how the browser calculates layout and position matters just as much as writing JavaScript itself.

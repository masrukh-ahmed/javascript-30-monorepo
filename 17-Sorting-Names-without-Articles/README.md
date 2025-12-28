# **JS30 – Challenge 17: Sorting Band Names Without Articles**

In this challenge I had to sort a list of band names alphabetically **while ignoring articles** like “a”, “an”, and “the”. Sounds simple, but I realized quickly that my initial approach was garbage — I over-engineered everything, nested loops unnecessarily, and tried to manually split and strip words like this:

```js
bands.forEach((band) => {
  const parts = band.split(" ");
  parts.forEach((part, index) => {
    if (part.toLowerCase() == ("a" || "an" || "the")) {
      parts.splice(index, 1);
    }
  });
});
```

That’s when I realized I was going in the completely wrong direction. Too many loops, too much manual checking, and a totally wrong comparison inside the condition.

Once I stepped back and looked at the tutorial again, things clicked. So here’s what I actually learned:

---

## **1. Using Regular Expressions to Strip Articles**

This was the biggest “aha!” moment. Instead of manually splitting and checking each word, a regex can instantly remove the article from the beginning of a string.

```js
const stripped = string.replace(/a |an |the /i, "");
```

A few key takeaways:

- It matches `"a "`, `"an "`, `"the "` only at the start.
- The `i` flag makes it case-insensitive.
- This is way cleaner than the loop-based logic I was trying to write.

This honestly reminded me how useful regex actually is for these tiny text-processing tasks.

---

## **2. Relearning How `sort()` Works (And Why You MUST Understand It for Real Projects)**

Sorting full strings is very different from sorting simple numbers or characters. If you want to sort properly, you need to return a positive or negative number based on the comparison.

```js
bands.sort((a, b) => {
  if (stripArticle(a) > stripArticle(b)) {
    return 1;
  } else {
    return -1;
  }
});
```

This exercise helped me solidify:

- Sorting won’t _automatically_ ignore special cases — you control the logic.
- Sorting always compares **two items at a time**, not the whole array.
- The return value determines their order:

  - `1` → swap
  - `-1` → keep
  - `0` → equal

This was a good refresher because sorting won’t always be simple alphabetical sorting — in real projects you sort objects, long strings, dates, nested values, etc.

---

## **3. The Mistake I Made While Rendering the HTML**

I wrote something like this:

```js
sortedBands
  .map((band) => {
    let HTML = `<li>${band}</li>`;
    return HTML;
  })
  .join("");
```

But earlier I was trying to use `.forEach()` instead of `.map()`, which was completely wrong.

**Why?**

- `.forEach()` performs an action but returns **undefined**.
- `.map()` creates a **new array** based on the return value.
- Since I needed a list of HTML strings to `.join("")`, `.map()` was the correct method.

This was a good reminder:

> If you need a transformed array → use **map**
> If you're only _doing something_ per element → use **forEach**

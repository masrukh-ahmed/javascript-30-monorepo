## 📝 JS30 — Challenge 18: Tallying Up Video Durations

This challenge was mostly a revision of concepts I’ve already used in the earlier parts of JS30, but a few things stood out as proper learning or correction of mistakes I usually make.

### **1. Splitting the time strings + destructuring**

The main trick here was dealing with strings like `"5:43"` or `"12:10"`, and converting them into usable numbers.
I used `.split(":")` to break the string into minutes and seconds, and then destructured them in a clean way:

```js
const [mins, secs] = node.dataset.time.split(":");
```

This is way cleaner compared to manually accessing indexes like `time[0]`, `time[1]`, etc.
Destructuring feels more readable and reduces unnecessary steps.

---

### **2. Fixing my usual mistake with `.reduce()`**

I often screw up one thing while using `.reduce()`: **forgetting to return the accumulator’s updated value**.
And when you don't return it, the whole reduce chain becomes useless because the accumulator never changes.

This time I finally corrected that habit and used the proper reduce structure:

```js
.reduce((total, vidSeconds) => {
  return total + vidSeconds;
}, 0);
```

Simple, but critical. Without `return`, you won’t get the final total at all.

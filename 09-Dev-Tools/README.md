# Dev Tools Tricks – JS30 Challenge 9

This project is part of the **[JavaScript30 Challenge by Wes Bos](https://javascript30.com/)**, specifically **Challenge #9: Dev Tools Tricks**.

The main focus of this challenge was to explore **powerful but lesser-known developer console methods** that can make debugging, performance testing, and data inspection easier and more interactive.

---

## 🧩 Overview

During this challenge, I learned **14 different console tools and methods** that help log, group, time, style, and inspect data efficiently while developing.

Each of these can be combined creatively to debug or visualize code behavior without relying on external tools.

---

## 🧠 Concepts & Console Methods Learned

### 1. **Interpolated Log Statements**

Used placeholders (`%s`) to inject dynamic values inside a log message.

```js
console.log("My name is %s.", "Masrukh Ahmed");
```

🟢 Output:
`My name is Masrukh Ahmed.`

---

### 2. **Styled Log Statements**

Used CSS inside console logs for better visibility or just for fun 😄

```js
console.log("%cHi there!", "font-size: 50px; text-shadow: 1px 1px 5px black");
```

---

### 3. **Warnings, Errors, and Info**

For clearer and categorized logging:

```js
console.warn("This is a warning!");
console.error("This is an error message!");
console.info("Just some info!");
```

---

### 4. **Testing Conditions – `console.assert()`**

Used for debugging logical errors by asserting conditions:

```js
console.assert(1 * 2 === 4 / 1, "Wrong Maths bro !!");
```

If the condition is **false**, the message is logged as an error.

---

### 5. **Clearing & Inspecting**

- `console.clear()` → Clears the console.
- `console.dir()` → Displays an interactive list of an element’s properties.

---

### 6. **Grouping Logs Together**

Makes structured logs more readable:

```js
dogs.forEach((dog) => {
  console.group(`${dog.name}:`); // or console.groupCollapsed()
  console.log(`The name of the dog is ${dog.name}.`);
  console.log(`${dog.name} is ${dog.age} years old.`);
  console.groupEnd();
});
```

👀 Useful when working with multiple related data objects.

---

### 7. **Counting Events**

Counts how many times a label is logged.

```js
for (let i = 0; i < 10; i++) {
  console.count("Action performed");
}
```

🧮 Output example:

```
Action performed: 1
Action performed: 2
...
```

---

### 8. **Timing Operations**

Great for measuring performance — how long a function or process takes to run.

```js
let endpoint = "https://catfact.ninja/fact";

async function getCatFacts() {
  let data = await fetch(endpoint);
  let jsonData = await data.json();
  return jsonData.fact;
}

async function fetchTenCatFacts() {
  console.time("10 Cat facts");
  for (let i = 0; i < 10; i++) {
    let fact = await getCatFacts();
    console.log(`${i + 1}. ${fact}`);
  }
  console.timeEnd("10 Cat facts");
}

fetchTenCatFacts();
```

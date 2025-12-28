# 🧩 Reference vs Copy — JS30 Challenge #14

This project is part of the **[JavaScript30 Challenge by Wes Bos](https://javascript30.com/)** — specifically **Challenge 14: Reference vs Copy**.

In this challenge, I learned about **how data is stored, referenced, and copied in JavaScript**, and how the behavior differs between **primitive** and **non-primitive** data types (like arrays and objects).

The goal was to understand **why changes to one variable can affect another**, and how to correctly create **independent copies** depending on the structure of the data.

---

## 🧠 What I Learned

### 🔹 1. Arrays Store _References_, Not Values

At first, I revisited the core idea that **arrays are stored by reference**, meaning they don’t directly store their data in the variable itself — instead, they store a _reference_ (or pointer) to a memory location where the actual data resides.

```js
const players = ["Wes", "Sarah", "Ryan", "Poppy"];
const team = players;
```

Here, both `players` and `team` point to the **same array in memory**.
If I change `team[2] = "Masrukh"`, then `players` will also show `"Masrukh"` — because both refer to the _same_ memory address.

---

### 🔹 2. Creating Independent Copies of Arrays

To create a new array that doesn’t affect the original, there are **four common methods**, each of which makes a _shallow copy_ of the array:

```js
const team2 = players.slice(); // Classic method
const team3 = [].concat(players); // Using concat() — new method I learned
const team4 = [...players]; // ES6 Spread syntax
const team5 = Array.from(players); // Converts any array-like object into an array
```

Each of these methods creates a **new array in memory**, fully independent of the original.
Changing one will no longer affect the other.

---

### 🔹 3. Objects Work the Same Way

Objects behave just like arrays in this regard — they are also **non-primitive data types** stored by reference.

```js
const person = { name: "Wes", age: 28 };
const captain = person; // Reference copy
captain.age = 40;
console.log(person.age); // 40 😅
```

To prevent this, we can create **copies** instead:

```js
const captain2 = Object.assign({}, person); // Shallow copy
const captain3 = { ...person }; // Spread operator
```

These methods only copy the **top-level properties**, meaning they are still **shallow copies**.

---

## 📘 Shallow Copy vs Deep Copy

This part helped me connect all the pieces together.
Here’s a summary of how copies work in JavaScript:

---

### 🔹 1. **Reference Copy**

- Only the **memory address** is copied.
- Both variables point to the same object/array.

```js
const obj2 = obj1; // Same reference
```

➡️ Changing one changes the other.

---

### 🔹 2. **Shallow Copy**

- Only the **first level** is copied.
- Nested objects or arrays are still **shared** by reference.

```js
const copy1 = Object.assign({}, obj);
const copy2 = { ...obj };
```

✅ Works fine for _flat_ objects.
⚠️ Fails if the object contains _nested_ structures.

---

### 🔹 3. **Deep Copy**

- Copies **every level** of an object.
- Fully independent of the original — even nested data.

```js
// Basic way (for JSON-safe data)
const deepCopy = JSON.parse(JSON.stringify(obj));

// Modern, more reliable way
const deepCopy = structuredClone(obj);
```

✅ `structuredClone()` can handle most data types (like Dates, Maps, Sets).
⚠️ `JSON` method doesn’t support functions or special object types.

---

## 🧩 Summary Table

| Type      | What’s Copied       | Nested Objects? | Common Methods                                      |
| --------- | ------------------- | --------------- | --------------------------------------------------- |
| Reference | Memory address only | ❌ Shared       | `=`                                                 |
| Shallow   | First level only    | ⚠️ Shared       | `Object.assign()`, spread, slice                    |
| Deep      | All levels          | ✅ Independent  | `JSON.parse(JSON.stringify())`, `structuredClone()` |

---

## 💡 Key Takeaways

- Arrays and objects are **reference-based** data types.
- To make independent copies of an object, use **slice**, **spread**, or **Object.assign()**.
- Understand the difference between **shallow** and **deep** copies — especially when working with nested data.
- Use **structuredClone()** for modern, deep-copy-safe operations.

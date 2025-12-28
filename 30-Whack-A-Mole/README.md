# JS30 – Challenge 30: Whack-A-Mole Game

## Overview

This is the final challenge of the JS30 series, and finishing it felt good because I stayed committed till the end.

At first glance, this game looked very easy.
After watching part of the tutorial, I thought I already understood everything.

That confidence was wrong.

The main place where I got stuck was **how to keep the mole peeping repeatedly until the game timer ends**.
That single problem took most of my time and forced me to rethink how looping works in event-based JavaScript.

This README exists so I don’t forget:

- why randomness is required
- why my first looping idea failed
- why recursion worked
- what bugs still remain

---

## How the Game Is Supposed to Work

- The game runs for a fixed time (10 seconds)
- Moles pop up randomly
- Each mole stays up for a random duration
- Player clicks moles to score
- When the timer ends, the game stops completely

The key point:

> The mole popping must **repeat automatically**, but also **stop cleanly** when time is up.

---

## 1. Why Random Time Is Necessary

At first, I didn’t understand why the tutorial used random timing.

Then it became clear.

If the mole pops up at fixed intervals:

- the game becomes predictable
- reflex testing is meaningless

Random timing is essential because **unpredictability is the core of the game**.

```js
function randomTime(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
```

This function:

- generates a random delay
- ensures every peep feels different
- keeps the game challenging

---

## 2. Where I Got Stuck the Most (Looping the Peep)

### My First Thought (Wrong Direction)

I initially thought:

> “Why not use a `while` loop with a flag variable?”

Something like:

- while game is active
- keep showing moles

This **does not work** in this case.

Why?

- `while` loops block the call stack
- `setTimeout` is asynchronous
- the loop finishes instantly, but timeouts haven’t executed yet

This mismatch between **sync loops** and **async behavior** caused my confusion.

---

## The Correct Solution: Recursion

After being stuck for nearly an hour, I checked the tutorial and saw **recursion** being used.

That’s when the idea clicked.

Instead of looping immediately, the function:

- waits for the timeout to finish
- then calls itself again
- checks game state every time

This matches how async code works.

### Final Working Peep Function

```js
function peep() {
  if (isGameActive === true && isTimerUp === false) {
    const latency = randomTime(200, 1500);
    const hole = randomHole(holes);

    hole.classList.add("up");

    setTimeout(() => {
      peepCount++;
      hole.classList.remove("up");
      peep(); // recursion-based repeat
    }, latency);
  } else {
    return;
  }
}
```

What this does:

- runs once
- schedules the next peep
- stops automatically when flags change

This was the **biggest learning** of the challenge.

---

## 3. How the Game Stops When Time Is Up

The stopping logic is **flag-based**, not loop-based.

```js
function startGame() {
  resetGame(); // reset state for new game
  isGameActive = true;

  lockStart(); // prevent multiple starts
  peep();

  setTimeout(() => {
    isTimerUp = true;
    alert(`You banged ${bang} moles out of ${peepCount}`);
    unlockStart();
  }, 10000);
}
```

Key idea:

- `peep()` keeps calling itself
- every call checks `isTimerUp`
- once the timer sets it to true, recursion stops naturally

No force stopping.
No hacks.

---

## 4. Handling Small Edge Cases (My Own Additions)

### Locking the Start Button

To prevent restarting the game mid-session:

```js
function lockStart() {
  startBtn.removeEventListener("click", startGame);
}

function unlockStart() {
  startBtn.addEventListener("click", startGame);
}
```

This avoids:

- overlapping game sessions
- broken state

---

### Resetting Game State

Instead of repeating reset logic everywhere, I created one function.

```js
function resetGame() {
  isTimerUp = false;
  isGameActive = false;
  bang = 0;
  peepCount = 0;
  scoreBoard.innerHTML = bang;
}
```

This keeps:

- code clean
- logic centralized
- bugs easier to track

---

## Known Bug (Still Not Fixed)

There is still one issue:

- A mole can be clicked **multiple times while it is up**
- Each click increases the score

I tried using the `once` option on event listeners, but that caused another problem:

- the listener gets removed permanently
- the same mole cannot be clicked again in future peeps

So this bug remains.

I decided not to fix it now because:

- my main goal was finishing the series
- I plan to rebuild this game later with better structure and UI

---

## Final Takeaway

This challenge looked simple, but it exposed an important gap in my understanding.

Main lessons:

- Async code does not work with normal loops
- Recursion fits event-based repetition better
- Flags are safer than force-stopping logic
- Game logic depends more on timing than visuals

Finishing this challenge was less about Whack-A-Mole
and more about **learning how JavaScript actually behaves over time**.

That made it worth it.

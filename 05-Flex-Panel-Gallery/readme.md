## Challenge 5: Flex Panel Gallery [ JS30 WESBOS ]

This project was about creating a responsive image gallery with flex panels that expand when clicked. I worked on it in two parts: first by following along with the tutorial, then by rebuilding it on my own and improving the design.

---

### Part 1: First Try (following tutorial)
![1st try demo GIF format](<Demo videos/1sttrydemo-ezgif.com-video-to-gif-converter.gif>)

* **`:first-child` and `:last-child` selectors**:
  I learnt how to target only the first and last paragraph elements inside a panel.

  ```css
  .panel > *:first-child {
    transform: translateY(-100%);
    transition: transform 0.4s ease;
  }
  .panel > *:last-child {
    transform: translateY(100%);
    transition: transform 0.4s ease;
  }
  ```

* **Multiple transitions in one property**:
  I always used `transition: all ...`, but here I learnt we can set different timings for different properties.

  ```css
  transition:
    font-size 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
    flex-grow 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
    box-shadow 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
    background-image 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11);
  ```

* **The transitionend event issue**:
  I used an event listener to trigger text animation after the panel transition. But it caused stuttering in the animations.

  ```js
  panel.forEach(async (panel) => {
    panel.addEventListener("click", toggleOpen);
    panel.addEventListener("transitionend", toggleTextActive);
  });
  ```

---

### Part 2: Second Try (built on my own)
![2nd try demo GIF format](<Demo videos/2ndtrydemo-ezgif.com-optimize.gif>)
* **Removed transitionend event stutters**:
  I replaced the `transitionend` listener with delays in CSS transitions for smoother animations and it really made a ton of difference for the animations.

  ```css
  .subtitle {
    opacity: 0;
    transition: opacity 0.7s ease-in-out;
    transition-delay: 0.3s;
  }
  .subtitle.text-active {
    opacity: 1;
  }

  .title {
    opacity: 0;
    transition: opacity 0.7s ease-in-out;
    transition-delay: 0.5s;
  }
  .title.text-active {
    opacity: 1;
  }
  ```

* **Using `children[index]` in JavaScript**:
  Instead of confusing CSS selectors, I accessed the child elements directly in JS.

  ```js
  function toggleOpen() {
    this.classList.toggle("open");
    let subTitle = this.children[0];
    let title = this.children[1];
    subTitle.classList.toggle("text-active");
    title.classList.toggle("text-active");
  }
  ```

* **Learnt `::before` and `::after` selectors**:
  I used them to add blur and dark hover effects to the panels.

  ```css
  .panel::before {
    content: '';
    background-color: rgba(0, 0, 0, 0.356);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: background-color 0.3s ease-in-out;
  }
  .panel:hover::before {
    background-color: rgba(0, 0, 0, 0);
  }
  ```

---

### Takeaway

This challenge helped me practice flexbox animations, transitions, event handling, and pseudo-elements. I also got a deeper understanding of why `transitionend` can be tricky, and how to use delays and child selectors effectively.
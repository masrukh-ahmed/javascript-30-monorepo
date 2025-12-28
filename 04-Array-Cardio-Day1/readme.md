## Array Cardio Day 1 - JS30 4th Challenge

This challenge was about practicing different **array methods in JavaScript** using data of inventors and people. I worked step by step and tried different methods like `filter`, `map`, `sort`, and `reduce`.

### What I Learned

* **Filter method**
  I filtered the inventors who were born in the 1500s.

  ```js
  let inventors_1500s = inventors.filter((inventor) => {
    if (inventor.year >= 1500 && inventor.year < 1600) {
      return inventor;
    }
  })
  console.table(inventors_1500s);
  ```

  → Learnt how the `filter` method works and also about `console.table()` for the first time.

* **Map method**
  I created an array of only first and last names of inventors.

  ```js
  let firstLastNames = inventors.map((inventor) => {
    let firstName = inventor.first;
    let lastName = inventor.last;
    return `${firstName} ${lastName}`;
  })
  console.table(firstLastNames);
  ```

  → Learnt the syntax of `map` and how it gives back a new array.

* **Sort method**
  I sorted the inventors by their birth year (oldest to youngest).

  ```js
  let orderedList = inventors.sort((a,b) => {    
    if (a.year > b.year) {
      return 1;
    } else {
      return -1;
    }
  });
  console.table(orderedList); 
  ```

  → Learnt why sort doesn’t work well with numbers by default and how to use a compare function.

* **Reduce method**
  I calculated the total years all inventors lived together.

  ```js
  let total_lifespan = inventors.reduce((total_years, inventor) => {
    let lifeSpan = inventor.passed - inventor.year;
    return total_years + lifeSpan;
  },0);
  console.log(total_lifespan);
  ```

  → Learnt how reduce works with accumulator.

* **Sort by years lived**

  ```js
  let years_lived = inventors.sort((a,b) => {
    let first_lifespan = a.passed - a.year;
    let second_lifespan = b.passed - b.year;
    if (first_lifespan > second_lifespan) {
      return 1;
    } else {
      return -1;
    }
  });
  console.table(years_lived);
  ```

* **DOM + chaining methods**
  On Wikipedia, I checked boulevards in Paris containing "de".

  ```js
  const links = Array.from(document.querySelectorAll(".mw-category-group a"));
  const de_Boulevards = links.filter((link) => {
    const subString = 'de'
    if(link.textContent.includes(subString)) {
      return link;
    }
  }).forEach(place => console.log(place.textContent));
  ```

  → Learnt how to turn NodeList into array, how `includes` works, and how to chain methods.

* **Sort by last name**

  ```js
  const alphaLast = people.sort((a,b) => {
    let [a_firstName, a_lastName] = a.split(", ");
    let [b_firstName, b_lastName] = b.split(", ");
    if (a_lastName > b_lastName){
      return 1;
    } else {
      return -1;
    }
  })
  console.table(alphaLast);
  ```

  → Learnt string `split()` and also destructuring.

* **Reduce for counting**

  ```js
  const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];
  let transportation = data.reduce((obj, item) => {
    if (!obj[item]) {            
      obj[item] = 0;
    }
    obj[item]++ ;                
    return obj;                  
  }, {});
  console.table(transportation);
  ```

  → Learnt about using `reduce` in different ways, when to use bracket notation, and that we must return the accumulator every time.

---

### Takeaway

This challenge helped me practice `filter`, `map`, `sort`, `reduce`, and chaining methods. I also got introduced to new things like `console.table()`, `includes()`, `split()`, destructuring, and converting NodeList to array.
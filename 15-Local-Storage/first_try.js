const addItemsForm = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items")) || [];

function addItemToList(e) {
  // e.preventDefault();
  const enteredText = this.querySelector('[name="item"]').value.trim();

  if (enteredText == "") {
    //if entered text is nothing then we refresh the form
    this.reset();
    return;
  }

  let item = {
    text: enteredText,
    done: false,
  };
  items.push(item); //adding to the items array

  renderList(items, itemsList); //calling the render list func to re render the list everytime a new item is added
  // though it might cause performance issues since we are re rendering it everytime but here there is no
  //animations or complex process involved, so we are fine cuz otherwise our rendering would be slow and stuttery

  localStorage.setItem("items", JSON.stringify(items)); //updating the array and saving it in local storage
  // stringifying the value since all key value pairs are converted into strings while storing
  this.reset(); // to reset the form to starting condition
}

function renderList(list, platesList) {
  //seperate function to render the list of items
  platesList.innerHTML = list
    .map((item, index) => {
      return `
      <li>
          <input type="checkbox" data-index=${index} id="item${index}" ${
        item.done ? "checked" : "" //used the ternary operator here since its much easier for use in this case,
        // and the syntax is actually quite simple, intuitive as well
      }/> 
          <label for="item${index}">${item.text}</label>
      </li>`;
    })
    .join("");
}

function toggleDone(e) {
  if (!e.target.matches("input")) return;

  const checkboxIndex = e.target.dataset.index;
  items[checkboxIndex].done = !items[checkboxIndex].done; //the main logic behind toggling true and false
  localStorage.setItem("items", JSON.stringify(items)); //once toggled updating the key value pair in local storage
  renderList(items, itemsList); // re rendering the updated items list
}

addItemsForm.addEventListener("submit", addItemToList);
itemsList.addEventListener("click", toggleDone);

renderList(items, itemsList); // this is for rendering the list after every page reload through the stored data in local storage

let checkboxes = Array.from(document.querySelectorAll("input[type='checkbox']"));
console.log(checkboxes);

let lastOne;

function handleCheck(event) {
  
  let inBetween = false;

  if (event.shiftKey && this.checked) {
    checkboxes.forEach(checkbox => {
      
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
        console.log("in between here");
      }
      console.log(checkbox);

      if (inBetween) {
        checkbox.checked = true;
      }
    })
  }

  lastChecked = this;
}


checkboxes.forEach((checkbox,index) => {
  checkbox.classList.add(`data-checkbox=${index+1}`);
  checkbox.addEventListener("click", handleCheck);
});
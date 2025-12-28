let checkboxes = Array.from(document.querySelectorAll("input[type='checkbox']"));

console.log(checkboxes);

let lastChecked;

function handleCheck(e) {
  
  if (e.shiftKey && this.checked) { //works only when shift key is pressed & checkbox is being checked
    let inBetween = false; //to be used as a flag
    checkboxes.forEach(checkbox => {

      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }
      if (inBetween) {
        checkbox.checked = true;
      }

    })
  } 

  lastChecked = this;
}

checkboxes.forEach(checkbox => {
  checkbox.addEventListener("click", handleCheck);
})
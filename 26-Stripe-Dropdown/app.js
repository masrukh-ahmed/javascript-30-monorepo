const triggers = document.querySelectorAll(".cool > li");
const dropdownBg = document.querySelector(".dropdownBackground");
const dropdownBgArrow = dropdownBg.querySelector(".arrow");
const navbar = document.querySelector(".top");

function handleEnter(e) {
  this.classList.add("trigger-enter");
  setTimeout(() => {
    if (this.classList.contains("trigger-enter")) {
      this.classList.add("trigger-enter-active");
    }
  }, 150);

  const dropdown = this.querySelector(".dropdown");
  let dropdownCoords = dropdown.getBoundingClientRect();
  let navCoords = navbar.getBoundingClientRect();
  let dropdownBgCoords = {
    width: dropdownCoords.width,
    height: dropdownCoords.height,
    left: dropdownCoords.left,
    top: dropdownCoords.top - navCoords.top,
  };
  console.log(dropdownBgCoords);
  dropdown.style.zIndex = "2";
  dropdownBg.classList.add("open");
  dropdownBg.style.width = `${dropdownBgCoords.width}px`;
  dropdownBg.style.height = `${dropdownBgCoords.height}px`;
  dropdownBg.style.transform = `translate(${dropdownBgCoords.left}px,${dropdownBgCoords.top}px)`;
}

function handleLeave(e) {
  console.log("mouse left");
  this.classList.remove("trigger-enter", "trigger-enter-active");
  dropdownBg.classList.remove("open");
}

triggers.forEach((trigger) => {
  trigger.addEventListener("mouseenter", handleEnter);
  trigger.addEventListener("mouseleave", handleLeave);
});

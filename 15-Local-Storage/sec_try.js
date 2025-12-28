const taskList = document.querySelector(".task-list");
const enterTaskSec = document.querySelector(".enter-task-sec");
const tasks = JSON.parse(localStorage.getItem("allTasks")) || [];

function addToList(tasks, taskList) {
  taskList.innerHTML = tasks
    .map((task, index) => {
      return `
        <li data-task="${index}">
          <input type="checkbox" name="task${index}" data-index="${index}" id="task${index}" ${
        task.status ? "checked" : ""
      }/>
          <label for="task1">${task.task}</label>
        </li>
        `;
    })
    .join("");
}

function taskToBeAdded(e) {
  const enterTask = this.querySelector("input[type=text]").value.trim();
  if (enterTask == "") return;
  let task = {
    task: enterTask,
    status: false,
  };

  tasks.push(task); //adding to the tasks array

  localStorage.setItem("allTasks", JSON.stringify(tasks)); //to update the data in local storage

  addToList(tasks, taskList); //adding to the list in html using the function

  this.reset();
}

function toggleStatus(e) {
  if (e.target.matches("input")) {
    const index = e.target.dataset.index;
    tasks[index].status = !tasks[index].status;
    localStorage.setItem("allTasks", JSON.stringify(tasks));
    addToList(tasks, taskList);
  }
}
taskList.addEventListener("click", toggleStatus);

const checkAllBtn = document.querySelector(".check-all-btn");
function checkAllTask() {
  //functionality for the check all button
  tasks.forEach((task) => {
    task.status = true;
  });
  localStorage.setItem("allTasks", JSON.stringify(tasks));
  addToList(tasks, taskList);
}
checkAllBtn.addEventListener("click", checkAllTask);

const unCheckAllBtn = document.querySelector(".uncheck-all-btn");
function unCheckAllTask() {
  //functionality for the uncheck all button
  tasks.forEach((task) => {
    task.status = false;
  });
  localStorage.setItem("allTasks", JSON.stringify(tasks));
  addToList(tasks, taskList);
}
unCheckAllBtn.addEventListener("click", unCheckAllTask);

const clearAllBtn = document.querySelector(".clear-all-btn");
function clearAllTasks() {
  localStorage.removeItem("allTasks");
  taskList.innerHTML = "";
}
clearAllBtn.addEventListener("click", clearAllTasks);

addToList(tasks, taskList);
enterTaskSec.addEventListener("submit", taskToBeAdded);

// VARIABLES
const body = document.querySelector("body");
const taskInput = document.querySelector("#task-input");
const addButton = document.querySelector("#add-button");
const taskList = document.querySelector("#task-list");
const form = document.querySelector("form");
const btnDeleteAll = document.querySelector("#delete-all");
// Variable del contenido del storage o array vacio.
let taskListLocalStorage = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(taskListLocalStorage);

// SAVE CHANGES IN LOCALSTORAGE
const savedLs = () => {
  localStorage.setItem("tasks", JSON.stringify(taskListLocalStorage));
};

// REMOVE TASK

// RENDER TASKS
const renderTaskList = () => {
  console.log(taskListLocalStorage);
  if (taskListLocalStorage.length) {
    taskListLocalStorage.map(
      (object) =>
        (taskList.innerHTML += `
      <li class='task' data-id="${object.name}">
       <p id="task-description">${object.name}</p>
       <button class="complete-task-button"><i class="fa-solid fa-check"></i></button>
       <button class="delete-task-button" data-id="${object.name}">
       <i class="fa-solid fa-trash"></i>
       </button>
     </li>
     `)
    );
  } else {
    taskList.innerHTML = "";
  }
  console.log(taskList);
  let liTask = document.querySelectorAll(".task");
  let delTaskBtn = document.querySelectorAll(".delete-task-button");
  console.log(delTaskBtn);
  console.log(liTask);
  console.log(delTaskBtn[0]);
  console.log(liTask[1].name);
  const newLiTask = liTask.filter((li) => {
    liTask.name != "estudiar";
  });
  console.log(newLiTask);
  // cuando haga click, lo que quiero es que le
  // agregue al li correspondiente el .deseapear
  // delTaskBtn.addEventListener("click", (e) => {
  //   if (e.currentTarget.dataset.id === liTask.dataset.id) {
  //     liTask.classList.add(".desapear");
  //   }
  // });
  savedLs();
  renderButtonDeleteAll();
};

const selectBtnDel = (array) => {};

//DELETE TASK
// const removeTask = (e) => {
//   let newTasklistProvisory = taskListLocalStorage.filter(
//     (element) => element.dataset.id != e.currentTarget.dataset.id
//   );
//   taskListLocalStorage = newTasklistProvisory;
//   savedLs();
//   renderTaskList();
// };

// CORRECT INPUT
// const correctInput = () => {
//   taskInput.value.trim().replace(/\s+/g, " ");
// };

//VALIDACION DE TAREA
// const isValidTask = (taskName) => {
//   let isValid = true;
//   if (!taskName.length) {
//     alert("Por favor ingrese una tarea");
//     isValid = false;
//   } else if (
//     taskListLocalStorage.some(
//       (task) => task.name.toLowerCase() === taskName.toLowerCase()
//     )
//   ) {
//     alert("Ya existe esa tarea");
//     isValid = false;
//   }
//   return isValid;
// };

// RENDER BUTTON DELETE ALL

const renderButtonDeleteAll = () => {
  if (taskListLocalStorage.length) {
    btnDeleteAll.disabled = false;
    btnDeleteAll.style.pointerEvents = "auto";
  } else {
    btnDeleteAll.style.pointerEvents = "none";
    btnDeleteAll.disabled = true;
  }
};

//STARTS FUNCTION
document.addEventListener("DOMContentLoaded", renderTaskList);

// ADD TASK
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // CREATE OBJECT TASK FOR SAVE IN TaskListLocalStorage
  let task = {
    name: taskInput.value,
    id: Date.now(),
  };
  taskListLocalStorage.push(task);
  savedLs();
  renderTaskList();
  taskInput.value = "";
});

// FUNCTIONS FOR DELETE TASKS
// REMOVE ALL
const removeAll = (e) => {
  taskListLocalStorage = [];
  savedLs();
  renderTaskList();
  renderButtonDeleteAll();
};

// REMOVE ALL TASKS FROM DOM ONLY
btnDeleteAll.addEventListener("click", removeAll);

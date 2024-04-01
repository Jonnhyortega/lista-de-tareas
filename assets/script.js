// VARIABLES
const body = document.querySelector("body");
const nameInput = document.querySelector("#task-input");
const addButton = document.querySelector("#add-button");
const btnDeleteAll = document.querySelector("#delete-all");
const taskList = document.querySelector("#task-list");
const form = document.querySelector("form");
let taskListLocalStorage = JSON.parse(localStorage.getItem("tasks")) || [];

// FUNCTION TO SAVE CHANGES IN LOCALSTORAGE
const savedLs = () => {
  localStorage.setItem("tasks", JSON.stringify(taskListLocalStorage));
};

// FUNCTION TO EMPTY INPUT
const emptyInput = () => {
  nameInput.value = "";
};

// FUNCTION TO CREATE TASK
const createTask = () => {
  if (nameInput.value.trim() !== "") {
    let task = {
      name: nameInput.value.trim(),
      id: Date.now(),
    };
    taskListLocalStorage.push(task);
    savedLs();
  }
};

// FUNCTION TO RENDER TASKS IN THE DOM
const renderTasks = () => {
  taskList.innerHTML = "";
  taskListLocalStorage.forEach((task) => {
    taskList.innerHTML += `
      <li class="task" data-id="${task.id}" >
        <p>${task.name}</p>
        <button class="delete-task-button" data-id="${task.id}">Borrar</button>
        <button class="complete-task-button" data-id="${task.name}">Ok</button>
      </li>
    `;
  });

  // FUNCTIONS TO COMPLETE TASK
  const completeButtons = document.querySelectorAll(".complete-task-button");
  completeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (btn.parentNode.classList.contains("complete")) {
        btn.parentNode.classList.remove("complete");
      } else {
        btn.parentNode.classList.add("complete");
      }
    });
  });
  // FUNCTIONS TO COMPLETE TASK

  //FUNCTIONS TO DELETE TASK
  const deleteButtons = document.querySelectorAll(".delete-task-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", handleDeleteTask);
  });
};

const handleDeleteTask = (e) => {
  let taskId = e.currentTarget.dataset.id;
  console.log(taskId);
  console.log(e.currentTarget.dataset.id);
  deleteTask(taskId);
};
// FUNCTION TO DELETE TASK
const deleteTask = (taskId) => {
  taskListLocalStorage = taskListLocalStorage.filter(
    (task) => task.id !== parseInt(taskId)
  );
  savedLs();
  renderTasks();
  showDeleteAllButton();
  console.log(taskListLocalStorage);
};
//FUNCTIONS TO DELETE TASK

// INIT
// SUBMIT FORM
form.addEventListener("submit", (e) => {
  e.preventDefault();
  createTask();
  emptyInput();
  renderTasks();
  showDeleteAllButton();
  savedLs();
});

// RENDER DOM
document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
  showDeleteAllButton();
});

// DELETE ALL TASKS

// FUNCTION TO SHOW DELETE-ALL BUTTON
const showDeleteAllButton = () => {
  if (taskListLocalStorage.length > 0) {
    btnDeleteAll.removeAttribute("disabled");
  } else {
    btnDeleteAll.setAttribute("disabled", "disabled");
  }
};

btnDeleteAll.addEventListener("click", (e) => {
  let respuestaUsuario = window.confirm(
    "¿Estás seguro que deseas eliminar todas las tareas?"
  );
  if (respuestaUsuario) {
    taskListLocalStorage = [];
    savedLs();
    renderTasks();
    showDeleteAllButton();
  } else {
    alert("Ok, no toques mas entonces.");
  }
});

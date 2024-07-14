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
            <p id="taskName" class = "taskName">${task.name}</p>
            <button class="edit-task-button btnTask" data-id="${task.id}"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete-task-button btnTask" data-id="${task.id}"><i class="fa-solid fa-delete-left"></i></button>
            <button class="complete-task-button btnTask" data-id="${task.id}"><i class="fa-solid fa-circle-check"></i></button>
      </li>
    `;
    
  });

  //FUNCTION TO

  //FUNCTION TO EDIT TASK
  document.querySelectorAll(".edit-task-button").forEach((b) => {
    b.addEventListener("click", (e) => {
      let btnTaskId = e.currentTarget.dataset.id;
      console.log(btnTaskId);
      console.log(taskListLocalStorage);
      const task = taskListLocalStorage.find((task) => task.id == btnTaskId);
      if (task) {
        const edit = window.prompt("Ingrese correccion", task.name);
        if (edit) {
          task.name = edit;
          savedLs();
          renderTasks();
        } else {
          return;
        }
      }
    });
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

  // completeButtons.forEach(btn=>{
  //   btn.addEventListener("click", (e) => {
  //     let taskId = e.currentTarget.dataset.id
  //     let taskFound = taskListLocalStorage.find(t=>t.id== taskId)
  //     if(taskFound){
  //       taskFound.complete = true
  //     }
  //   })
  // })

  

  //FUNCTIONS TO DELETE TASK
  const deleteButtons = document.querySelectorAll(".delete-task-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", handleDeleteTask);
  });
};


// FUNCTION TO DELETE TASK
const handleDeleteTask = (e) => {
  let taskId = e.currentTarget.dataset.id;
  deleteTask(taskId);
};

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
    btnDeleteAll.style.display = "block"
  } else {
    btnDeleteAll.setAttribute("disabled", "disabled");
    btnDeleteAll.style.display = "none"
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
    alert("Mas cuidado la proxima");
  }
});

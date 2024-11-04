const body = document.querySelector("body");
const nameInput = document.querySelector("#task-input");
const addButton = document.querySelector("#add-button");
const btnDeleteAll = document.querySelector("#delete-all");
const taskList = document.querySelector("#task-list");
const form = document.querySelector("form");
const deleteModal = document.getElementById("delete-modal");
const confirmDeleteAll = document.getElementById("confirm-delete-all");
const cancelDeleteAll = document.getElementById("cancel-delete-all");

let taskListLocalStorage = JSON.parse(localStorage.getItem("TASKS")) || [];
// let taskListsGroup = JSON.parse(localStorage.getItem("GROUPS_TASKS") || []);
// FUNCTION TO SAVE CHANGES IN LOCALSTORAGE
const savedLs = () => {
  localStorage.setItem("TASKS", JSON.stringify(taskListLocalStorage));
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
      complete: false,
    };
    taskListLocalStorage.push(task);
    savedLs();
  }
};
// TEMPLATE string card
function template(obj) {
  return `
  <li class="task ${obj.complete ? "complete" : ""}" data-id="${obj.id}">
    <p id="taskName" class="taskName">${obj.name}</p>
    <button class="edit-task-button btnTask" data-id="${
      obj.id
    }"><i class="fa-solid fa-pen-to-square"></i></button>
    <button class="delete-task-button btnTask" data-id="${
      obj.id
    }"><i class="fa-solid fa-delete-left"></i></button>
    <button class="complete-task-button btnTask" data-id="${
      obj.id
    }"><i class="fa-solid fa-circle-check"></i></button>
  </li>
  `;
}
// FUNCTION TO RENDER TASKS IN THE DOM
const renderTasks = () => {
  taskList.innerHTML = "";
  taskListLocalStorage.forEach((task) => {
    taskList.innerHTML += template(task);
  });
  // FUNCTION TO SHOW DELETE-ALL BUTTON
  showDeleteAllButton();
  //FUNCTION TO EDIT TASK
  document.querySelectorAll(".edit-task-button").forEach((b) => {
    b.addEventListener("click", (e) => {
      let btnTaskId = e.currentTarget.dataset.id;
      const task = taskListLocalStorage.find((task) => task.id == btnTaskId);
      if (task) {
        const edit = window.prompt("Ingrese corrección", task.name);
        if (edit) {
          task.name = edit;
          savedLs();
          renderTasks();
        }
      }
    });
  });
  // FUNCTIONS TO COMPLETE TASK
  const completeButtons = document.querySelectorAll(".complete-task-button");
  completeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let taskId = e.currentTarget.dataset.id;
      let taskFound = taskListLocalStorage.find((t) => t.id == taskId);
      if (taskFound) {
        taskFound.complete = !taskFound.complete;
        savedLs();
        renderTasks();
      }
    });
  });
  // FUNCTIONS TO DELETE TASK
  const deleteButtons = document.querySelectorAll(".delete-task-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const taskId = e.currentTarget.dataset.id;
      document.querySelector(".modal-content-taskDelete").style.display =
        "block";

      const confirmButton = document.querySelector("#confirm");
      const cancelButton = document.querySelector("#cancel");

      confirmButton.onclick = () => {
        deleteTask(taskId);
        document.querySelector(".modal-content-taskDelete").style.display =
          "none";
      };

      // Event to cancel
      cancelButton.onclick = () => {
        document.querySelector(".modal-content-taskDelete").style.display =
          "none";
      };
    });
  });
};
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
};
const showDeleteAllButton = () => {
  if (taskListLocalStorage.length > 0) {
    btnDeleteAll.style.display = "block";
  } else {
    btnDeleteAll.style.display = "none";
  }
};
// DELETE ALL TASKS
btnDeleteAll.addEventListener("click", (e) => {
  deleteModal.style.display = "block";
});

// Confirm delete all tasks
confirmDeleteAll.addEventListener("click", () => {
  taskListLocalStorage = [];
  savedLs();
  renderTasks();
  showDeleteAllButton();
  deleteModal.style.display = "none";
});

// Cancel delete all tasks
cancelDeleteAll.addEventListener("click", () => {
  deleteModal.style.display = "none";
});

// INIT
// SUBMIT FORM
form.addEventListener("submit", (e) => {
  e.preventDefault();
  createTask();
  emptyInput();
  renderTasks();
  savedLs();
  showDeleteAllButton();
});

// RENDER DOM
document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
});

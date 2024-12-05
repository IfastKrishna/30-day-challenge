let todos = JSON.parse(localStorage.getItem("todos")) || [];
const form = document.querySelector("#todo-form");
const todoList = document.querySelector("#todo-list");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const todoInput = document.querySelector("#todo-input");
  const todoValue = todoInput.value.trim();

  if (todoValue) {
    todos.push(todoValue);
    updateDb();
    printTodos();
    todoInput.value = "";
    showAlert("Todo added successfully.", "green");
  } else {
    showAlert("Please enter a valid todo.", "red");
  }
});

const edit = (ele, id) => {
  ele.classList.add("hidden");
  ele.nextElementSibling.classList.remove("hidden");
  const content = ele.closest(".todo-item").querySelector(".content");
  content.classList.add(
    "border",
    "border-gray-500",
    "bg-white",
    "rounded",
    "px-4",
    "py-2"
  );
  content.setAttribute("contenteditable", true);
  content.focus(); // Focus the element for editing
  const length = content.textContent.length;
  const range = document.createRange();
  const selection = window.getSelection();
  range.setStart(content.childNodes[0], length);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
};

const save = (ele, id) => {
  const content = ele.closest(".todo-item").querySelector(".content");
  content.classList.remove(
    "border",
    "border-gray-500",
    "bg-white",
    "rounded",
    "py-2",
    "px-4"
  );
  content.setAttribute("contenteditable", false);
  todos[id] = content.innerText.trim();
  updateDb();
  printTodos();
};

const destroy = (id) => {
  todos.splice(id, 1); // Remove the todo by index
  updateDb();
  printTodos();
};

function printTodos() {
  todoList.innerHTML = ""; // Clear the current todo list
  todos.forEach((todo, index) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add(
      "todo-item",
      "bg-white",
      "p-4",
      "rounded-lg",
      "shadow",
      "transition",
      "hover:shadow-lg",
      "relative"
    );
    todoItem.innerHTML = `
      
      <div class="inline-flex items-center gap-2 absolute top-3 right-3">
        <button title="Edit" class="rounded-full bg-yellow-400 text-white px-3 py-2 rounded font-semibold hover:bg-yellow-500" onclick="edit(this, ${index})">
         <i class="fa-solid fa-pencil"></i>
        </button>
        <button title="Save" class="hidden rounded-full bg-green-500 text-white px-3 py-2 rounded font-semibold hover:bg-green-600" onclick="save(this, ${index})">
          <i class="fas fa-save"></i>
        </button>
        <button title="Delete" class="rounded-full bg-red-500 text-white px-3 py-2 rounded font-semibold hover:bg-red-600" onclick="destroy(${index})">
          <i class="fas fa-trash"></i> 
        </button>
      </div>
      <p class="content flex-grow text-gray-700 mt-10">${todo}</p>
      `;
    todoList.appendChild(todoItem);
  });
}

const updateDb = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Initialize the UI
printTodos();

const showAlert = (message, type) => {
  const alert = document.querySelector("#alert");
  alert.textContent = message;
  alert.classList.add(
    `bg-${type}-200`,
    "border-l-4",
    "p-4",
    `border-${type}-400`,
    `text-${type}-700`
  );
  alert.classList.remove("hidden");
  setTimeout(() => {
    alert.classList.add("hidden");
    alert.classList.remove(
      `bg-${type}-200`,
      `border-${type}-400`,
      `text-${type}-700`
    );
  }, 3000);
};
const addTodoBefore = (curr, id) => {
  curr.parentElement.classList.add("hidden");
  const newTodo = prompt("Enter new todo to add before:");
  if (newTodo) {
    todos.splice(id, 0, newTodo.trim());
    updateDb();
    printTodos();
    showAlert("Todo added before successfully.", "green");
  }
};

const addTodoAfter = (curr, id) => {
  curr.parentElement.classList.add("hidden");
  const newTodo = prompt("Enter new todo to add after:");
  if (newTodo) {
    todos.splice(id + 1, 0, newTodo.trim());
    updateDb();
    printTodos();
    showAlert("Todo added after successfully.", "green");
  } else {
    printTodos();
  }
};

function showActionMenu(ele) {
  const actionMenu = ele.nextElementSibling;
  actionMenu.classList.toggle("hidden");
}

function printTodos() {
  todoList.innerHTML = ""; // Clear the current todo list
  todos.forEach((todo, index) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add(
      "todo-item",
      "bg-white",
      "p-4",
      "rounded-lg",
      "shadow",
      "transition",
      "hover:shadow-lg",
      "relative"
    );
    todoItem.innerHTML = `
      <div class="inline-flex items-center gap-2 absolute top-3 right-3">
        <button title="Edit" class="rounded-full bg-yellow-400 text-white px-3 py-2 rounded font-semibold hover:bg-yellow-500" onclick="edit(this, ${index})">
         <i class="fa-solid fa-pencil"></i>
        </button>
        <button title="Save" class="hidden rounded-full bg-green-500 text-white px-3 py-2 rounded font-semibold hover:bg-green-600" onclick="save(this, ${index})">
          <i class="fas fa-save"></i>
        </button>
        <button title="Delete" class="rounded-full bg-red-500 text-white px-3 py-2 rounded font-semibold hover:bg-red-600" onclick="destroy(${index})">
          <i class="fas fa-trash"></i> 
        </button>
        <button onClick="showActionMenu(this)" title="Actions" class="action-btn rounded-full bg-gray-500 text-white px-3 py-2 rounded font-semibold hover:bg-gray-600">
          <i class="fas fa-ellipsis-h"></i>
        </button>
        <div class="action-menu text-sm hidden absolute right-0 top-6 mt-2 bg-white border border-gray-200 rounded shadow">
          <button class="block w-full text-left px-2 py-1 text-gray-700 hover:bg-gray-100" onclick="addTodoBefore(this,${index})">Add Before</button>
          <button class="block w-full text-left px-2 py-1 text-gray-700 hover:bg-gray-100" onclick="addTodoAfter(this,${index})">Add After</button>
        </div>
      </div>
      <p class="content flex-grow text-gray-700 mt-10">${todo}</p>
      `;
    todoList.appendChild(todoItem);
  });
}

// remove action menu when clicked outside
document.addEventListener("click", function (e) {
  const actionMenus = document.querySelectorAll(".action-menu");
  actionMenus.forEach((menu) => {
    if (!menu.previousElementSibling.contains(e.target)) {
      menu.classList.add("hidden");
    }
  });
});

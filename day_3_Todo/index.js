let todos = [];
const form = document.querySelector("#todo-form");
const todoList = document.querySelector("#todo-list");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const todoInput = document.querySelector("#todo-input");
  const todoValue = todoInput.value;
  todos.push(todoValue);
  updateDb();
  printTodos();
  todoInput.value = "";
});

const edit = (ele, id) => {
  const content = ele.parentElement.previousElementSibling;
  content.classList.add("border", "border-black", "py-2", "px-4", "mb-2");
  content.setAttribute("contenteditable", true);
  content.focus(); // focus in the last text
};

const save = (ele, id) => {
  const content = ele.parentElement.previousElementSibling;
  content.classList.remove("border", "border-black", "py-2", "px-4", "mb-2");
  content.setAttribute("contenteditable", false);
  content.blur();
  const newContent = content.innerText;
  todos[id] = newContent; // update tood form splice method
  updateDb();
  printTodos();
};

const destory = (id) => {
  todos.splice(id, 1);
  updateDb();
  printTodos();
};

function printTodos() {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    printTodo(todo, index);
  });
}

const printTodo = (todo, id) => {
  const todoItem = document.createElement("div");
  todoItem.classList.add(..."bg-gray-200 min-h-16 p-4 rounded-lg".split(" "));
  //   todoItem.id = id;
  todoItem.innerHTML = `<p id="content">
           ${todo}
          </p>
          <div class="flex items-center gap-2">
            <button class="rounded-full p-2 bg-yellow-500" onClick="edit(this,${id})">edit</button>
            <button class="rounded-full p-2 bg-green-500" onClick="save(this, ${id})">save</button>
            <button class="rounded-full p-2 bg-red-500" onClick="destory(${id})">delete</button>
          </div>`;
  todoList.appendChild(todoItem);
};

const updateDb = () => {
  const todoString = JSON.stringify(todos);
  localStorage.setItem("todos", todoString);
};

printTodos();

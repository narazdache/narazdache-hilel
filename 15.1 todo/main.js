document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".js--form");
    const input = document.querySelector(".js--form__input");
    const todoList = document.querySelector(".js--todos-wrapper");
    function loadTodos() {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      todoList.innerHTML = "";
      todos.forEach(todo => addTodoToDOM(todo.text, todo.completed));
    }
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (text === "") return;
  
      addTodoToDOM(text);
      saveTodos();
      input.value = "";
    });
    function addTodoToDOM(text, completed = false) {
      const li = document.createElement("li");
      li.classList.add("todo-item");
      if (completed) li.classList.add("todo-item--checked");
  
      li.innerHTML = `
        <input type="checkbox" ${completed ? "checked" : ""}>
        <span class="todo-item__description">${text}</span>
        <button class="todo-item__delete">Видалити</button>
      `;
  
      todoList.appendChild(li);
    }
    todoList.addEventListener("click", (e) => {
      const target = e.target;
      const li = target.closest(".todo-item");
  
      if (target.classList.contains("todo-item__delete")) {
        li.remove();
        saveTodos();
      } else if (target.type === "checkbox") {
        li.classList.toggle("todo-item--checked");
        saveTodos();
      }
    });
    function saveTodos() {
      const todos = [];
      document.querySelectorAll(".todo-item").forEach(li => {
        const text = li.querySelector(".todo-item__description").textContent;
        const completed = li.classList.contains("todo-item--checked");
        todos.push({ text, completed });
      });
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    loadTodos();
  });
  
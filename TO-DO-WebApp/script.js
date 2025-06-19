let tasks = JSON.parse(localStorage.getItem("task")) || [];
let filter ="all";

function addTask() {
    const input =document.getElementById("taskInput");
    const text= input.value.trim();
    if (!text) return;

    const task={
        text,
        completed: false,
        createdAt: new Date().toLocaleString()
    };

    tasks.push(task);
    input.value="";
    saveAndRender();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

function clearAll() {
  if (confirm("Clear all tasks?")) {
    tasks = [];
    saveAndRender();
  }
}

function setFilter(f) {
  filter = f;
  saveAndRender();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    if (filter === "completed" && !task.completed) return;
    if (filter === "pending" && task.completed) return;

    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.onclick = () => toggleTask(index);
    li.innerHTML = `
      ${task.text}
      <span class="timestamp">${task.createdAt}</span>
      <button class="delete-btn" onclick="event.stopPropagation(); deleteTask(${index})">✖</button>
    `;
    list.appendChild(li);
  });
}

renderTasks();
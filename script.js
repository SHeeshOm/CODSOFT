/* script.js */
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskEl = document.createElement('li');
    taskEl.className = `task ${task.completed ? 'complete' : ''}`;
    taskEl.innerHTML = `
      <strong>${task.title}</strong><br>
      ${task.description ? `<small>${task.description}</small><br>` : ''}
      <small>Due: ${task.dueDate || 'N/A'} | Priority: ${task.priority}</small>
      <div class="actions">
        <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Done'}</button>
        <button onclick="editTask(${index})">Edit</button>
        <button class="delete" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(taskEl);
  });
}

function addTask(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const dueDate = document.getElementById('due-date').value;
  const priority = document.getElementById('priority').value;

  tasks.push({ title, description, dueDate, priority, completed: false });
  saveTasks();
  renderTasks();
  taskForm.reset();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const task = tasks[index];
  document.getElementById('title').value = task.title;
  document.getElementById('description').value = task.description;
  document.getElementById('due-date').value = task.dueDate;
  document.getElementById('priority').value = task.priority;
  tasks.splice(index, 1);
  renderTasks();
}

taskForm.addEventListener('submit', addTask);
renderTasks();

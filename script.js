const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filters button');
const clearCompletedBtn = document.getElementById('clear-completed-btn');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Initial render
renderTasks(tasks);

// Add task on button click
addTaskBtn.addEventListener('click', addTask);

// Add task on Enter key press
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newTask = { text: taskText, completed: false, time };
    tasks.push(newTask);
    saveTasks();
    renderTasks(tasks);
    taskInput.value = '';
  }
}

// Task click handling
taskList.addEventListener('click', (e) => {
  const index = e.target.parentElement.dataset.index;

  if (e.target.classList.contains('delete')) {
    tasks.splice(index, 1);
  } else if (e.target.classList.contains('task-text')) {
    tasks[index].completed = !tasks[index].completed;
  }

  saveTasks();
  renderTasks(tasks);
});

// Filters
filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    let filteredTasks = tasks;

    if (filter === 'active') {
      filteredTasks = tasks.filter((t) => !t.completed);
    } else if (filter === 'completed') {
      filteredTasks = tasks.filter((t) => t.completed);
    }

    renderTasks(filteredTasks);
  });
});

// Clear completed tasks
clearCompletedBtn.addEventListener('click', () => {
  tasks = tasks.filter((t) => !t.completed);
  saveTasks();
  renderTasks(tasks);
});

// Render tasks
function renderTasks(tasksArray) {
  taskList.innerHTML = '';
  tasksArray.forEach((task, index) => {
    const li = document.createElement('li');
    li.dataset.index = index;
    li.innerHTML = `
      <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
      <div>
        <span class="task-time">${task.time || ''}</span>
        <button class="delete">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

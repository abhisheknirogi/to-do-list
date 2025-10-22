const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filters button');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Display tasks on page load
renderTasks(tasks);

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if(taskText) {
        const newTask = { text: taskText, completed: false };
        tasks.push(newTask);
        saveTasks();
        renderTasks(tasks);
        taskInput.value = '';
    }
});

taskList.addEventListener('click', (e) => {
    const index = e.target.parentElement.dataset.index;
    if(e.target.classList.contains('delete')) {
        tasks.splice(index, 1);
    } else if(e.target.classList.contains('task-text')) {
        tasks[index].completed = !tasks[index].completed;
    }
    saveTasks();
    renderTasks(tasks);
});

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        let filteredTasks = tasks;
        if(filter === 'active') {
            filteredTasks = tasks.filter(t => !t.completed);
        } else if(filter === 'completed') {
            filteredTasks = tasks.filter(t => t.completed);
        }
        renderTasks(filteredTasks);
    });
});

function renderTasks(tasksArray) {
    taskList.innerHTML = '';
    tasksArray.forEach((task, index) => {
        const li = document.createElement('li');
        li.dataset.index = index;
        li.innerHTML = `
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
            <button class="delete">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
if(taskText) {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // HH:MM format
    const newTask = { text: taskText, completed: false, time: time };
    tasks.push(newTask);
    saveTasks();
    renderTasks(tasks);
    taskInput.value = '';
}
li.innerHTML = `
    <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
    <span class="task-time">${task.time}</span>
    <button class="delete">Delete</button>
`;
input.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent form submission
    myFunction();
  }
});

// Get references to the form and the list
const form = document.getElementById('newTaskForm');
const taskList = document.getElementById('taskList');

// When the form is submitted, add a new task
form.addEventListener('submit', (e) => {
  e.preventDefault(); // stop form refresh

  const taskNameInput = document.getElementById('taskName');
  const taskName = taskNameInput.value.trim();

  if (taskName) {
    addTask(taskName);
    taskNameInput.value = ''; // clear input
  }
});

// Function to create and append a task item
function addTask(name) {
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center';
  li.textContent = name;

  // optional: add a delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-sm btn-danger';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => li.remove());

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}
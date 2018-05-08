// Define UI variables
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// Load all event listeners
loadEventListeners()
const loadEventListeners = () => {
	//Add task event
	form.addEventListener('submit', addTask)
}

//Add Task, takes event since it's event handler
const addTask = (e) {
	e.preventDefault(); // Prevent form submit
	if (taskInput.value === '') {
		alert('Add a task')
	}
}
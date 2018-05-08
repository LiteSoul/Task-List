// Define UI variables
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// Load all event listeners
loadEventListeners()

function loadEventListeners() {
	//Add task event
	form.addEventListener('submit', addTask)
}

//Add Task, takes event since it's event handler
function addTask(e) {
	e.preventDefault() // Prevent form submit
	if (taskInput.value === '') {
		console.log('Please add a task')
	}
	//Create li element
	const li = document.createElement('li')
	li.className = 'collection-item' //Add class
	//Create text node and append to li
	li.appendChild(document.createTextNode(taskInput.value))
	//Create new link element
	const link = document.createElement('a')
	//Add class, and move to the right with secondary content
	link.className = 'delete-item secondary-content'
	//Add icon html
	link.innerHTML = '<i class="material-icons">delete_forever</i>'
	//Append the link to li
	li.appendChild(link)
	//Append the li to ul
	taskList.appendChild(li)
	//Clear the input
	taskInput.value = ''
}
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
	//Remove task event
	taskList.addEventListener('click', removeTask)
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

//Remove task
function removeTask(e) {
	//if we click on the icon, it gets the i tag, but we want
	//the a tag, which is the parent:
	const aTag = e.target.parentElement
	const liTag = aTag.parentElement
	const liTagText = liTag.textContent.slice(1, -14)
	if (aTag.classList.contains('delete-item')) {
		if (confirm(`Are you sure you want to delete this task?:\n${liTagText}`)) {
			liTag.remove()
		}
	}
}
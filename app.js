// Define UI variables
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// Load all event listeners
loadEventListeners()

function loadEventListeners() {
	//DOM Load Event
	document.addEventListener('DOMContentLoaded', getTasks)
	//Add task event
	form.addEventListener('submit', addTask)
	//Remove task event
	taskList.addEventListener('click', removeTask)
	//Clear tasks
	clearBtn.addEventListener('click', clearTasks)
	//Filter tasks
	filter.addEventListener('keyup', filterTasks)
}

//Get tasks from LS
function getTasks() {
	let tasks
	if (localStorage.getItem('tasks') === null) {
		tasks = []
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'))
	}
	tasks.forEach(task => {
		//Create li element
		const li = document.createElement('li')
		li.className = 'collection-item' //Add class
		//Create text node and append to li
		li.appendChild(document.createTextNode(task))
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
	})
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
	//Store in LocalStorage
	storeTaskInLS(taskInput.value)
	//Clear the input
	taskInput.value = ''
}

//Store task
function storeTaskInLS(task) {
	let tasks
	if (localStorage.getItem('tasks') === null) {
		tasks = []
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'))
	}
	tasks.push(task)
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Remove task
function removeTask(e) {
	//if we click on the icon, it gets the i tag, but we want
	//the a tag, which is the parent:
	const aTag = e.target.parentElement
	const liTag = aTag.parentElement
	//Slice the last 14 chars due to them being the Material icon 'delete_forever'
	const liTagText = liTag.textContent.slice(0, -14)
	if (aTag.classList.contains('delete-item')) {
		if (confirm(`Are you sure you want to delete this task?:\n${liTagText}`)) {
			liTag.remove()
			//Remove from LS
			removeTaskFromLS(liTag)
		}
	}
}

//Remove from LS
function removeTaskFromLS(taskItem) {
	console.log(taskItem.textContent)
	let tasks
	if (localStorage.getItem('tasks') === null) {
		tasks = []
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'))
	}

	tasks.forEach((task, index) => {
		//Slice the last 14 chars due to them being the Material icon 'delete_forever'
		const taskItemSliced = taskItem.textContent.slice(0, -14)
		if (taskItemSliced === task) {
			tasks.splice(index, 1)
		}
	})

	localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Clear tasks
function clearTasks() {
	// super slow method: taskList.innerHTML=''
	while (taskList.firstChild) {
		taskList.firstChild.remove()
	}
	//Clear from LS
	clearTasksFromLS()
}

//Clear tasks from LS
function clearTasksFromLS() {
	localStorage.clear()
}

//Filter tasks
function filterTasks(e) {
	const text = e.target.value.toLowerCase()
	const allTasks = document.querySelectorAll('.collection-item')
	allTasks.forEach(task => {
		const item = task.firstChild.textContent
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = 'block'
		} else {
			task.style.display = 'none'
		}
	})
}

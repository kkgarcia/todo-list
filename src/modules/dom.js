import todoObject from "./todo-object.js";// to separate module

const projectsContainer = document.querySelector('.projects');
const addProjectBtn = document.getElementById('add-project');
const projectNameInput = document.getElementById('project-name-input');
const todosContainer = document.querySelector('.todos')
const taskForm = document.querySelector('.task-form')
const addBtn = document.querySelector('#add')

//form
const title = document.querySelector('#title')
const details = document.querySelector('#details')
const dueDate = document.querySelector('#date')
const priorities = document.querySelectorAll('[name="priority"]')



addProjectBtn.addEventListener('click', addProject);
addBtn.addEventListener('click', addTask)


// separate module

const projects = [];

let currentFolderIndex = 0;
let currentFolderName = '';
let selectedTask = 0;

function isNameExist() {
    for (let i = 0; i < projects.length; i++) {
        if (projectNameInput.value === projects[i].name) {
            //render name exists 
            return true
        }
    }
    return false
}

function addProject() {

    if (projectNameInput.value && !isNameExist()) {
        const project = {
            name: projectNameInput.value,
            todos: []
        }

        projects.push(project)

        // localStorage.setItem('projects', JSON.stringify(projects))

        console.log(projects)
        renderProjects()
    }
}

//render function

function renderProjects() {
    //retrieve from local storage TODO
    // const projectLocal = localStorage.getItem('projects')
    // console.log(JSON.parse(projectLocal))

    projectsContainer.innerHTML = '';

    //create project component

    for (let i = 0; i < projects.length; i++) {
        const projectDiv = document.createElement('div')
        projectDiv.classList.add('project')
        projectDiv.textContent = projects[i].name
        projectDiv.dataset.index = i

        // delete button later can be div for icon "x"
        const deleteBtn = document.createElement('button')
        deleteBtn.innerText = 'del'
        deleteBtn.dataset.index = i

        projectsContainer.append(projectDiv, deleteBtn)

        projectDiv.addEventListener('click', changeFolder)
        deleteBtn.addEventListener('click', deleteProject)
    }

}

function deleteProject() {
    // set selected folder to ('') if its current folder for renderTodos()
    if (projects[this.dataset.index].name === currentFolderName) {
        currentFolderName = ''
    }
    
    projects.splice(this.dataset.index, 1);
    
    renderProjects()

    renderTodos()
}

function changeFolder() {
    currentFolderName = projects[this.dataset.index].name;
    console.log('folder: '+ currentFolderName)
    renderTodos()
}

function renderTodos() {
    // if no folder selected clear screen and return
    if (!currentFolderName) {
        todosContainer.innerHTML = ''
        console.log('no folder selected')
        return
    }

    // reset current folder index after deleted project
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].name === currentFolderName) {
            currentFolderIndex = i
        }
    }

    //retrieve from local storage TODO
    todosContainer.innerHTML = '';

    const addtaskBtn = document.createElement('button')
    addtaskBtn.innerText = 'add task';
    addtaskBtn.dataset.projectId = currentFolderIndex
    
    // currentFolderIndex = this.dataset.index
    
    
    
    let todos = projects[currentFolderIndex].todos
    console.log(todos)
    //if tasks exist
    todos.forEach((todo, index) => {
        //generate task component

        // const tasK = createTask(id=index, todo.title, todo.dueDate, priority)

        const task = document.createElement('div');
        const del = document.createElement('button')

        task.classList.add('task')
        task.dataset.id = index
        task.innerText = todo.priority

        del.innerText = 'delete task'
        del.dataset.id = index
        task.append(del)


        todosContainer.append(task)

        // task.addEventListener('click', setSelectedTask)
        del.addEventListener('click', deleteTask)
    })
    // todo.textContent = Object.values(desc)
    // todo.textContent = todos

    todosContainer.append(addtaskBtn)

    addtaskBtn.addEventListener('click', showForm)
}

function deleteTask() {
    selectedTask = this.dataset.id
    projects[currentFolderIndex].todos.splice(selectedTask, 1)
    renderTodos()
}

function setSelectedTask() {
    selectedTask = this.dataset.id
    console.log('task id: '+ selectedTask)
}

function showForm() {
    console.log('current folder:  ' + projects[currentFolderIndex].name)
    taskForm.style.display = 'block'
}


function addTask(event) {
    event.preventDefault()
    //check if input empty or exists

    let priority = ''

    priorities.forEach(input => {
        if (input.checked) priority = input.value
    })

    const task = todoObject(title.value, details.value, dueDate.value, priority)

    projects[currentFolderIndex].todos.push(task)
    console.log(projects)
    
    // rerender dotos
    
    renderTodos()

    //clear inputs
    
    taskForm.style.display = 'none'    
}


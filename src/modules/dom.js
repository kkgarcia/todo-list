import todoObject from "./todo-object.js";// to separate module
import { createTask } from "../components/task.js";
import { projectComponent } from "../components/project.js";
import { defaultprojects } from "./default-projects.js";

const projectsContainer = document.querySelector('.projects');
const addProjectBtn = document.getElementById('add-project');
const projectNameInput = document.getElementById('project-name-input');
const todosContainer = document.querySelector('.todos')
const taskForm = document.querySelector('.blur')
const addBtn = document.querySelector('#add')
const showProjectFormBtn = document.querySelector('.show-project-input-form')
const cancelBtn = document.querySelector('#cancel')
const projectForm = document.querySelector('.project-input-form')

//form
const form = document.querySelector('.myform')
const closeFormBtn = document.querySelector('#close-form-btn')
const title = document.querySelector('#title')
const details = document.querySelector('#details')
const dueDate = document.querySelector('#date')
const priorities = document.querySelectorAll('[name="priority"]')
const edit = document.querySelector('#edit')

//event listeners
showProjectFormBtn.addEventListener('click', toggleProjectForm)
cancelBtn.addEventListener('click', toggleProjectForm)
addProjectBtn.addEventListener('click', addProject);
addBtn.addEventListener('click', addTask)
edit.addEventListener('click', editTask)
closeFormBtn.addEventListener('click', closeForm)


// separate module

const projects = JSON.parse(localStorage.getItem('projects')) || defaultprojects;

renderProjects()


let currentFolderIndex = 0;
let currentFolderName = '';
let selectedTask = 0;
let previousFolderElement


function isNameExist() {
    for (let i = 0; i < projects.length; i++) {
        if (projectNameInput.value === projects[i].name) {
            //render name exists 
            alert('project exists')
            return true
        }
    }
    return false
}

function toggleProjectForm() {
    projectForm.classList.toggle('toggle')
    projectNameInput.value = '';
}

function addProject() {

    if (projectNameInput.value && !isNameExist()) {
        const project = {
            name: projectNameInput.value,
            todos: []
        }
        
        projects.push(project)
        
        localStorage.setItem('projects', JSON.stringify(projects))
        
        console.log(projects)
        toggleProjectForm()
        renderProjects()
    }
}

//render function

function renderProjects() {

    projectNameInput.value = '';
    projectsContainer.innerHTML = '';

    for (let i = 0; i < projects.length; i++) {

        const project = projectComponent(i, projects[i].name, changeFolder, deleteProject)

        projectsContainer.append(project)
    }

}

function deleteProject(event) {
    //prevent clicking on outer project div element
    event.stopPropagation()

    // set selected folder to ('') if its current folder for renderTodos()
    if (projects[this.dataset.index].name === currentFolderName) {
        currentFolderName = '';
    }
    
    projects.splice(this.dataset.index, 1);

    localStorage.setItem('projects', JSON.stringify(projects))
    
    renderProjects()

    renderTodos()
}

function changeFolder() {

    // set active folder style
    if (previousFolderElement) {
        previousFolderElement.classList.remove('selected')
        previousFolderElement = this
    } else {
        previousFolderElement = this
    }

    this.classList.add('selected')

    currentFolderName = projects[this.dataset.index].name;
    
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

    todosContainer.innerHTML = '';

    const addtaskBtn = document.createElement('button')
    addtaskBtn.classList.add('add-task-btn')
    addtaskBtn.innerText = 'Add Task';
    addtaskBtn.dataset.projectId = currentFolderIndex
    

    let todos = projects[currentFolderIndex].todos
    
    todos.forEach((todo, index) => {
      
        const task = createTask(index, todo.title, todo.details, todo.dueDate, todo.priority, todo.checked, checkTask, showEditForm, deleteTask)

        todosContainer.append(task)

    })

    todosContainer.append(addtaskBtn)

    addtaskBtn.addEventListener('click', showForm)
}

function checkTask() {
    const task = projects[currentFolderIndex].todos[this.dataset.id]
    
    task.checked = task.checked ? false : true

    localStorage.setItem('projects', JSON.stringify(projects))

    renderTodos()
}

function showEditForm() {
    //toggle buttons
    edit.style.display = 'block'
    addBtn.style.display = 'none'

    taskForm.style.display = 'flex'

    selectedTask = this.dataset.id
    
    const task = projects[currentFolderIndex].todos[this.dataset.id]

    title.value = task.title
    details.value = task.details
    dueDate.value = task.dueDate
    const priority = task.priority
    priorities.forEach(input => {
        if (input.value === priority) {
            input.checked = true
        }
    })
}

function editTask(event) {
    event.preventDefault()
    // check if input not empty TODO
    form.reportValidity()

    if (!title.checkValidity() || !dueDate.checkValidity()) {
        return
    }

    const task = projects[currentFolderIndex].todos[selectedTask]

    task.title = title.value
    task.details = details.value
    task.dueDate = dueDate.value
    priorities.forEach(input => {
        if (input.checked) task.priority = input.value
    })

    localStorage.setItem('projects', JSON.stringify(projects))

    renderTodos()

    taskForm.style.display = 'none'

    clearForm()
}

function deleteTask() {
    selectedTask = this.dataset.id
    projects[currentFolderIndex].todos.splice(selectedTask, 1)

    localStorage.setItem('projects', JSON.stringify(projects))

    renderTodos()
}

function clearForm() {
    title.value = '';
    details.value = '';
    dueDate.value = '';
    priorities[0].checked = true;
}

function showForm() {
    // toggle buttons
    addBtn.style.display = 'block'
    edit.style.display = 'none'
    

    console.log('current folder:  ' + projects[currentFolderIndex].name)
    taskForm.style.display = 'flex'
}


function addTask(event) {
    event.preventDefault()

    //check if input empty or exists
    form.reportValidity()

    if (!title.checkValidity() || !dueDate.checkValidity()) {
        return
    }
    
    let priority = ''
    
    priorities.forEach(input => {
        if (input.checked) priority = input.value
    })  

    
    const task = todoObject(title.value, details.value, dueDate.value, priority)
    
    projects[currentFolderIndex].todos.push(task)
    console.log(projects)
    
    localStorage.setItem('projects', JSON.stringify(projects))
    
    // rerender dotos
    
    renderTodos()
    
    closeForm()
}

function closeForm() {
    taskForm.style.display = 'none'
    clearForm()
}
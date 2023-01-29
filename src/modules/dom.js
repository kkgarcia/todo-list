import todoObject from "./todo-object.js";// to separate module

const projectsContainer = document.querySelector('.projects');
const addProjectBtn = document.getElementById('add-project');
const projectNameInput = document.getElementById('project-name-input');
const todosContainer = document.querySelector('.todos')
const taskForm = document.querySelector('.blur')
const addBtn = document.querySelector('#add')

//form
const title = document.querySelector('#title')
const details = document.querySelector('#details')
const dueDate = document.querySelector('#date')
const priorities = document.querySelectorAll('[name="priority"]')
const edit = document.querySelector('#edit')


addProjectBtn.addEventListener('click', addProject);
addBtn.addEventListener('click', addTask)
edit.addEventListener('click', editTask)


// separate module

const projects = JSON.parse(localStorage.getItem('projects')) || [];

renderProjects()

let currentFolderIndex = 0;
let currentFolderName = '';
let selectedTask = 0;

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

function addProject() {

    if (projectNameInput.value && !isNameExist()) {
        const project = {
            name: projectNameInput.value,
            todos: []
        }

        projects.push(project)

        localStorage.setItem('projects', JSON.stringify(projects))

        console.log(projects)
        renderProjects()
    }
}

//render function

function renderProjects() {
    //retrieve from local storage TODO
    // const projectLocal = localStorage.getItem('projects')
    // console.log(JSON.parse(projectLocal))

    projectNameInput.value = '';
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

    localStorage.setItem('projects', JSON.stringify(projects))
    
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
        const del = document.createElement('button');
        const edit = document.createElement('button')

        task.classList.add('task')
        task.dataset.id = index
        task.innerText = todo.priority

        del.innerText = 'delete task'
        del.dataset.id = index
        task.append(del)

        edit.dataset.id = index
        edit.innerText = 'edit'
        task.append(edit)

        todosContainer.append(task)

        // task.addEventListener('click', setSelectedTask)
        del.addEventListener('click', deleteTask)
        edit.addEventListener('click', showEditForm)
    })
    // todo.textContent = Object.values(desc)
    // todo.textContent = todos

    todosContainer.append(addtaskBtn)

    addtaskBtn.addEventListener('click', showForm)
}

function showEditForm() {
    //toggle buttons

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

    console.log('current folder:  ' + projects[currentFolderIndex].name)
    taskForm.style.display = 'flex'
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
    
    localStorage.setItem('projects', JSON.stringify(projects))

    // rerender dotos
    
    renderTodos()

    taskForm.style.display = 'none'    
    //clear inputs
    clearForm()
}
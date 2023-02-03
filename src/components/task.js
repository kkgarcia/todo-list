import { format } from "date-fns"

const createTask = (index, title, details, date, priority, checked, checkTask, showEditForm, deleteTask) => {
    const takscomponent = document.createElement('div')

    takscomponent.classList.add('todo')
    takscomponent.dataset.id = index

    switch(priority) {
        case 'low':
            takscomponent.classList.add('priority-low')
            break
        case 'medium':
            takscomponent.classList.add('priority-medium')
            break
        case 'high':
            takscomponent.classList.add('priority-high')
            break
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'
    checkbox.dataset.id = index
    checkbox.checked = checked

    const titleDiv = document.createElement('div')
    titleDiv.classList.add('title')
    titleDiv.innerText = title
    if (checked) titleDiv.classList.add('checked')

    const detailsBtn = document.createElement('button')
    detailsBtn.classList.add('details-btn')
    detailsBtn.dataset.id = index
    detailsBtn.innerText = 'Details'
    
    const dateDiv = document.createElement('div')
    let d = new Date(`${date}T00:00`)
    let dateFormat = format(d, 'dd/MM/yy')
    dateDiv.innerText = dateFormat
    
    const edit = document.createElement('div')
    edit.classList.add('edit-icon', 'icon')
    edit.dataset.id = index
    // edit.innerText = 'Edit'
    
    const del = document.createElement('div');
    del.classList.add('close-icon', 'icon')
    del.dataset.id = index
    // del.innerText = 'Delete'

    checkbox.addEventListener('click', checkTask)
    edit.addEventListener('click', showEditForm);
    del.addEventListener('click', deleteTask);

    takscomponent.append(checkbox, titleDiv, detailsBtn, dateDiv, edit, del)

    return  takscomponent
}

export { createTask }
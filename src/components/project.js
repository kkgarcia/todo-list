

const projectComponent = (index, name, changeFolder, deleteProject) => {

    const project = document.createElement('div');
    project.classList.add('project');
    project.dataset.index = index;
    project.textContent = name;
    
    const projectName = document.createElement('div');
    projectName.classList.add('project-name')
    
    const deleteIcon = document.createElement('div');
    deleteIcon.classList.add('delete-icon', 'icon')
    deleteIcon.style.display = 'none'
    deleteIcon.dataset.index = index;

    project.append(projectName, deleteIcon)

    project.addEventListener('click', changeFolder)
    project.addEventListener('mouseover', ()=> {
        deleteIcon.style.display = 'block'
    })
    project.addEventListener('mouseout', ()=> {
        deleteIcon.style.display = 'none'
    })
    deleteIcon.addEventListener('click', deleteProject)

    return project
}

export { projectComponent }


function todoObject(title, details='', dueDate, priority, completed=false) {
    const main = {
        title,
        details,
        dueDate,
        priority,
        completed
    }
    const proto = {
        getTitle() {
            return this.title
        }
    }
    return Object.assign(Object.create(proto), main)
}

export default todoObject
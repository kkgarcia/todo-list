

function todoObject(title, details, dueDate, priority, checked=false) {
    const main = {
        title,
        details,
        dueDate,
        priority,
        checked
    }
    const proto = {
        getTitle() {
            return this.title
        }
    }
    return Object.assign(Object.create(proto), main)
}

export default todoObject
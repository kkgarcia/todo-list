

function todoObject(title, description='', dueDate, priority) {
    const main = {
        title,
        description,
        dueDate,
        priority,
    }
    const proto = {
        getTitle() {
            return this.title
        }
    }
    return Object.assign(Object.create(proto), main)
}

export default todoObject
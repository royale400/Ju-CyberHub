// announcements.js

class AnnouncementManager {
    constructor() {
        this.announcements = [];
    }

    addAnnouncement(title, message) {
        const timestamp = new Date().toISOString();
        this.announcements.push({ title, message, timestamp });
    }

    getAnnouncements() {
        return this.announcements;
    }

    deleteAnnouncement(index) {
        if (index > -1 && index < this.announcements.length) {
            this.announcements.splice(index, 1);
        } else {
            throw new Error('Invalid announcement index');
        }
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(name, status = 'pending') {
        const task = { name, status };
        this.tasks.push(task);
    }

    getTasks() {
        return this.tasks;
    }

    updateTask(index, status) {
        if (index > -1 && index < this.tasks.length) {
            this.tasks[index].status = status;
        } else {
            throw new Error('Invalid task index');
        }
    }

    deleteTask(index) {
        if (index > -1 && index < this.tasks.length) {
            this.tasks.splice(index, 1);
        } else {
            throw new Error('Invalid task index');
        }
    }
}

module.exports = { AnnouncementManager, TaskManager };
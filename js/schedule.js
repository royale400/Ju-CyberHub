// schedule.js

// Functionality for managing schedules and timelines

class Schedule {
    constructor() {
        this.events = [];
    }

    addEvent(event) {
        this.events.push(event);
    }

    getTimeline() {
        return this.events.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
}

class Accordion {
    constructor(element) {
        this.element = element;
        this.headers = this.element.querySelectorAll('.accordion-header');
        this.bindEvents();
    }

    bindEvents() {
        this.headers.forEach(header => {
            header.addEventListener('click', () => this.toggle(header));
        });
    }

    toggle(header) {
        const panel = header.nextElementSibling;
        panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    }
}

// Example usage
const schedule = new Schedule();
schedule.addEvent({name: 'Meeting', date: '2026-03-01'});
schedule.addEvent({name: 'Conference', date: '2026-03-05'});

console.log(schedule.getTimeline()); // Output the sorted timeline

// Assuming an element with the class .accordion is present in the HTML
const accordionElement = document.querySelector('.accordion');
const accordion = new Accordion(accordionElement);
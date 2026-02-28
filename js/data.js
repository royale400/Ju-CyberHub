const scheduleData = {
    courseSchedules: [
        { courseId: 'CS101', schedule: 'Mon, Wed 9am - 10:30am' },
        { courseId: 'CS102', schedule: 'Tue, Thu 11am - 12:30pm' },
        // Add more schedules as needed
    ],
};

const professorMappings = {
    'CS101': 'Dr. Smith',
    'CS102': 'Dr. Jones',
    // Add more mappings as needed
};

const config = {
    semester: 'Spring 2026',
    maxCourses: 5,
    enableNotifications: true,
};

module.exports = { scheduleData, professorMappings, config };
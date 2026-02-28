// =========================================================
// --- إدارة الإعلانات والمهام (تتفاعل زمنياً) ---
// =========================================================
const dateNowForTasks = new Date();

const quizEndTime = new Date('2026-02-25T23:00:00'); 
const quizHideTime = new Date('2026-02-26T00:00:00'); 
const officeHoursHideTime = new Date('2026-03-01T23:00:00');

let announcements = [];

if (dateNowForTasks < quizHideTime) {
    const isQuizEnded = dateNowForTasks >= quizEndTime; 
    announcements.push({
        type: isQuizEnded ? 'ended' : 'urgent', 
        icon: 'fa-solid fa-stopwatch',
        title: `Quiz 1 ${isQuizEnded ? '<span class="task-ended-badge">انتهى الاختبار</span>' : ''}`,
        course: 'أساسيات الأمن السيبراني',
        desc: `الأربعاء 25 فبراير (10:00 م - 11:00 م) عبر بلاك بورد. المحتوى: <a href="https://drive.google.com/file/d/1Als7w3U1kW_TDdfeA1WP1K1X2ulKD1sB/view?usp=drivesdk" target="_blank" class="task-link" onclick="event.stopPropagation()">Chapter ( 1 )</a>. الاختبار: 5 أسئلة اختيار من متعدد (5 درجات).`
    });
}

if (dateNowForTasks < officeHoursHideTime) {
    announcements.push({
        type: 'info',
        icon: 'fa-solid fa-chalkboard-user',
        title: 'الساعات المكتبية',
        course: 'رياضيات الحاسب - مراجعة عامة',
        desc: 'جلسة نقاش مفتوحة لمراجعة الشروحات السابقة.<br><strong style="color: var(--accent-orange);">* الحضور اختياري (غير إلزامي)</strong>.<br><i class="fa-regular fa-clock" style="margin-left: 4px;"></i>الموعد: الأحد الساعة 10:00 مساءً.'
    });
}

const tasksBoard = document.getElementById('tasks-board');
const tasksContainer = document.getElementById('tasks-container');

if (announcements.length > 0) {
    tasksBoard.style.display = 'block';
    tasksContainer.innerHTML = announcements.map(task => `
        <div class="task-card ${task.type}">
            <div class="task-icon"><i class="${task.icon}"></i></div>
            <div class="task-content">
                <div class="task-header">
                    <h4 class="task-title">${task.title}</h4>
                    <span class="task-course">${task.course}</span>
                </div>
                <p class="task-desc">${task.desc}</p>
            </div>
        </div>
    `).join('');

    if (announcements.length > 1) {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        announcements.forEach((_, index) => {
            dotsContainer.innerHTML += `<div class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>`;
        });
        tasksBoard.appendChild(dotsContainer);

        const dots = document.querySelectorAll('.slider-dots .dot');
        tasksContainer.addEventListener('scroll', () => {
            const scrollLeft = Math.abs(tasksContainer.scrollLeft);
            const cardWidth = tasksContainer.clientWidth;
            const currentIndex = Math.round(scrollLeft / (cardWidth + 15));
            dots.forEach((dot, index) => dot.classList.toggle('active', index === currentIndex));
        });

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                tasksContainer.scrollTo({
                    left: (document.dir === 'rtl' ? -1 : 1) * (index * (tasksContainer.clientWidth + 15)),
                    behavior: 'smooth'
                });
            });
        });
    }
}

// =========================================================
// --- نظام السحب واختيار البطاقات ---
// =========================================================
const sectionCards = document.querySelectorAll('.section-card');
const tabContents = document.querySelectorAll('.tab-content-section');

sectionCards.forEach(card => {
    card.addEventListener('click', () => {
        sectionCards.forEach(c => c.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        card.classList.add('active');
        const targetId = card.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

        if(targetId === 'classes-view') { setTimeout(updateLiveTimeline, 50); }
    });
});

const tableWrapper = document.getElementById('exam-table-wrapper');
const tableFade = document.getElementById('table-fade');
if (tableWrapper && tableFade) {
    tableWrapper.addEventListener('scroll', () => {
        if (tableWrapper.scrollLeft <= -(tableWrapper.scrollWidth - tableWrapper.clientWidth - 10)) {
            tableFade.style.opacity = '0';
        } else {
            if(window.innerWidth <= 600) { tableFade.style.opacity = '1'; }
        }
    });
}

// =========================================================
// --- الأنيميشن البطل (Hero Animation) ---
// =========================================================
window.addEventListener('load', () => {
    const splash = document.getElementById('cyber-splash');
    const splashShield = document.getElementById('splash-shield');
    const headerContainer = document.getElementById('header-shield-container');
    const ripples = document.querySelectorAll('.shield-ripple');
    const mainContent = document.getElementById('main-content');
    const pageFooter = document.getElementById('page-footer');

    setTimeout(() => {
        ripples.forEach(r => r.style.display = 'none');
        splashShield.classList.add('flying');
        splash.style.backgroundColor = 'transparent';
        
        mainContent.classList.add('visible');
        pageFooter.classList.add('visible');
        
        const rectSplash = splashShield.getBoundingClientRect();
        const rectHeader = headerContainer.getBoundingClientRect();

        const deltaX = rectHeader.left + (rectHeader.width / 2) - (rectSplash.left + (rectSplash.width / 2));
        const deltaY = rectHeader.top + (rectHeader.height / 2) - (rectSplash.top + (rectSplash.height / 2));
        
        splashShield.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.8s';
        splashShield.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.4)`;
        
        document.body.classList.remove('preload');
        document.body.classList.remove('no-scroll');

        setTimeout(() => {
            headerContainer.classList.add('visible');
            splash.remove();
        }, 800);

    }, 1200); 
});

// =========================================================
// --- الروابط والمظهر الحديث ---
// =========================================================
function handleLinkClick(event, element) {
    event.preventDefault(); 
    const href = element.getAttribute('href');
    element.classList.add('clicked');
    setTimeout(() => { window.open(href, '_blank'); setTimeout(() => element.classList.remove('clicked'), 300); }, 250); 
}

const contactPill = document.getElementById('contact-pill');
document.getElementById('envelope-btn').addEventListener('click', (e) => { e.stopPropagation(); contactPill.classList.toggle('open'); });
document.addEventListener('click', (e) => { if (!contactPill.contains(e.target)) contactPill.classList.remove('open'); });

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const currentTheme = localStorage.getItem('theme') || 'dark'; 
let isLight = (currentTheme === 'light');

if (isLight) {
    body.classList.add('light-mode'); 
    themeToggle.classList.add('is-day');
}

themeToggle.addEventListener('click', () => {
    isLight = !isLight; 
    themeToggle.classList.toggle('is-day');
    
    if (isLight) {
        body.classList.add('light-mode'); 
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode'); 
        localStorage.setItem('theme', 'dark');
    }
});

// =========================================================
// --- بناء الجدول والتايم لاين (البيانات) ---
// =========================================================
const rawScheduleJSON = {
  "schedule": {
    "Sunday": [
      { "course_code": "ADIT_1110", "course_name": "مقدمة تقنية المعلومات", "start_time": "14:50", "end_time": "16:05" },
      { "course_code": "ADCY_1111", "course_name": "أساسيات الشبكات", "start_time": "21:00", "end_time": "21:35" },
      { "course_code": "ADEN_1110", "course_name": "اللغة الإنجليزية 1", "start_time": "21:40", "end_time": "22:55" }
    ],
    "Monday": [
      { "course_code": "ADCY_1112", "course_name": "أساسيات الأمن السيبراني", "start_time": "14:50", "end_time": "16:05" },
      { "course_code": "ADCY_1113", "course_name": "رياضيات الحاسب", "start_time": "21:00", "end_time": "22:15" }
    ],
    "Tuesday": [
      { "course_code": "ADIT_1110", "course_name": "مقدمة تقنية المعلومات", "start_time": "14:50", "end_time": "15:25" },
      { "course_code": "ADCY_1111", "course_name": "أساسيات الشبكات (الفترة الأولى)", "start_time": "15:30", "end_time": "16:05" },
      { "course_code": "ADCY_1111", "course_name": "أساسيات الشبكات (الفترة الثانية)", "start_time": "22:00", "end_time": "22:35" }
    ],
    "Wednesday": [
      { "course_code": "ADCY_1112", "course_name": "أساسيات الأمن السيبراني", "start_time": "14:50", "end_time": "15:25" },
      { "course_code": "ADCY_1113", "course_name": "رياضيات الحاسب", "start_time": "15:30", "end_time": "16:05" }
    ],
    "Thursday": [
      { "course_code": "ADEN_1110", "course_name": "اللغة الإنجليزية 1", "start_time": "14:50", "end_time": "15:25" }
    ]
  }
};

const professorMap = { "ADIT_1110": "د. محمود عبدالمنعم", "ADCY_1111": "د. عبدالعزيز الدمراني", "ADEN_1110": "د. جلال الربيع", "ADCY_1112": "د. عمرو أبوزيد", "ADCY_1113": "د. أسامة شاهين" };

const upcomingHolidays = [];
const nowInit = new Date();

const longWeekendShowTime = new Date('2026-02-26T23:59:59'); 
const longWeekendHideTime = new Date('2026-03-01T23:59:59'); 

if (nowInit > longWeekendShowTime && nowInit <= longWeekendHideTime) {
    upcomingHolidays.push({ 
        dateObj: new Date('2026-03-01T00:00:00'), 
        endDateObj: new Date('2026-03-01T23:59:59'), 
        targetDay: "Sunday", 
        title: "إجازة مطولة", 
        desc: "إجازة نهاية أسبوع مطولة لجميع الطلاب والمنسوبين", 
        icon: "fa-solid fa-bed" 
    });
}

const dayMapping = { "Sunday": 0, "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4 };
const arabicDayNames = { "Sunday": "الأحد", "Monday": "الاثنين", "Tuesday": "الثلاثاء", "Wednesday": "الأربعاء", "Thursday": "الخميس" };

const formatTime = (t) => { const [h, m] = t.split(':').map(Number); const suffix = h >= 12 ? 'م' : 'ص'; let H = h > 12 ? h - 12 : h; if (H === 0 && h !== 12) H = 12; if (h === 12) H = 12; return `${H}:${m.toString().padStart(2,'0')} ${suffix}`; };
const timeToMins = (t) => { const [h, m] = t.split(':').map(Number); return (h * 60) + m; };

document.getElementById('current-date').innerText = nowInit.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

const accordionContainer = document.getElementById('accordion-container');
const currentDayIndexInit = nowInit.getDay();
const currentMinutesInit = (nowInit.getHours() * 60) + nowInit.getMinutes();

let targetDayIndex = currentDayIndexInit;
const todayEngInit = Object.keys(dayMapping).find(k => dayMapping[k] === currentDayIndexInit);
if (todayEngInit && rawScheduleJSON.schedule[todayEngInit]) {
    const todayCourses = rawScheduleJSON.schedule[todayEngInit];
    let isTodayOver = true;
    for (let i = 0; i < todayCourses.length; i++) { if (currentMinutesInit <= timeToMins(todayCourses[i].end_time)) { isTodayOver = false; break; } }
    if (isTodayOver) targetDayIndex = currentDayIndexInit + 1;
}
if (targetDayIndex === 5 || targetDayIndex === 6 || targetDayIndex > 6) targetDayIndex = 0;

function createAccordionItem(title, contentHTML, isHolidayDay = false, isHighlight = false, badgeText = "") {
    const item = document.createElement('div');
    item.className = `accordion-item ${isHolidayDay ? 'is-holiday-day' : ''}`;
    
    const header = document.createElement('button');
    header.className = 'accordion-header';
    header.innerHTML = `<span>${title} ${badgeText ? `<span class="today-badge">${badgeText}</span>` : ''}</span><i class="fa-solid fa-chevron-down icon-plus"></i>`;

    const panel = document.createElement('div');
    panel.className = 'accordion-panel';
    panel.innerHTML = `<div class="panel-content">${contentHTML}</div>`;

    header.addEventListener('click', function() {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.accordion-item.active').forEach(actItem => {
            if (actItem !== item) { actItem.classList.remove('active'); actItem.querySelector('.accordion-panel').style.maxHeight = null; }
        });
        if (!isActive) { item.classList.add('active'); panel.style.maxHeight = panel.scrollHeight + "px"; } 
        else { item.classList.remove('active'); panel.style.maxHeight = null; }
    });
    item.appendChild(header); item.appendChild(panel); return item;
}

Object.entries(rawScheduleJSON.schedule).sort((a, b) => dayMapping[a[0]] - dayMapping[b[0]]).forEach(([englishDay, courses]) => {
    const dayName = arabicDayNames[englishDay]; const dayIndex = dayMapping[englishDay];
    let contentHTML = ''; let isHolidayDay = false; let displayTitle = dayName;
    
    const activeHoliday = upcomingHolidays.find(h => h.targetDay === englishDay && nowInit <= h.endDateObj);

    if (activeHoliday) {
        isHolidayDay = true; displayTitle = `${dayName} (إجازة)`;
        contentHTML = `<div class="holiday-card"><div class="holiday-icon-box"><i class="${activeHoliday.icon}"></i></div><div class="holiday-content"><h3>${activeHoliday.title}</h3><p>${activeHoliday.desc}</p><span class="holiday-date">${activeHoliday.dateObj.toLocaleDateString('ar-SA', { month: 'long', day: 'numeric' })}</span></div></div>`;
    } else {
        courses.sort((a, b) => a.start_time.localeCompare(b.start_time));
        contentHTML = `<div class="timeline-wrapper" data-day="${dayIndex}"><div class="timeline-track-bg"></div><div class="timeline-track-fill"></div><div class="timeline-pulsing-dot" style="opacity: 0;"></div><div class="timeline-container">`;
        
        contentHTML += courses.map(course => {
            const profName = professorMap[course.course_code.split(' ')[0]] || "";
            const formattedCode = course.course_code.replace('_', ' ');
            let displayName = course.course_name.replace(/(\(.*?\))/g, '<span class="course-note">$1</span>');
            const timeHeaderHTML = `${formatTime(course.start_time)} - ${formatTime(course.end_time)}`;
            return `<div class="timeline-item" data-start="${timeToMins(course.start_time)}" data-end="${timeToMins(course.end_time)}" data-original-time="${timeHeaderHTML}"><div class="time-header">${timeHeaderHTML}</div><h3 class="course-title">${displayName}</h3><div class="course-meta"><span><span class="course-code">${formattedCode}</span></span><span><i class="fa-solid fa-user"></i> ${profName}</span></div></div>`;
        }).join('');
        contentHTML += `</div></div>`;
    }

    let isHighlight = (dayIndex === targetDayIndex);
    let badgeText = isHighlight ? ((currentDayIndexInit === dayIndex) ? "اليوم" : "القادم") : "";
    const item = createAccordionItem(displayTitle, contentHTML, isHolidayDay, isHighlight, badgeText);
    accordionContainer.appendChild(item);

    if(isHighlight) { setTimeout(() => { item.querySelector('.accordion-header').click(); }, 2000); }
});

function updateLiveTimeline() {
    if(!document.getElementById('classes-view').classList.contains('active')) return;

    const dateNow = new Date();
    const currentDayIndex = dateNow.getDay();
    const currentMins = dateNow.getHours() * 60 + dateNow.getMinutes();
    const currentSecs = currentMins * 60 + dateNow.getSeconds();
    
    document.querySelectorAll('.timeline-wrapper').forEach(wrapper => {
        const dayIndex = parseInt(wrapper.getAttribute('data-day'));
        const items = wrapper.querySelectorAll('.timeline-item');
        const trackFill = wrapper.querySelector('.timeline-track-fill');
        const pulsingDot = wrapper.querySelector('.timeline-pulsing-dot');
        const containerOffset = wrapper.querySelector('.timeline-container').offsetTop;
        
        let dotY = 16; let fillHeight = 0; let isLiveFound = false; let allPast = true; let firstFutureTop = null;
        
        items.forEach(item => {
            const startSecs = parseInt(item.getAttribute('data-start')) * 60;
            const endSecs = parseInt(item.getAttribute('data-end')) * 60;
            const timeHeader = item.querySelector('.time-header');
            const originalTime = item.getAttribute('data-original-time');
            const itemTop = containerOffset + item.offsetTop + 16; 
            const itemBottom = containerOffset + item.offsetTop + item.offsetHeight + 16;
            
            item.className = 'timeline-item'; timeHeader.innerHTML = originalTime;

            if (currentDayIndex === dayIndex) {
                if (currentSecs >= endSecs) {
                    item.classList.add('past-item'); timeHeader.innerHTML = `${originalTime} <span class="badge-past">انتهت</span>`;
                } else if (currentSecs >= startSecs && currentSecs < endSecs) {
                    isLiveFound = true; allPast = false; item.classList.add('live-item');
                    const diffSec = endSecs - currentSecs;
                    const h = Math.floor(diffSec / 3600); const m = Math.floor((diffSec % 3600) / 60); const s = diffSec % 60;
                    let timeStr = h > 0 ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}` : `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
                    timeHeader.innerHTML = `<i class="fa-solid fa-satellite-dish fa-beat-fade"></i><span class="countdown-label">مباشر ·</span><span class="countdown-clock" dir="ltr">${timeStr}</span>`;
                    const progress = (currentSecs - startSecs) / (endSecs - startSecs);
                    dotY = itemTop + ((itemBottom - itemTop) * progress);
                    fillHeight = dotY - 16;
                } else {
                    item.classList.add('future-item'); allPast = false;
                    if (firstFutureTop === null) firstFutureTop = itemTop;
                }
            }
        });
        
        if (currentDayIndex === dayIndex) {
            if (isLiveFound) { wrapper.classList.add('is-live-track'); pulsingDot.classList.remove('resting'); pulsingDot.style.opacity = '1'; } 
            else if (allPast) { wrapper.classList.remove('is-live-track'); pulsingDot.classList.add('resting'); dotY = wrapper.offsetHeight - 16; fillHeight = dotY - 16; pulsingDot.style.opacity = '1'; } 
            else if (firstFutureTop !== null) { wrapper.classList.remove('is-live-track'); pulsingDot.classList.add('resting'); dotY = firstFutureTop; fillHeight = Math.max(0, dotY - 16); pulsingDot.style.opacity = fillHeight > 0 ? '1' : '0'; } 
            else { fillHeight = 0; dotY = 16; pulsingDot.style.opacity = '0'; }
            trackFill.style.height = `${Math.min(fillHeight, wrapper.offsetHeight - 32)}px`;
            pulsingDot.style.top = `${Math.min(dotY, wrapper.offsetHeight - 16)}px`; 
        } else { wrapper.classList.remove('is-live-track'); trackFill.style.height = `0`; pulsingDot.style.opacity = `0`; }
    });
}
updateLiveTimeline(); setInterval(updateLiveTimeline, 1000);

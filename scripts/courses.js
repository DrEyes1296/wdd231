// scripts/courses.js

const courses = [
    {
      subject: 'CSE',
      number: 110,
      title: 'Introduction to Programming',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course will introduce students to programming concepts. It will teach basic programming constructs using Javascript, Python, and other languages.',
      completed: true
    },
    {
      subject: 'WDD',
      number: 130,
      title: 'Web Fundamentals',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course will introduce students to the basics of web development. It will teach basic HTML and CSS.',
      completed: true
    },
    {
      subject: 'CSE',
      number: 111,
      title: 'Programming with Functions',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course will introduce students to programming with functions. It will teach basic programming constructs using Python.',
      completed: true
    },
    {
      subject: 'WDD',
      number: 231,
      title: 'Web Frontend Development I',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course will introduce students to the basics of web frontend development. It will teach basic HTML, CSS, and Javascript.',
      completed: false
    },
    {
      subject: 'CSE',
      number: 210,
      title: 'Programming with Classes',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course will introduce students to programming with classes. It will teach basic programming constructs using C#.',
      completed: true /* <-- THIS IS THE CHANGE YOU REQUESTED */
    },
    {
      subject: 'WDD',
      number: 331,
      title: 'Web Frontend Development II',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course will introduce students to the basics of web frontend development. It will teach intermediate HTML, CSS, and Javascript.',
      completed: false
    },
    {
      subject: 'WDD',
      number: 431,
      title: 'Web Frontend Development III',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course will introduce students to the basics of web frontend development. It will teach advanced HTML, CSS, and Javascript.',
      completed: false
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('course-cards-container');
    const totalCreditsSpan = document.getElementById('total-credits');
    
    const allBtn = document.getElementById('all-courses');
    const wddBtn = document.getElementById('wdd-courses');
    const cseBtn = document.getElementById('cse-courses');

    function displayCourses(filteredCourses) {
        // Clear previous cards
        container.innerHTML = ''; 

        filteredCourses.forEach(course => {
            const card = document.createElement('div');
            card.className = 'course-card';
            if (course.completed) {
                card.classList.add('completed');
            }
            
            card.innerHTML = `
                <h3>${course.subject} ${course.number}</h3>
                <h4>${course.title}</h4>
                <p>Credits: ${course.credits}</p>
                <p>${course.description}</p>
            `;
            container.appendChild(card);
        });

        updateTotalCredits(filteredCourses);
    }
    
    function updateTotalCredits(filteredCourses) {
        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        totalCreditsSpan.textContent = totalCredits;
    }

    // Event Listeners for filter buttons
    allBtn.addEventListener('click', () => {
        displayCourses(courses);
        setActiveButton(allBtn);
    });

    wddBtn.addEventListener('click', () => {
        const wddCourses = courses.filter(course => course.subject === 'WDD');
        displayCourses(wddCourses);
        setActiveButton(wddBtn);
    });

    cseBtn.addEventListener('click', () => {
        const cseCourses = courses.filter(course => course.subject === 'CSE');
        displayCourses(cseCourses);
        setActiveButton(cseBtn);
    });

    function setActiveButton(activeButton) {
        [allBtn, wddBtn, cseBtn].forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    // Initial display
    displayCourses(courses);
    setActiveButton(allBtn);
});

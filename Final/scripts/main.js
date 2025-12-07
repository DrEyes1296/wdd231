// main.js (ES Module)

// Import dynamic content function for services.html (Rubric 12)
import { renderServices } from './dynamicContent.js';

// --- Global Functions ---

// Rubric 11: DOM Manipulation & Event Handling (Responsive Menu)
function initializeMenu() {
    const hamButton = document.querySelector('.hamburger-menu');
    const mainMenu = document.querySelector('#main-menu');
    if (hamButton && mainMenu) {
        hamButton.addEventListener('click', () => {
            mainMenu.classList.toggle('open');
            hamButton.classList.toggle('open');
            const isExpanded = hamButton.classList.contains('open');
            hamButton.setAttribute('aria-expanded', isExpanded);
        });
    }
}

// Rubric 11: DOM Manipulation (Footer Year)
function setFooterYear() {
    const yearElement = document.getElementById('currentyear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Rubric 5: Wayfinding Implementation
function setWayfinding() {
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    // Get the current page filename (e.g., 'index.html')
    const currentPath = window.location.pathname.split('/').pop() || 'index.html'; 

    navLinks.forEach(link => {
        // Check if the link's href ends with the current page filename
        if (link.href.endsWith(currentPath)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Rubric 10 & 11: Generic Modal Closer (Used for both modals)
function initializeModalClosers() {
    // Attach event listeners to all modal structures
    document.querySelectorAll('.modal').forEach(modal => {
        const closeButton = modal.querySelector('.close-button');
        
        // Close when the 'X' button is clicked
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        // Close when the user clicks outside the modal
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Close with the escape key (for accessibility)
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
            }
        });
    });
}


// --- Local Storage & Modal (Rubric 9 & 10) ---

function handleLocalStoreModal() {
    const modal = document.querySelector('#welcome-modal');
    const visitCountElement = document.querySelector('#visit-count');
    
    if (!modal) return; // Only run on pages that have the modal (index.html)

    // Rubric 9: Local Storage Implementation
    let visits = Number(localStorage.getItem('siteVisits')) || 0;
    visits++;
    localStorage.setItem('siteVisits', visits);

    if (visitCountElement) {
        // Rubric 11: DOM Manipulation (Updating text content)
        visitCountElement.textContent = visits;
    }

    // Show modal only on the 1st and 3rd visit (example logic)
    if (visits === 1 || visits === 3) {
        // Rubric 10: Modal Dialog Structure & DOM Manipulation (Display)
        setTimeout(() => {
            modal.style.display = 'flex';
        }, 1000); 
    }
}


// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    initializeMenu();
    setFooterYear();
    initializeModalClosers();
    setWayfinding(); // Rubric 5
    
    // Check which page we are on
    const path = window.location.pathname;

    if (path.includes('index.html') || path.endsWith('/')) {
        handleLocalStoreModal(); // Rubric 9, 10
    }

    if (path.includes('services.html')) {
        renderServices(); // Rubric 8, 12
    }
});
try {
    const currentYear = new Date().getFullYear();
    document.getElementById("current-year").textContent = currentYear;
} catch (e) {
    console.error("Error setting current year:", e);
}

try {
    const lastModified = document.lastModified;
    document.getElementById("lastModified").textContent = lastModified;
} catch (e) {
    console.error("Error setting last modified date:", e);
}

// --- Hidden Timestamp Field ---
try {
    // Set the value of the hidden timestamp field to the current date and time
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }
} catch (e) {
    console.error("Error setting timestamp:", e);
}

// --- Membership Card Animation ---
window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.level-card');
    cards.forEach(card => {
        // Use a slight delay for a staggered fade-in effect
        const delay = parseInt(card.dataset.delay) || 0;
        setTimeout(() => {
            card.classList.add('show');
        }, delay);
    });
});

// --- Modal Functionality ---
const modalTriggers = document.querySelectorAll('.modal-trigger');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close-btn');

// Function to open a specific modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
    }
}

// Function to close all modals
function closeModals() {
    modals.forEach(modal => {
        modal.style.display = "none";
    });
}

// Event listeners for modal triggers
modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (event) => {
        event.preventDefault();
        const modalId = trigger.dataset.modal;
        closeModals(); // Close any currently open modal
        openModal(modalId);
    });
});

// Event listeners for close buttons
closeButtons.forEach(btn => {
    btn.addEventListener('click', closeModals);
});

// Close modal when user clicks anywhere outside of the modal
window.addEventListener('click', (event) => {
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
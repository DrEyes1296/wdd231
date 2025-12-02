import { discoverPlaces } from "../data/discover-places.mjs";

// --- Footer Dates ---
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

// --- Card Generation ---
function displayDiscoverPlaces() {
    const gallery = document.getElementById("discover-gallery");
    if (!gallery) return;

    discoverPlaces.forEach(place => {
        let card = document.createElement("section");
        card.className = "discover-card";
        
        // Named grid area for layout
        card.style.gridArea = place.id; 

        card.innerHTML = `
            <h2>${place.name}</h2>
            <figure>
                <img 
                    src="${place.image}" 
                    alt="${place.name} image" 
                    loading="lazy" 
                    width="300" 
                    height="200">
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button class="learn-more-btn">Learn More</button>
        `;
        
        gallery.appendChild(card);
    });
}


// --- Local Storage Visitor Message ---
function displayVisitMessage() {
    const visitMessageEl = document.getElementById("visit-message");
    if (!visitMessageEl) return;

    const lastVisit = localStorage.getItem('lastVisitDate');
    const today = Date.now();
    let message = "";

    if (!lastVisit) {
        // First visit
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const oneDay = 1000 * 60 * 60 * 24; // milliseconds in one day
        const daysPassed = Math.round((today - parseInt(lastVisit)) / oneDay);

        if (daysPassed < 1) {
            // Less than a day (or just a few hours/minutes)
            message = "Back so soon! Awesome!";
        } else if (daysPassed === 1) {
            // Exactly 1 day ago
            message = "You last visited 1 day ago.";
        } else {
            // More than 1 day ago
            message = `You last visited ${daysPassed} days ago.`;
        }
    }

    visitMessageEl.textContent = message;

    // Store the current visit date for the next visit comparison
    localStorage.setItem('lastVisitDate', today.toString());
}

// --- Initial Function Calls ---
displayDiscoverPlaces();
displayVisitMessage();
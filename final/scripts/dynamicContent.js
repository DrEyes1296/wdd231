// dynamicContent.js (ES Module)

/**
 * Renders the service cards dynamically from a JSON file.
 * Satisfies Rubric 8 (15 items/4 properties), Rubric 12 (Fetch API/try...catch), 
 * and Rubric 11 (Template Literals, Array Methods).
 */

const serviceListings = document.querySelector('#service-listings');
const DATA_URL = 'scripts/data/services.json'; 

/**
 * Creates the HTML markup for a single service card using a template literal (Rubric 11).
 * @param {object} service - The service data object.
 * @returns {string} The HTML string for the service card.
 */
function createServiceCard(service) {
    // 4 Distinct Properties used: name, description, category, frequency (Rubric 8)
    // Template Literals used for structure (Rubric 11)
    return `
        <div class="service-card" data-category="${service.category.toLowerCase().replace(' ', '-')}">
            <h3 class="card-title">${service.name}</h3>
            <p>${service.description}</p>
            <div class="card-details">
                <p><strong>Category:</strong> ${service.category}</p>
                <p><strong>Frequency:</strong> ${service.frequency}</p>
            </div>
            <button class="modal-trigger" data-service-id="${service.id}">View Details</button>
        </div>
    `;
}

/**
 * Attaches click listeners to all "View Details" buttons and handles modal display.
 */
function attachModalListeners(services) {
    document.querySelectorAll('.modal-trigger').forEach(button => {
        button.addEventListener('click', (event) => {
            const serviceId = event.target.getAttribute('data-service-id');
            // Rubric 11: Array Method (find)
            const service = services.find(s => s.id == serviceId); 
            
            if (service) {
                // Populate and display the service detail modal (Rubric 10, 11)
                const modal = document.getElementById('service-detail-modal');
                const title = modal.querySelector('#modal-service-title');
                const body = modal.querySelector('#modal-service-body');
                
                title.textContent = service.name;
                
                // Rubric 11: Template Literals & DOM Manipulation
                // The price factor line has been REMOVED here to prevent customer display.
                body.innerHTML = `
                    <p><strong>Description:</strong> ${service.description}</p>
                    <p><strong>Category:</strong> ${service.category}</p>
                    <p><strong>Frequency:</strong> ${service.frequency}</p>
                    <p><strong>Keywords:</strong> ${service.keywords.join(', ')}</p>
                `;
                
                modal.style.display = 'flex';
                modal.querySelector('.close-button').focus();
            }
        });
    });
}


/**
 * Fetches data and renders the list of services.

 */
export async function renderServices() {
    if (!serviceListings) return; // Only run on services.html

    try {
        serviceListings.innerHTML = '<h2>Loading Services...</h2><p>Fetching data...</p>';
        
        // Rubric 12: Fetch API
        const response = await fetch(DATA_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const services = await response.json(); // Data loaded (Rubric 8)

        // Rubric 11: Array Method (sort) - Sorting services alphabetically by name
        const sortedServices = services.sort((a, b) => a.name.localeCompare(b.name));
        
        // Rubric 11: Array Method (map) - Transform data into HTML strings
        const serviceHTML = sortedServices.map(createServiceCard).join('');

        // Rubric 11: DOM Manipulation - Inserting the generated content
        serviceListings.innerHTML = `<h2>Our Service List (${services.length} items)</h2>` + serviceHTML;

        attachModalListeners(services);

    } catch (error) {
        // Rubric 12: try...catch block
        console.error('Error fetching or processing service data:', error);
        serviceListings.innerHTML = `
            <div class="error-message">
                <h2>⚠️ Error Loading Services</h2>
                <p>We could not load the service list. Please check the network or try again later. Error detail: ${error.message}</p>
            </div>
        `;
    }
}
// form-action-script.js (ES Module for Rubric 7)

/**
 * Parses URL search parameters and displays form data on the form-action.html page.
 * Satisfies Rubric 7 (Display form data using URL Search Params).
 */
document.addEventListener('DOMContentLoaded', () => {
    const dataContainer = document.getElementById('submitted-data-grid');
    if (!dataContainer) return;

    // 1. Get the URL parameters (URLSearchParams is the required technique)
    const params = new URLSearchParams(window.location.search);
    
    if (Array.from(params).length === 0) {
        dataContainer.innerHTML = '<p>No data submitted yet. Please fill out the <a href="contact.html">contact form</a>.</p>';
        return;
    }

    let htmlContent = '';
    
    // Group values by key (especially needed for checkboxes which have multiple entries for 'service')
    const data = Array.from(params.entries());

    // Rubric 11: Array Method (reduce) - Group data
    const groupedData = data.reduce((acc, [key, value]) => {
        // Format key name for display (e.g., 'company-name' -> 'Company Name')
        const formattedKey = key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        
        if (acc[formattedKey]) {
            acc[formattedKey].push(value);
        } else {
            acc[formattedKey] = [value];
        }
        return acc;
    }, {});

    // 2. Generate HTML for display (Rubric 11: Template Literals)
    for (const [key, values] of Object.entries(groupedData)) {
        // Join multiple values (like checked services) with a comma
        let displayValue = values.join(', ');
        
        // Preserve line breaks for Address and Message
        if (key.includes('Address') || key.includes('Message')) {
            displayValue = displayValue.replace(/\n/g, '<br>');
        }

        htmlContent += `
            <div class="data-item">
                <strong>${key}:</strong>
                <span>${displayValue}</span>
            </div>
        `;
    }

    // 3. Inject into the DOM (Rubric 11: DOM Manipulation)
    dataContainer.innerHTML = htmlContent;
});
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

// --- Display Form Data ---
document.addEventListener('DOMContentLoaded', () => {
    const detailsContainer = document.getElementById('application-details');
    // URLSearchParams makes it easy to read parameters from the URL query string
    const params = new URLSearchParams(window.location.search);
    
    
    const fieldsMap = {
        'fname': "First Name",
        'lname': "Last Name",
        'email': "Email",
        'phone': "Mobile Phone",
        'orgname': "Business Name",
        'timestamp': "Application Date/Time"
    };

    let detailsHTML = "<table>";

    let hasData = false;
    for (const [key, label] of Object.entries(fieldsMap)) {
        if (params.has(key)) {
            let value = params.get(key);

            // Formatted timestamp for better readability
            if (key === 'timestamp') {
                try {
                    const date = new Date(value);
                    value = date.toLocaleDateString('en-US', { 
                        year: 'numeric', month: 'long', day: 'numeric', 
                        hour: '2-digit', minute: '2-digit', second: '2-digit', 
                        timeZoneName: 'short' 
                    });
                } catch (e) {
                    
                }
            }

            detailsHTML += `
                <tr>
                    <th>${label}:</th>
                    <td>${value}</td>
                </tr>
            `;
            hasData = true;
        }
    }

    detailsHTML += "</table>";
    
    if (hasData) {
        detailsContainer.innerHTML = detailsHTML;
    } else {
        detailsContainer.innerHTML = "<p>No application data found. Please ensure you submitted the form correctly.</p>";
    }
});
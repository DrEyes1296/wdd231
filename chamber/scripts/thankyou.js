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

// --- Display Form Data Summary ---
function displayFormSummary() {
    const summaryDiv = document.getElementById('form-data-summary');
    const params = new URLSearchParams(window.location.search);
    
    // Map form names to user-friendly labels for required fields
    const requiredFields = {
        'fname': "First Name",
        'lname': "Last Name",
        'email': "Email",
        'tel': "Mobile Phone",
        'bizname': "Business Name",
        'timestamp': "Application Date"
    };

    let summaryHTML = "";

    // Iterate over the required fields
    for (const [name, label] of Object.entries(requiredFields)) {
        if (params.has(name)) {
            let value = params.get(name);
            // Format the timestamp for better readability
            if (name === 'timestamp') {
                try {
                    const dateObj = new Date(value);
                    value = dateObj.toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric',
                        hour: '2-digit', minute: '2-digit', second: '2-digit'
                    });
                } catch (e) {
                    // Keep original value if date formatting fails
                }
            }
            summaryHTML += `<p><strong>${label}:</strong> ${value}</p>`;
        }
    }
    
    if (summaryHTML) {
        summaryDiv.innerHTML = summaryHTML;
    } else {
        summaryDiv.innerHTML = "<p>No required form data was submitted or found.</p>";
    }
}

// Initial function call
displayFormSummary();
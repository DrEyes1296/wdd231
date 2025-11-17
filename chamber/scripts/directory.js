try {
    const currentYear = new Date().getFullYear();
    document.getElementById("current-year").textContent = currentYear;
} catch (e) {
    console.error("Error setting current year:", e);
}

// Set last modified date
try {
    const lastModified = document.lastModified;
    document.getElementById("lastModified").textContent = lastModified;
} catch (e) {
    console.error("Error setting last modified date:", e);
}


// 2. Member Data Fetch and Display
const membersURL = "data/members.json";
const container = document.getElementById("member-container");

// Async function to fetch member data
async function getMembers() {
    try {
        const response = await fetch(membersURL);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        container.innerHTML = "<p>Error loading member data. Please try again later.</p>";
    }
}

// Function to display members
function displayMembers(members) {
    // Clear any existing content
    container.innerHTML = ""; 
    
    members.forEach(member => {
        // Create elements for a member card
        let card = document.createElement("section");
        let name = document.createElement("h3");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let website = document.createElement("a");
        let image = document.createElement("img");
        
        // Set content and attributes
        name.textContent = member.name;
        address.textContent = member.address;
        phone.textContent = member.phone;
        
        website.textContent = "Visit Website";
        website.setAttribute("href", member.website);
        website.setAttribute("target", "_blank");
        
        image.setAttribute("src", member.image);
        image.setAttribute("alt", `Logo for ${member.name}`);
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "150");
        image.setAttribute("height", "100");

    
        card.setAttribute("data-level", member.membershipLevel);
        
        // Append elements to the card
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(address); // Address is first p
        card.appendChild(phone);   // Phone is second p
        card.appendChild(website);
        
        // Append the card to the container
        container.appendChild(card);
    });
}

// Initial fetch
getMembers();


// 3. Grid/List Toggle
const gridBtn = document.getElementById("grid-btn");
const listBtn = document.getElementById("list-btn");

if (gridBtn && listBtn && container) {
    gridBtn.addEventListener("click", () => {
        container.classList.add("grid-view");
        container.classList.remove("list-view");
    });

    listBtn.addEventListener("click", () => {
        container.classList.add("list-view");
        container.classList.remove("grid-view");
    });
} else {
    console.error("Toggle buttons or container not found.");
}
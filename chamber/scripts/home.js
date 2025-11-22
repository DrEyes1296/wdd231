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

// --- Member Spotlights ---
const membersURL = "data/members.json";
const spotlightContainer = document.getElementById("spotlight-container");

async function getMembers() {
    try {
        const response = await fetch(membersURL);
        if (response.ok) {
            const data = await response.json();
            displaySpotlights(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Error fetching member data:", error);
    }
}

function displaySpotlights(members) {
    // Filter for Gold and Silver members (levels 2 or 3)
    const qualifiedMembers = members.filter(member => member.membershipLevel >= 2);
    
    // Shuffle the qualified members array
    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
    
    // Get 3 random members
    const selectedMembers = shuffled.slice(0, 3);
    
    // Create and display spotlight cards
    selectedMembers.forEach(member => {
        let card = document.createElement("section");
        card.className = "spotlight-card";
        
        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="${member.image}" alt="Logo for ${member.name}" loading="lazy" width="150" height="100">
            <p>${member.phone}</p>
            <p>${member.address}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p>Membership Level: ${member.membershipLevel === 3 ? 'Gold' : 'Silver'}</p>
        `;
        spotlightContainer.appendChild(card);
    });
}

// --- OpenWeatherMap API --- //
const apiKey = "ea31028c9c8de35f05114ef1dbb9ce25";
const lat = "40.7608";
const lon = "-111.8910";
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

const currentContainer = document.getElementById("weather-current");
const forecastContainer = document.getElementById("weather-forecast");

async function getWeather() {
    try {
        const response = await fetch(weatherApiUrl);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function displayWeather(data) {
    // 1. Display Current Weather 
    const current = data.list[0];
    currentContainer.innerHTML = `
        <p>Temperature: ${Math.round(current.main.temp)}°F</p>
        <p>Description: ${current.weather[0].description}</p>
    `;

    // 2. Display 3-Day Forecast //
    const dates = [];
    for (let i = 1; i <= 3; i++) {
        let date = new Date();
        date.setDate(date.getDate() + i);
        dates.push(date.toISOString().split('T')[0]); // Get 'YYYY-MM-DD' format
    }

    let forecastHTML = "";
    
    dates.forEach(date => {
        // Find the weather data for noon (12:00:00) on that date
        const forecast = data.list.find(item => {
            return item.dt_txt.startsWith(date) && item.dt_txt.includes("12:00:00");
        });

        if (forecast) {
            forecastHTML += `
                <div class="forecast-day">
                    <strong>${new Date(forecast.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}:</strong>
                    <p>${Math.round(forecast.main.temp)}°F</p>
                </div>
            `;
        }
    });
    
    forecastContainer.innerHTML = forecastHTML;
}


// --- Initial Function Calls ---
getMembers();
getWeather();
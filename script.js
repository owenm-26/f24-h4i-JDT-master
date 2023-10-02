const DAYS_OF_WEEK = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const searchButton = document.getElementById('search-button');
const searchContainer = document.getElementById('search-container');
const clearButton = document.getElementById('clear-button');

// Initially hide the search container and clear button when the page loads
document.addEventListener('DOMContentLoaded', function() {
  searchContainer.style.display = 'none';
  clearButton.style.display = 'none';

  clearButton.addEventListener('click', function() {
    searchContainer.style.display = 'none';
    clearButton.style.display = 'none';
  });

  searchButton.addEventListener('click', search);
});

async function search() {
    const stateInput = document.getElementById('state-input');
    const cityInput = document.getElementById('city-input');
    const apiKEY = "f0582b15aad3436691b7f6c7b4f8d06f";
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityInput.value},${stateInput.value}&key=${apiKEY}&days=7`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const weatherData = await response.json();
        console.log(weatherData.data); // an array with 7-day forecast
        clearButton.style.display = 'block';
        updateDisplay(weatherData.data);
      } else {
        console.log("Error fetching data:", response.status, response.statusText);
        clearButton.style.display = 'none'; // Hide clear button on error.
      }
    } catch (error) {
      console.log(error);
      alert("Error: You must enter a valid city and state.");
      clearButton.style.display = 'none'; // Hide clear button on error.
    }
}

function updateDisplay(data) {
    for (let i = 0; i < data.length; i++) {
        const day = DAYS_OF_WEEK[i];
        const tempSelector = document.getElementById(`${day}-temp`);
        const cloudsSelector = document.getElementById(`${day}-clouds`);

        tempSelector.innerHTML = `Temperature: ${data[i].temp}°F`;
        cloudsSelector.innerHTML = `Chance of clouds: ${data[i].clouds}%`;
    }
    searchContainer.style.display = 'block';
}

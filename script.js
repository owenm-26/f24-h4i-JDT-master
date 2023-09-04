const DAYS_OF_WEEK = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const searchButton = document.getElementById('search-button');
const searchContainer = document.getElementById('search-container');
searchButton.addEventListener('click', search);

// Initially hide the search container when the page loads
document.addEventListener('DOMContentLoaded', function() {
  const searchContainer = document.getElementById('search-container');
  searchContainer.style.display = 'none';
});
async function search() {

    const stateInput = document.getElementById('state-input');
    const cityInput = document.getElementById('city-input');

    const apiKEY = "e0fea32f8994400491c960ece19ff669";

    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityInput.value},${stateInput.value}&key=${apiKEY}&days=7`;

    try {
      const response = await fetch(url);
  
      if (response.ok) {
        const weatherData = await response.json();
        console.log(weatherData.data); // an array with 7-day forecast
        updateDisplay(weatherData.data);
       
      } else {
        console.log("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.log(error);
      alert("Error: You must enter a valid city and state.");
     
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

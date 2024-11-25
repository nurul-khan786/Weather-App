// Select elements from the DOM for interaction and display updates
const button = document.getElementById("btn");
const input = document.getElementById("input");

const cityName = document.getElementById('city-name');
const cityTime = document.getElementById('city-time');
const cityTemp1 = document.getElementById('temp1');
const cityTemp2 = document.getElementById('temp2');
const cityDisc = document.getElementById('weather-disc');
const weatherfeels = document.getElementById('temp-feels');
const weatherIcon = document.getElementById('icon');

// Asynchronous function to fetch weather data for a given city
async function getData(cityName) {
   // Make API request to get weather data, using a dynamic city name
   const promise = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=f079b6d4a9ff47b79ea113524242210&q=${cityName}&aqi=yes`
    );
   // Convert the response to JSON format
    return await promise.json();
}

// Event listener for the button click
button.addEventListener('click', async () => {
    // Get the user's input value (city name)
    const value = input.value;
    
    // Call getData function with the input value and wait for result
    const result = await getData(value);
    console.log(result); // Log the result to the console for debugging

    // Update the DOM elements with fetched weather data
    cityName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
    cityTime.innerText = `${result.location.localtime}`;
    cityTemp1.innerText = `${result.current.temp_c + "°C"}`;
    cityTemp2.innerText = `${result.current.temp_f + "°F"}`;
    cityDisc.innerText = `${result.current.condition.text}`; // Weather description
    weatherfeels.innerText = `Feels like ${result.current.feelslike_c + "°C"}`; // Feels like temperature in Celsius

    // Determine which icon to display based on the weather condition
    const condition = result.current.condition.text.toLowerCase();
    let iconUrl = "";

    // Select appropriate icon based on common weather keywords
    if (condition.includes("rain")) {
        iconUrl = "rainy.png";
    } else if (condition.includes("cloud")) {
        iconUrl = "cloudy.png";
    } else if (condition.includes("clear") || condition.includes("sunny")) {
        iconUrl = "sunny.png";
    } else if (condition.includes("snow")) {
        iconUrl = "snow.png";
    } else if (condition.includes("thunder")) {
        iconUrl = "thunder.png";
    } else if (condition.includes("fog") || condition.includes("mist")) {
        iconUrl = "fog.png";
    } else {
        iconUrl = "clear.png"; // Default icon if no specific condition matches
    }

    // Update the weather icon element with the selected icon and add alt text
    weatherIcon.src = iconUrl;
    weatherIcon.alt = result.current.condition.text;
});





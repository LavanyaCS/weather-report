async function getWeatherReport() {
    const city = document.getElementById("searchWeather").value.trim();
    const resultWeatherInput = document.getElementById("resultWeather");
    const apiKey = "76f364fcc9f94cc9c4e2115cfdd959c1";

    if (!city) {
        resultWeatherInput.innerHTML = `<div class="my-4 alert alert-warning">⚠️ Please enter your city name...</div>`;
        return;
    }

    resultWeatherInput.innerHTML = `
        <div class="spinner-border text-info" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    `;

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
                city
            )}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("API failed to fetch");
        }

        const data = await response.json();
        const iconUrl = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].main}"  style="width:1rem;height:1rem;" />`;

        resultWeatherInput.innerHTML = `
                <div class="d-flex flex-column text-start my-2">
                    <p class="lead fw-medium">🏙️ ${data.name}, 🌍 ${data.sys.country}</p>
                </div>
                <div class="row">
                    <p class="lead col-12 col-md-6">🌤️ Climate: ${data.weather[0].main} ${iconUrl} </p>
                    <p class="lead col-12 col-md-6">🌡️ Temperature: ${data.main.temp} °C</p>
                    <p class="lead col-12 col-md-6">🤗 Feels Like: ${data.main.feels_like} °C</p>
                    <p class="lead col-12 col-md-6">💧 Humidity: ${data.main.humidity}%</p>
                    <p class="lead col-12 col-md-6">🔻 Min Temp: ${data.main.temp_min} °C</p>
                    <p class="lead col-12 col-md-6">🔺 Max Temp: ${data.main.temp_max} °C</p>
                    <p class="lead col-12 col-md-6">🌬️ Wind Speed: ${data.wind.speed} m/s</p>
                    <p class="lead col-12 col-md-6">🌤️ Description: ${data.main.description}</p>
            </div>
        `;
    } catch (error) {
        resultWeatherInput.innerHTML = `<div class="my-4 alert alert-danger">❌ Error: ${error.message}</div>`;
    }
}

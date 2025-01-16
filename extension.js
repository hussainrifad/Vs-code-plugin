const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Weather extension is now active!');
      
    // Register the command to fetch and display weather
    let disposable = vscode.commands.registerCommand('extension.getWeather', async function () {
        const apiKey = '27ee74514f5574fbbab6f7d605ae1fdc'; // Your OpenWeatherMap API key
        const lat = 59.9375; // Latitude for Saint Petersburg
        const lon = 30.3086; // Longitude for Saint Petersburg
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch weather: ${response.status}`);
            }
        
            const weatherData = await response.json();
            const temp = weatherData.main.temp;
            const tempMin = weatherData.main.temp_min;
            const tempMax = weatherData.main.temp_max;
            const feelsLike = weatherData.main.feels_like;
            const windSpeed = weatherData.wind.speed;
            const sunriseTimestamp = weatherData.sys.sunrise;
            const sunsetTimestamp = weatherData.sys.sunset;

            const sunrise = new Date(sunriseTimestamp * 1000).toLocaleTimeString();
            const sunset = new Date(sunsetTimestamp * 1000).toLocaleTimeString();


            vscode.window.showInformationMessage(
                `Weather in Saint Petersburg:
                - Temperature: ${temp}°C
                - Feels Like: ${feelsLike}°C
                - Min Temperature: ${tempMin}°C
                - Max Temperature: ${tempMax}°C
                - Wind Speed: ${windSpeed} m/s
                - Sunrise: ${sunrise}
                - Sunset: ${sunset}`
            );
            
        }catch (error) {
            vscode.window.showErrorMessage(`Error fetching weather: ${error.message}`);
        }
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
};

//API Key
var APIKey = "82ec049d39033e14bb1857a732520ca9";

//gets the city from the form and runs the functions to get the weather
var searchButton = document.querySelector("#searchBtn");
searchButton.addEventListener('click', function () {
    var city = document.querySelector("#searchCity").value;
    getWeather(city); 
    getForecast(city);
});

function getWeather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
    console.log(queryURL);
    fetch(queryURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function(data) {
            console.log("data",data);

            var template = `
                <h1>${data.name}</h1>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png"
        alt="weather icon">
                <p>Temperature: ${data.main.temp}</p>
                <p>Humidity: ${data.main.humidity}</p>
                <p>Wind Speed: ${data.wind.speed}</p>
                <p>UV Index: </p>
            `;

            document.querySelector("#currentWeather").innerHTML = template;

        });
}

function getForecast(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;
    console.log(queryURL);
    fetch(queryURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function(data) {
            console.log("forecast",data);

            var list = data.list.filter(function(datum) {
                if (datum.dt_txt.includes("12:00:00")) {
                    return true;
                } else {
                    return false;
                }
            });

            var template = "";
            list.forEach(function(item) {
                template += `
                
                        <div class="card bg-dark text-light">
                            <div class="card-body">
                                <h5>${new Date(item.dt_txt).toLocaleDateString()}</h5>
                                <p><img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png"
                                alt="weather icon"></p>
                                <p>Temp: ${item.main.temp} F</p>
                                <p>Wind: ${item.wind.speed} MPH</p>
                                <p>Humidity: ${item.main.humidity}%</p>
                            </div>
                        </div>
                    
                `;
            })
            

            document.querySelector("#forecast").innerHTML = template;

        });
}



const cityName = document.querySelector(".cityname");
const Submit = document.querySelector(".submit");
const Cname = document.querySelector(".name");
const Logo = document.querySelector(".weather-logo");
const Temp = document.querySelector(".temp");
const Des = document.querySelector(".description");
const Weather = document.querySelector(".weather");
const Line = document.querySelector(".divider");
const Wind = document.querySelector(".wind");
const Humidity = document.querySelector(".humidity");

Submit.onclick = async () => {
    //storing the city name
    let city = cityName.value.trim();
    console.log(city);

    if (city === "") {
        alert("Please enter a city name"); 
    }

    else {
        try {
            //API URL
            let apiKey = "023e758cb19db1be095116d51cb0c74b";
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
            console.log(url);
            let data = await (await fetch(url)).json();

            if (data.cod != 200) {
                Cname.innerHTML = "This City Does Not Exist";
                Line.classList.add("hidden");
                Cname.classList.add("error-message");
                Temp.innerHTML = "";
                Des.innerHTML = "";
                Logo.src = "";
                Wind.innerHTML = "";
                Humidity.innerHTML = "";
            }
            
            else {
                Line.classList.remove("hidden");
                Cname.classList.remove("error-message");
                Cname.innerHTML = cityName.value;
                cityName.placeholder = "Enter city name";
                console.log(cityName.value);

                console.log(data);
                let img = data.weather[0].icon
                Logo.src = `https://openweathermap.org/img/wn/${img}@2x.png`;
                let temp = data.main.temp;
                Temp.innerHTML = `${Math.floor(temp - 273.15)}°C`;
                Des.innerHTML = data.weather[0].description;
                Wind.innerHTML = `Wind Speed : ${data.wind.speed}m/s`;
                Humidity.innerHTML =`Humidity : ${data.main.humidity}%`;
            }
        }

        catch (error) {
            console.error("Network error:", error);
            alert("Unable to fetch weather data");
        }
    }
}
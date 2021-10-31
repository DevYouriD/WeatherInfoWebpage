window.addEventListener('load', ()=> {
let long;
let lat;

let temperatureDegree = document.querySelector(".temperature-degree");
let temperatureDescription = document.querySelector(".temperature-description");
let locationTimezone = document.querySelector(".location-timezone");

let iconImage = document.querySelector('.weatherIcon');

let temperatureSection = document.querySelector(".temperature");
const temperatureSpan = document.querySelector(".temperature span")
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=53a5c52cd0585bfbcd97404e7ed61fb6&units=metric`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temp} = data.main;
                const {description} = data.weather[0];
                const {icon} = data.weather[0];
                //Set DOM Elements from the API
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = description;
                
                //console.log(data.weather[0].description);
                tijdzone = ""
                if (data.timezone == 3600){
                    
                    tijdzone = "Maastricht"
                    
                }else{
                    tijdzone = data.name;
                }
                locationTimezone.textContent = tijdzone;
                    
                iconImage.innerHTML = `<img src="resources/${icon}.png">`;
                
                //Formula for celcius
                let farenheit = (temp * 9 / 5) + 32;
                
                //Change temperature to Celcius/Farenheit
                temperatureSection.addEventListener("click", () => {
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = temp;
                    }else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = Math.floor(farenheit);
                    }
                });
            })
        });    
    }
});

/* 
<button onclick="getLocation()">Try It</button>

<script>
var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}
</script>
*/
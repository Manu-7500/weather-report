const API_key = `5430d0b7021704517da30f91eb9b274f`
const form = document.querySelector( "form" )
const search = document.querySelector( "#search" )
const weather = document.querySelector( "#weather" )

var Date = new Date();
var h = Date.getHours();
var m = Date.getMinutes();
var session = "AM";
if ( h == 0 ) {
    h = 12;
}
if ( h > 12 ) {
    h = h - 12;
    session = "PM";
}
if ( h < 10 ) { h = "0" + h; }
if ( m < 10 ) { m = "0" + m; }

document.getElementById( "time" ).innerHTML = h + ":" + m + " " + session;

var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var day = weekdays[Date.getDay()];
document.getElementById( "day" ).innerHTML = day;



const getweather = async ( city ) => {
    weather.innerHTML = `<h2>Loading...</h2>`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`
    const response = await fetch( url );
    const data = await response.json()
    return showweather( data )
}

const showweather = ( data ) => {
    if ( data.cod == "404" ) {
        weather.innerHTML = `<h2> City Not Found <br> Please Enter a valid city Name <br> Thankyou for visit </h2>`
    }

    weather.innerHTML = `
             <div>
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="50px" height="50px" , alt="Not supported">
            </div>
                <div>
                    <h2>${data.main.temp}°C </h2>
                    <h4>${data.weather[0].main}</h4>
                </div>`
}

form.addEventListener( "submit",
    function ( event ) {
        getweather( search.value )
        event.preventDefault();
    }
)

// myScript.js
// Author : Sekhar Kolli

// This function animates the element with the provided class
function animElemWithAnimated(elem, animClass) {
	var animateWith = "animated "+ animClass; // add "infinte" to continue animations 
	$(elem).addClass(animateWith).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){
		$(this).removeClass("animateWith");
	});
}

// This function takes in a UTC unix time and converts it User readable string
// Function inspired by : http://stackoverflow.com/questions/5722919/jquery-convert-number-to-date
function displayDateTime(utcString) {
	console.log(utcString);

	var myObj = $.parseJSON('{"date_created":"'+utcString+'"}'), 
	myDate = new Date(1000*myObj.date_created);

	console.log(myDate.toString());
	console.log(myDate.toLocaleString());
	console.log(myDate.toUTCString());

	console.log("displayDateTime executed...");
	return myDate.toString();
} //displayDateTime

function displayTempInCelsius(tempKelvin) {
	return (300-tempKelvin).toFixed(2);
}

//----------------------------------------------------------------------------------------------

$(document).ready(function(){

var currLocation = {latitude:43.588852599999996, longitude:-79.65142089999999}; //hardcoding for mississauga for testing 
var appIdStr = "&appid=d2e2fa6910b1950870f71d164580f721"; // appid receied for skolli.bb10@gmail.com email 
var url = "http://api.openweathermap.org/data/2.5/weather?";
var openWeatherMapData;

// Getting the co-ordinates from the browser / navigator
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position){
        //$("#locData").html("latitude : " + position.coords.latitude + " <br> longitude : " + position.coords.longitude);
        
        currLocation.latitude = position.coords.latitude;
        currLocation.longitude = position.coords.longitude;

    });
} // navigator.geolocation

// Open Weather App Id generated using lat and lon
// http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=d2e2fa6910b1950870f71d164580f721
// http://api.openweathermap.org/data/2.5/weather?lat=43.588852599999996&lon=-79.65142089999999&appid=d2e2fa6910b1950870f71d164580f721


// Open Weather App Id generatd using 
// http://api.openweathermap.org/data/2.5/weather?q=mississauga&appid=d2e2fa6910b1950870f71d164580f721
// http://api.openweathermap.org/data/2.5/weather?q=mississauga,ca&appid=d2e2fa6910b1950870f71d164580f721

url += "lat=";
url += currLocation.latitude;
url += "&lon=";
url += currLocation.longitude;
url += appIdStr;

console.log(url);

$.get(url, function (receivedData) {
	console.log(receivedData);
	openWeatherMapData = receivedData;

	$('#locData').html("<ul> </ul>");
	for(var prop in receivedData) {
		if (typeof(receivedData[prop]) === Object) {
			for(var pr in receivedData[prop]) {
				// console.log("Going deep : "+prop+"."+ pr +" "+receivedData[prop][pr]);
				//$('#locData ul').append("<li>"+prop+"."+ pr +" "+receivedData[prop][pr]+"</li>");
			}		
		} else {
			// console.log("Data : "+prop +" "+receivedData[prop]);
			$('#locData ul').append("<li>"+prop +" "+receivedData[prop]+"</li>");
		}
	};

	$("#cityName").html(openWeatherMapData.name 
		+", <small>" 
		+openWeatherMapData.sys.country 
		+"</small>  " 
		+"<img src='http://openweathermap.org/images/flags/ca.png' width=20px>");
	$("#cityWeather").text(openWeatherMapData.weather[0].description);
	$("#cityTemp").text(displayTempInCelsius(openWeatherMapData.main.temp));

	//http://openweathermap.org/img/w/04d.png

	var iconURL = "http://openweathermap.org/img/w/"+openWeatherMapData.weather[0].icon+".png"

	// $("#cityWeatherIcon").prop("src",iconURL);
	// $("#cityWeatherIcon").prop("width",300);
	// $("#cityWeatherIcon").prop("height",300); 
	iconURL = "url("+iconURL+")";
	$("#cityIconPanel").css("background-image",iconURL);

	animElemWithAnimated("#cityName","lightSpeedIn");
	// animElemWithAnimated("#cityIconPanel","flip");

	console.log(displayDateTime(openWeatherMapData.dt));

	$("#cityCoords").html("<li> Time of data calculation : " + displayDateTime(openWeatherMapData.dt) +"</li>");

	$("#cityCoords").append("<li> Lati : " 		+openWeatherMapData.coord.lat 		+"</li>");
	$("#cityCoords").append("<li> Long : " 		+openWeatherMapData.coord.lon 		+"</li>");
	$("#cityCoords").append("<li> grnd_level : "+openWeatherMapData.main.grnd_level	+"</li>");
	$("#cityCoords").append("<li> humidity : "	+openWeatherMapData.main.humidity	+"</li>");
	$("#cityCoords").append("<li> pressure : "	+openWeatherMapData.main.pressure	+"</li>");
	$("#cityCoords").append("<li> sea_level : "	+openWeatherMapData.main.sea_level	+"</li>");
	$("#cityCoords").append("<li> temp : "		+openWeatherMapData.main.temp		+"</li>");
	$("#cityCoords").append("<li> temp_max : "	+openWeatherMapData.main.temp_max	+"</li>");
	$("#cityCoords").append("<li> temp_min : "	+openWeatherMapData.main.temp_min	+"</li>");
	$("#cityCoords").append("<li> sunrise : "	+displayDateTime(openWeatherMapData.sys.sunrise)		+"</li>");
	$("#cityCoords").append("<li> sunset : "	+displayDateTime(openWeatherMapData.sys.sunset)		+"</li>");
	//openWeatherMapData.sys.sunrise

	console.log("get() function executed...")
}); //get()

}); // $(document).ready(function(){
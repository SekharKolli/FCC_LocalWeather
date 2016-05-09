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
//	console.log(utcString);

	var myObj = $.parseJSON('{"date_created":"'+utcString+'"}'), 
	myDate = new Date(1000*myObj.date_created);

	// console.log(myDate.toString());
	// console.log(myDate.toLocaleString());
	// console.log(myDate.toUTCString());

	console.log("displayDateTime executed...");
	return myDate.toString();
} //displayDateTime

//converts Kelvin to Celsius
function displayTempInCelsius(tempKelvin) {
	return (300-tempKelvin).toFixed(2) + " °";
} //displayTempInCelsius

// converts Kelvin to Farenheit
function displayTempInFarenheit(tempKelvin) {
	return (9/5*(300 - tempKelvin) + 32).toFixed(2) + " °";
} //displayTempInFarenheit

// Function creates the required URL for use in the get call
function getOpenWeatherURL(coordinates) {

	// Open Weather App Id generated using lat and lon
	// http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=d2e2fa6910b1950870f71d164580f721
	// http://api.openweathermap.org/data/2.5/weather?lat=43.588852599999996&lon=-79.65142089999999&appid=d2e2fa6910b1950870f71d164580f721


	// Open Weather App Id generatd using 
	// http://api.openweathermap.org/data/2.5/weather?q=mississauga&appid=d2e2fa6910b1950870f71d164580f721
	// http://api.openweathermap.org/data/2.5/weather?q=mississauga,ca&appid=d2e2fa6910b1950870f71d164580f721

	var appIdStr = "&appid=d2e2fa6910b1950870f71d164580f721"; // appid receied for skolli.bb10@gmail.com email 
	var url = "http://api.openweathermap.org/data/2.5/weather?";

	url += "lat=";
	url += coordinates.latitude;
	url += "&lon=";
	url += coordinates.longitude;
	url += appIdStr;

	console.log(url);

	return url;
} // getOpenWeatherURL()

//----------------------------------------------------------------------------------------------
$(document).ready(function(){
	var openWeatherMapData; // variable that will hold the Map Data received from Open Weather
	var currLocation = {latitude:43.7001100, longitude:-79.4163000}; //hardcoding for Toronto for missing data and to test if local browser picks up data

	// Getting the co-ordinates from the browser / navigator
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
	        //$("#locData").html("latitude : " + position.coords.latitude + " <br> longitude : " + position.coords.longitude);
	        
	        currLocation.latitude = position.coords.latitude;
	        currLocation.longitude = position.coords.longitude;

	        console.log("coordinates info collected : ["+currLocation.latitude+" ,"+currLocation.longitude+"]");

		}); //getCurrentPosition(function(postion) callback
	} // navigator.geolocation

	var owUrl = getOpenWeatherURL(currLocation); // Get the URL to use for generating data

	$.get(owUrl, function (receivedData) {
		console.log(receivedData);
		openWeatherMapData = receivedData;

		$('#locData').html("<ul> </ul>");
		for(var prop in receivedData) {
			if (typeof(receivedData[prop]) === Object) {
				for(var pr in receivedData[prop]) {
					console.log("Going deep : "+prop+"."+ pr +" "+receivedData[prop][pr]);
					//$('#locData ul').append("<li>"+prop+"."+ pr +" "+receivedData[prop][pr]+"</li>");
				}		
			} else {
				console.log("Data : "+prop +" "+receivedData[prop]);
				// $('#locData ul').append("<li>"+prop +" "+receivedData[prop]+"</li>");
			}
		};

		$("#cityName").html(openWeatherMapData.name 
			+", <small>" 
			+openWeatherMapData.sys.country 
			+"</small>  " 
			+"<img src='http://openweathermap.org/images/flags/"
			+(openWeatherMapData.sys.country).toLowerCase() 
			+".png' width=20px>");

		$("#cityWeather").text(openWeatherMapData.weather[0].description);
		$("#cityTemp").text(displayTempInCelsius(openWeatherMapData.main.temp));


		$(".secondUnit").on("click",function () {
			
			var whichUnit = $("span.secondUnit").html();

			if (whichUnit === "F") {
				$("#cityTemp").text(displayTempInFarenheit(openWeatherMapData.main.temp));
				$("span.firstUnit").html("F");
				$("span.secondUnit").html("C");
			} else {
				$("#cityTemp").text(displayTempInCelsius(openWeatherMapData.main.temp));
				$("span.firstUnit").html("C");
				$("span.secondUnit").html("F");
			}

		});


		//http://openweathermap.org/img/w/04d.png

		var iconURL = "http://openweathermap.org/img/w/"+openWeatherMapData.weather[0].icon+".png"

		// $("#cityWeatherIcon").prop("src",iconURL);
		// $("#cityWeatherIcon").prop("width",300);
		// $("#cityWeatherIcon").prop("height",300); 
		iconURL = "url("+iconURL+")";
		$("#cityIconPanel").css("background-image",iconURL);

		animElemWithAnimated("#cityName","pulse");
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

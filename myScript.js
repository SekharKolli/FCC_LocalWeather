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
function displayDateTime(utcString) {
	// Function inspired by : http://stackoverflow.com/questions/5722919/jquery-convert-number-to-date
	//	console.log(utcString);

	var myObj = $.parseJSON('{"date_created":"'+utcString+'"}'),
	myDate = new Date(1000*myObj.date_created);

	// console.log(myDate.toString());
	// console.log(myDate.toLocaleString());
	// console.log(myDate.toUTCString());

	// console.log("displayDateTime executed...");
	return myDate.toString();
} //displayDateTime

// Display the contents of an object
function displayObjectContents(receivedData) {

	// $('#locData').html("<ul> </ul>");
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
} // displayObjectContents(receivedData)

// converts Kelvin to Farenhei
function displayTempInFarenheit(tempCelsius) {
	// send temprature in farenheit
	return (9/5*(tempCelsius) + 32).toFixed(2);
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
	url += "&units=metric";

	console.log(url);

	return url;
} // getOpenWeatherURL()

function paintPage(openWeatherMapData) {
	$("#cityName").html(openWeatherMapData.name
		+", <small>"
		+openWeatherMapData.sys.country
		+"</small>  "
		+"<img src='http://openweathermap.org/images/flags/"
		+(openWeatherMapData.sys.country).toLowerCase()
		+".png' width=20px>");

		$("#cityWeather").text(openWeatherMapData.weather[0].description);
		$("#cityTemp").text(openWeatherMapData.main.temp + " °");


		$(".secondUnit").on("click",function () {

			var whichUnit = $("span.secondUnit").html();

			if (whichUnit === "F") {
				$("#cityTemp").text(displayTempInFarenheit(openWeatherMapData.main.temp) + " °");
				$("span.firstUnit").html("F");
				$("span.secondUnit").html("C");
				$("#listTemp").text("temp : "		+displayTempInFarenheit(openWeatherMapData.main.temp)     +" °F");
				$("#listTemp_max").text("temp_max : "	+displayTempInFarenheit(openWeatherMapData.main.temp_max) +" °F");
				$("#listTemp_min").text("temp_min : "	+displayTempInFarenheit(openWeatherMapData.main.temp_min) +" °F");
			} else {
				$("#cityTemp").text(openWeatherMapData.main.temp + " °");
				$("span.firstUnit").html("C");
				$("span.secondUnit").html("F");
				$("#listTemp").text("temp : "		+openWeatherMapData.main.temp     +" °C");
				$("#listTemp_max").text("temp_max : "	+openWeatherMapData.main.temp_max +" °C");
				$("#listTemp_min").text("temp_min : "	+openWeatherMapData.main.temp_min +" °C");
			}

		});


		//http://openweathermap.org/img/w/04d.png

		var iconURL = "http://openweathermap.org/img/w/"+openWeatherMapData.weather[0].icon+".png"

		// $("#cityWeatherIcon").prop("src",iconURL);
		// $("#cityWeatherIcon").prop("width",300);
		// $("#cityWeatherIcon").prop("height",300);
		iconURL = "url("+iconURL+")";
		$("#cityIconPanel").css("background-image",iconURL);

		animElemWithAnimated("#cityWeather","bounceInDown");
		// animElemWithAnimated("#cityIconPanel","flip");

		console.log(displayDateTime(openWeatherMapData.dt));

		$("#cityCoords").html("<li class='list-group-item' id='listDataTime'> Time of data calculation : " + displayDateTime(openWeatherMapData.dt) +"</li>");
		$("#cityCoords").append("<li class='list-group-item' id='listSunrise'> sunrise : "	+displayDateTime(openWeatherMapData.sys.sunrise)		+"</li>");
		$("#cityCoords").append("<li class='list-group-item' id='listSunset'> sunset : "	+displayDateTime(openWeatherMapData.sys.sunset)		+"</li>");

		$("#cityCoords").append("<li class='list-group-item' id='listLati'> Lati : " 		+openWeatherMapData.coord.lat 		+"</li>");
		$("#cityCoords").append("<li class='list-group-item' id='listLong'> Long : " 		+openWeatherMapData.coord.lon 		+"</li>");
		$("#cityCoords").append("<li class='list-group-item' id='listGrnd_level'> grnd_level : "+openWeatherMapData.main.grnd_level	+"</li>");
		$("#cityCoords").append("<li class='list-group-item' id='listHumidity'> humidity : "	+openWeatherMapData.main.humidity	+" %</li>");
		$("#cityCoords").append("<li class='list-group-item' id='listPressure'> pressure : "	+openWeatherMapData.main.pressure	+" hpa</li>");
		$("#cityCoords").append("<li class='list-group-item' id='listSea_level'> sea_level : "	+openWeatherMapData.main.sea_level	+"</li>");
		$("#cityCoords").append("<li class='list-group-item' id='listTemp'> temp : "		+openWeatherMapData.main.temp     +" °C" +"</li>");
		$("#cityCoords").append("<li class='list-group-item' id='listTemp_max'> temp_max : "	+openWeatherMapData.main.temp_max +" °C" +"</li>");
		$("#cityCoords").append("<li class='list-group-item' id='listTemp_min'> temp_min : "	+openWeatherMapData.main.temp_min +" °C" +"</li>");
		//openWeatherMapData.sys.sunrise

		console.log("get() function executed...");
	} // function paintPage(openWeatherMapData)

	// Asks the browser for co-ordinates
	function navigatorCoordinates() {
		var currLocation = {latitude:43.7001100, longitude:-79.4163000}; //hardcoding for Toronto for missing data and to test if local browser picks up data
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position){
				//$("#locData").html("latitude : " + position.coords.latitude + " <br> longitude : " + position.coords.longitude);

				currLocation.latitude = position.coords.latitude;
				currLocation.longitude = position.coords.longitude;

				console.log("coordinates info collected : ["+currLocation.latitude+" ,"+currLocation.longitude+"]");

			}); //getCurrentPosition(function(postion) callback

			return currLocation;
		} // if (navigator.geolocation)
	} //navigatorCoordinates()

	//----------------------------------------------------------------------------------------------
	$(document).ready(function(){
		// var openWeatherMapData; // variable that will hold the Map Data received from Open Weather
		var currLocation = navigatorCoordinates();
		// var currLocation = {latitude:"--43.7001100", longitude:"--79.4163000"}; // Passing incorrect values for testing

		// $("mySearchModal").modal('show');

		$('#mySearchModal').on('shown.bs.modal', function () {
			$('#searchText').focus();
		});

		$('#goButton').on('click',function () {
			var cityInput = $('#searchText').val();
			console.log(cityInput);

			if(isValid(cityInput)) {
				// close the modal
				// call the Open Weather Api 
			}

		});

		var owUrl = getOpenWeatherURL(currLocation); // Get the URL to use for generating data

		$.get(owUrl, function (receivedData) {
			console.log(receivedData);

			if (receivedData.cod === "404") { // Object received with 404 error
				console.log("Error : City Not Found. API used: "+owUrl);
				$("#cityName").html("<h1>City Not Found!! <small>Try Again...</small></h1> ");
				$(".muteIfError").html("<h3>  Offending URL:</h3><h4>"+ owUrl +"</h4>");
			} else {
				paintPage(receivedData); // Valid Object received from Open Weather
			}

		}); //get()

	}); // $(document).ready(function(){

		//
		// Saving the code related to modal here
		//
		// <!-- mySearchModal -->
		// <div id="mySearchModal" class="modal fade" role="dialog">
		// 	<div class="modal-dialog modal-lg">
		// 		<!-- Modal content-->
		// 		<div class="modal-content">
		// 			<div class="modal-body">
		// 				<br>
		// 				<button type="button" class="close" data-dismiss="modal">&times;</button>
		// 				<!-- <label for="searchText">City Name:</label>
		// 				<input id="searchText" type="text"></input> -->
		// 				<br><br>
		// 				<div class="row">
		// 					<div class="col-lg-6">
		// 						<div class="input-group">
		// 							<input type="text" class="form-control" placeholder="Enter City Name..." id="searchText">
		// 							<span class="input-group-btn">
		// 								<button class="btn btn-info" type="button">Weather Right Now?</button>
		// 							</span>
		// 						</div><!-- /input-group -->
		// 					</div><!-- /.col-lg-6 -->
		// 				</div><!-- /.row -->
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>

// myScript.js
// Author : Sekhar Kolli

$(document).ready(function(){
    
var currLocation = {latitude:43.588852599999996, longitude:-79.65142089999999}; //hardcoding for mississauga for testing 
var appIdStr = "&appid=d2e2fa6910b1950870f71d164580f721"; // appid receied for skolli.bb10@gmail.com email 
var url = "http://api.openweathermap.org/data/2.5/weather?";
    
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

$.get(url, function (data) {
	console.log(data);

	$('#locData').html("<ul> </ul>");

	for(var prop in data) {
		if (data[prop] === Object) {
			for(var pr in data[prop]) {
				console.log("Going deep : "+prop+"."+ pr +" "+data[prop][pr]);
				//$('#locData ul').append("<li>"+prop+"."+ pr +" "+data[prop][pr]+"</li>");
			}		
		} else {
			console.log("Data : "+prop +" "+data[prop]);
			$('#locData ul').append("<li>"+prop +" "+data[prop]+"</li>");
		}
	};

}); //get()
    
}); // $(document).ready(function(){
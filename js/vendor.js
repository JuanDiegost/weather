var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;
var tempUnit = 'C';
var currentTempInCelsius;

$(document).ready(function() {

  if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(function (position) {
     var lat = "lat=" + position.coords.latitude;
     var lon = "lon=" + position.coords.longitude;
     getWeather(lat, lon);
   });
 }else {
    console.log("No es posible acceder a su localización.");
  }

  $("#changeUnits").click(
  function () {
    var currentTempUnit = $("#units").text();
    var newTempUnit = currentTempUnit == "C" ? "F" : "C";
    $("#units").text(newTempUnit);
    if (newTempUnit == "F") {
      var fahTemp = Math.round(parseInt($("#weather").text()) * 9 / 5 + 32);
      $("#weather").text(fahTemp + " " + String.fromCharCode(176));
    } else {
      $("#weather").text(currentTempInCelsius + " " + String.fromCharCode(176));
    }
  });

  function getWeather(lat, lon) {
  var urlString = api + lat + "&" + lon;
  $.ajax({
    url: urlString, success: function (result) {
      $("#city").text(result.name + ", "+result.sys.country);
      currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
      $("#weather").text(currentTempInCelsius + " " + String.fromCharCode(176));
      $("#units").text(tempUnit);
      IconGen(result.weather[0].main);
    }
  });
}

function IconGen(desc) {
  var desc = desc.toLowerCase()
  switch (desc) {
    case 'drizzle':
      addIcon(desc)
      break;
    case 'clouds':
      addIcon(desc)
      break;
    case 'rain':
      addIcon(desc)
      break;
    case 'snow':
      addIcon(desc)
      break;
    case 'clear':
      addIcon(desc)
      break;
    case 'thunderstom':
      addIcon(desc)
      break;
    default:
      $('div.clouds').removeClass('hide');
  }
}

function addIcon(desc) {
  $("#icon").addClass("icon-"+desc);
}

});

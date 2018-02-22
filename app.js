var api = "http://api.openweathermap.org/data/2.5/weather?units=metric&";
var API_KEY ="33706a4baf67fae1b1206e95a710766d";
var urlIcon = "https://res.cloudinary.com/dzwi57aj6/image/upload/";
var lat, long;
var fah = false;
var res;

function displayTemp(c, f){
  if(f) return Math.round(c * 9 / 5 + 32) + " °F";
  return Math.round(c) + " °C";
}

function render(res, fah){
  var currentTemp= displayTemp(res.main.temp, fah);
  var currentCond = res.weather[0].main;
  $("#ctemp").html(currentTemp)
  $("#city").html(res.name)
  $("#cond").html(currentCond);
  $(".icon").html("<img src=" + urlIcon + res.weather[0].icon + ".png>")
  $("#hum").html(res.main.humidity + "MM");
  $("#wind").html(res.wind.speed + "MPH")
}

$(document).ready(function() {
  
  navigator.geolocation.getCurrentPosition(success, err);

  function success(position) {
    var lat = "lat=" + position.coords.latitude;
    var long ="lon=" + position.coords.longitude;
    weather(lat, long);
  }
  
  function err(){
    console.log("error");
  }


  function weather(lat,long) {
    var url = api + lat + "&" + long + "&appid=" + API_KEY;
    
    $.getJSON(url, function(apidata){
      res = apidata;   
      
      render(apidata, fah);
      $("#toggle").click(function(){
          fah = !fah;
          render(res, fah);
      })
    })  
  }
});

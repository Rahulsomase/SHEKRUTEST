// https://api.openweathermap.org/data/2.5/weather?q=aurangabad&appid=ae1924197673d94557d180293632dcc5



function getData(){
    let city = document.getElementById("query").value;

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ffa97c4c904a3ed7d752773122e49b9d`;

    fetch(url)
    .then(function(res){
    return res.json();
    
    })
    .then(function(res){
        console.log(res)
        append(res)
    })
    .catch(function(err){

    })
}
// src="https://maps.google.com/maps?q=pune&t=&z=15&ie=UTF8&iwloc=&output=embed"


function append(data){

    let url= `https://maps.google.com/maps?q=${data.name}&t=&z=15&ie=UTF8&iwloc=&output=embed`
    
    let container = document.getElementById("container");
    container.innerHTML = ""


    let h2 = document.createElement("h2")
    h2.innerText = data.name

    let temp = document.createElement("p")
    temp.innerText =  `Temp:- ${data.main.temp}`

    let min_temp = document.createElement("p")
    min_temp.innerText =  `Min Temp:- ${data.main.temp_min}`

    let max_temp = document.createElement("p")
    max_temp.innerText =  `Max Temp:- ${data.main.temp_max}`

    let wind = document.createElement("p")
    wind.innerText =  `Wind:- ${data.main.humidity}`

    let clouds = document.createElement("p")
   clouds.innerText =  `Clouds:- ${data.clouds.all}`

   let sunrise = document.createElement("p")
  sunrise.innerText =  `Sunrise:- ${data.sys.sunrise}`

    container.append(h2 , temp , min_temp , max_temp , wind , clouds , sunrise);

    let iframe = document.getElementById("gmap_canvas")
    iframe.src  = url;

}
function getLocation(){
    navigator.geolocation.getCurrentPosition(success);


function success(pos) {
    const crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

        getWeather(crd.latitude , crd.longitude);
  }
}


  function getWeather(lat , lon){

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ffa97c4c904a3ed7d752773122e49b9d`;

    fetch(url)
    .then(function(res){
    return res.json();
    
    })
    .then(function(res){
        console.log(res);
        append(res);
    })
    .catch(function(err){
        console.log(err);
    })
}
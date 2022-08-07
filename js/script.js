let search = document.getElementById("search");
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January", "February", "March", "April", "May","June", "July", "August", "September", "October", "November", "December"];
let todayTemp = async (city)=>{
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2ac5f5badad140eb8c9144250211709&q=${city}&days=3`)
    let data = await response.json();
    // console.log(data)
    let date = new Date(data.current.last_updated);
    document.getElementById("todayTemp").innerHTML = 
    `<div class="weather-header d-flex justify-content-between p-2">
              <div class="day">
                <p class="mb-0">${days[date.getDay()]}</p>
              </div>
              <div class="date">
                <p class="mb-0">${date.getDate()} ${months[date.getMonth()]}</p>
              </div>
            </div>
    <div  class="weather-info p-4">
    <div class="city">
        <p class="mb-0 text-capitalize">${data.location.name}</p>
    </div>
    <div class="temp d-flex justify-content-between align-items-center">
        <p>${data.current.temp_c}<sup>o</sup>C</p>
        <img src="https:${data.current.condition.icon}" height="90" width="90" alt="">
    </div>
    <div class="desc">
        <p>${data.current.condition.text}</p>
    </div>
    <div class="icons d-flex justify-content-between">
        <div><img src="img/icon-umberella.png" class ="me-2" alt=""> 20%</div>
        <div><img src="img/icon-wind.png" class="me-2" alt="">18km/h</div>
        <div><img src="img/icon-compass.png" class="me-2" alt="">East</div>
    </div>
    </div>`
    nextTemp(data)
}
let nextTemp = (data)=>{
  let another = document.getElementsByClassName("another")
  let temp = [];
  let forecast = data.forecast.forecastday
  for(let i =1; i< forecast.length;i++){
  let date = new Date(forecast[i].date);
  temp[i] = ` 
  <div class="weather-header d-flex justify-content-center p-2">
  <div class="day">
    <p class="mb-0">${days[date.getDay()]}</p>
  </div>
</div>
<div class="weather-info p-5">
  <div class="temperature text-center">
    <img src="https:${forecast[i].day.condition.icon}" class="mb-4" height="48" width="48" alt="">
    <p class="text-white mb-0 fs-2">${forecast[i].day.maxtemp_c}<sup>o</sup>C</p>
    <p>${forecast[i].day.mintemp_c}<sup>o</sup>C</p>
  </div>
  <div class="desc text-center">
    <p>${forecast[i].day.condition.text}</p>
  </div>
</div>`
  }
  another[0].innerHTML = temp[1]
  another[1].innerHTML = temp[2]
}

search.addEventListener("keyup", function(search){
    todayTemp(search.target.value)
})
todayTemp("cairo")
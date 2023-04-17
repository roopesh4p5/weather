function GetInfo() {

    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("cityName");
    cityName.innerHTML = "This week weather of "+newName.value+" is down below";
    
    // Fetching background image from Unsplash API based on city name
    fetch('https://source.unsplash.com/featured/?'+newName.value)
    .then(response => {
        document.body.style.backgroundImage = 'url(' + response.url + ')';
    })
    .catch(error => {
        console.log(error);
    });
    
    // Fetching weather data from OpenWeatherMap API based on city name
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=b5ff347c475d31ad635e279fdcc630c3')
    .then(response => response.json())
    .then(data => {

        //Getting the min and max values for each day
        for(i = 0; i<5; i++){
            document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1)+ "°";
            //Number(1.3450001).toFixed(2); // 1.35
        }

        for(i = 0; i<5; i++){
            document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
        }
        //------------------------------------------------------------

        // //Getting Weather Icons
        // for(i = 0; i<5; i++){
        //     document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
        //     data.list[i].weather[0].icon
        //     +".png";
        // }
        //------------------------------------------------------------
        //Getting Weather Icons
// for(i = 0; i<5; i++){
//     const minTemp = Number(data.list[i].main.temp_min - 273.15);
//     let icon;
//     if (minTemp > 40) {
//       icon = "01.png";
//     } else if (minTemp > 10) {
//       icon = "02.png";
//     } else {
//       icon = "03.png";
//     }
//     document.getElementById("img" + (i+1)).src = icon;
//   }
  
 for (i = 0; i < 5; i++) {
                let weatherIcon = document.getElementById("img" + (i + 1));
                let minTemp = data.list[i].main.temp_min - 273.15;

                if (minTemp <10) {
                    weatherIcon.src="1.png";
                } else if (minTemp <20) {
                    weatherIcon.src = "2.png";
                } else if (minTemp < 30) {
                    weatherIcon.src = "3.png";
                } else if (minTemp <50) {
                    weatherIcon.src = "5.png";
                } else {
                    weatherIcon.src = "02.png";
                }
            }

        //     for (i = 0; i < 5; i++) {
        //         document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
        //     }
        // });

  



        console.log(data)


    })
    .catch(err => alert("Something Went Wrong: Try Checking Your Internet Connection"))
}

function DefaultScreen(){
    document.getElementById("cityInput").defaultValue = "Bangalore";
    GetInfo();
}

//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

//Function to get the correct integer for the index of the days array
function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}

for(i = 0; i<5; i++){
    document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
}

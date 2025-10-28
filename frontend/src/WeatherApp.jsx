import SearchBox from "./SearchBox"
import InfoBox from "./InfoBox"
import { useState } from "react"

export default function WeatherApp(){
    const [weatherInfo , setWeatherInfo] = useState({
        city:"Sample",
        temp:31.2,
        humidity: 87,
        weather: "haze",
    });

    let updateInfo = (newinfo) =>{
        setWeatherInfo(newinfo);
    }
    return(
        <div className="weather-app">
            <h2>Weather Information</h2>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    )
}
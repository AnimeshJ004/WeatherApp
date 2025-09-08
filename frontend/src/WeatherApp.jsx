import SearchBox from "./SearchBox"
import InfoBox from "./InfoBox"
import { useState } from "react"
import "./WeatherApp.css"

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
        <div style={{textAlign:"center"}} className="styling">
            <h2 style={{color: 'white', textDecoration:"underline"}}>Weather Information</h2>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    )
}
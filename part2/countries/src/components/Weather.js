import {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
    const [weatherInfo, setWeatherInfo] = useState(null)
    const api_key= process.env.REACT_APP_API_KEY
    

    
    useEffect(() => {
        
        axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&APPID=${api_key}`)
        .then(response => {
            
            setWeatherInfo(response.data)
        
        }) 
    }, [api_key, capital])
   


    if (weatherInfo !== null) {

        return (

            <>
                <h2>Weather in {weatherInfo.name}</h2>
                <div>temperature {Math.round(weatherInfo.main.temp - 273.15)} Celsius</div>
                <img src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt='weather icon'></img>
                <p>wind {weatherInfo.wind.speed} m/s</p>
            </>
        )

    }
    
}

export default Weather
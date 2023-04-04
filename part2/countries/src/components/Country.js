
import Weather from './Weather'


const Country = ({ display, setDisplay, weatherInfo, setWeatherInfo}) => {
    
    
    
    if (!display) {
        return null
    }

    if (display.length > 10) {
        return (
            <>
                <div>Too many matches, specify another filter</div>
            </>
        )

    }

    if (display.length <= 10 && display.length > 1) {
        const handleButton = (c) => {
            const showCountry = [c]
            setDisplay(showCountry)
        }
    
        
        return (
            <>
                {display.map(c => 
                    <div key={c.name.common}>
                        {c.name.common}
                        <button onClick={() => handleButton(c)}>show</button>
                    </div>
                )}

            </>
        )
    }

    if (display.length === 1) {

        return (
            <>
                <h1>{display[0].name.common}</h1>
                <div>capital {display[0].capital}</div>
                <div>area {display[0].area}</div>
                <h3>languages</h3>
                <ul>
                    {Object.keys(display[0].languages).map(key => 
                    <li key={display[0].languages[key]}>{display[0].languages[key]}</li>)}
                </ul>
                <img src={display[0].flags.png} alt="country flag"></img>
                <Weather capital={display[0].capital} />
            </>
        )
       
        

       
    }

}



export default Country
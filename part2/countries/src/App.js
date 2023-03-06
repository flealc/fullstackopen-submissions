import {useState, useEffect} from 'react'
import axios from 'axios'
import Country from './components/Country'
const App = () => {
  
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState(null)
  const [display, setDisplay] = useState(null)

  
  
  const handleInput = (event) => {
    setValue(event.target.value)
  }
  
    
  useEffect(() => {
    
  if (!countries) {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }  
    

 else {
      const rexp = new RegExp(value, "i")
      const matches = countries.filter(c => c.name.common.match(rexp))
      value.length !== 0 ? setDisplay(matches): setDisplay(null)
      
    } 
  }, [countries, value])

  return (
    <>
      find countries  <input onChange={handleInput} value={value} /> 
      <Country display={display} setDisplay={setDisplay}/>
    </>
  )
}

export default App

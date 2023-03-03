import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

useEffect(() => {
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
}, [])

  const handleNameChange = (event) => {
   setNewName(event.target.value) 
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value) 
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value) 
  }

  const addName = (event) => {
    event.preventDefault()
    if (persons.filter(person => person.name === newName).length !== 0) {
      alert(`${newName} is already added to phonebook`)
    } 
    else { 
      const nameObject = {
        name: newName,
        number: newNumber,
      }

      axios
        .post('http://localhost:3001/persons', nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
      
      
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handler={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
        addName={addName} 
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons}/>
    </div>
  )
}

export default App
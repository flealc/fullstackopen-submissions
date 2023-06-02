import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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
    const filteredPersons = persons.filter(person => person.name === newName)
    if (filteredPersons.length !== 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updatePerson(filteredPersons[0])
      }
      else {
        setNewName('')
        setNewNumber('')
      }
    } 
    else {
      const nameObject = {
        name: newName,
        number: newNumber,
      }
      
      personService
        .create(nameObject)
        .then(returnedName => {
          setPersons(persons.concat(returnedName))
          setNewName('')
          setNewNumber('')
          setMessage({
            text: `Added ${newName}`,
            class: 'notification'
          })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage({
            text: `${error.response.data.error}`,
            class: 'error'
          })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.remove(id)
      setMessage({
        text: `Removed ${name}`,
        class: 'notification'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setPersons(persons.filter(n => n.id !== id))
    }
  }

  const updatePerson = (person) => {
    
      const changedPerson = { ...person, number: newNumber}
      personService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id === person.id ? returnedPerson : p))
          setNewName('')
          setNewNumber('')
          setMessage(
            `Updated ${newName}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          if (error.response.status === 400) {
            setMessage({
              text: `${error.response.data.error}`,
              class: 'error'
            })
            setTimeout(() => {
              setMessage(null)
            }, 5000) 
          } else { 
            setMessage({
              text: `Information of ${person.name} has already been removed from server`,
              class: 'error'
            })
            setTimeout(() => {
              setMessage(null)
            }, 5000) 
            
            setPersons(persons.filter(n => n.id !== person.id))
          } 
        })
  }
      
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
      <Persons filter={filter} persons={persons} deleteHandler={deletePerson}/>
    </div>
  )
}

export default App
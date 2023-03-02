import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  const handleNameChange = (event) => {
   setNewName(event.target.value) 
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value) 
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value) 
  }

  const rexp = new RegExp(filter, "i");

  const addName = (event) => {
    event.preventDefault()
    if (persons.filter(person => person.name === newName).length !== 0) {
      alert(`${newName} is already added to phonebook`)
    } 
    else { 
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with: <input 
                  onChange={handleFilterChange}
                  value={filter} 
                />
        </div>
      <form onSubmit={addName}>
        <div>
          name: <input 
                  onChange={handleNameChange}
                  value={newName} 
                />
        </div>
        <div>
          number: <input 
                  onChange={handleNumberChange}
                  value={newNumber} 
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(person => person.name.match(rexp)).map(person =>
        <Person key={person.id} person={person}/> 
      )}
    </div>
  )
}

export default App

const Persons = (props) => {
    const rexp = new RegExp(props.filter, "i");
    
    return (
    <>
        {props.persons.filter(person => person.name.match(rexp)).map(person =>
            <div key={person.id}>
                {person.name} {person.number}
                 <button onClick={() => props.deleteHandler(person.id, person.name)}>delete</button>
            </div>
        )}
    </>
    )
}

export default Persons
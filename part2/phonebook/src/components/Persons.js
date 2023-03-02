
const Persons = (props) => {
    const rexp = new RegExp(props.filter, "i");
    
    return (
    <>
        {props.persons.filter(person => person.name.match(rexp)).map(person =>
            <div key={person.id}>
                {person.name} {person.number}
            </div>
        )}
    </>
    )
}

export default Persons
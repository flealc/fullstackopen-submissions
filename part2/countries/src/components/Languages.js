const Languages = ( {languages} ) => {
    
   
    return (
        <>
            <h3>languages</h3>
            <ul>
            {Object.keys(languages).map(key => 
                <li key={languages[key]}>{languages[key]}</li>)}
            </ul>

        </>
    )
}    


export default Languages
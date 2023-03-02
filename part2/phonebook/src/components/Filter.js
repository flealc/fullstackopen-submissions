const Filter = (props) => 
    <div>
        filter shown with: <input 
                onChange={props.handler}
                value={props.filter} 
        />
    </div>

export default Filter

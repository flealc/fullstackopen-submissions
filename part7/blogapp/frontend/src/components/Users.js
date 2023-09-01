import { Link, Routes, Route, useMatch } from "react-router-dom"


const Users = ({ users }) => {

  

  if (!users) {
    return null
  }

  return (

    
    <div>
      <h2>Users</h2>

      <div>
        <table>
          <tbody>
            <tr>
              <td>
              </td>
              <td><h3>blogs created</h3></td>
            </tr>
            {users.map(user => (
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


export default Users
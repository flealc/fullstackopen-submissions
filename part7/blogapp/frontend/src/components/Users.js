import { Link } from "react-router-dom"
import { useSelector } from "react-redux/es/hooks/useSelector"

const Users = () => {


   const users = useSelector(state => state.users)

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
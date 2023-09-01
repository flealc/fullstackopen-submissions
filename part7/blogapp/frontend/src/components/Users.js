import { useSelector } from "react-redux/es/hooks/useSelector"


const Users = () => {

  const users = useSelector(state => state.users)

  console.log(users)

  return (
    <div>
      <h2>Users</h2>

      <div>
        <table>
          <tbody>
            <tr>
              <td>
              </td>
              <td><strong>blogs created</strong></td>
            </tr>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
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
import { useState } from "react"

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    await login(username, password)
  }

  return (
    <form className="ui form small" onSubmit={handleSubmit}>
      <div className="four wide field">
      <label htmlFor="username">username</label>
        <input
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div className="four wide field">
      <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button className="ui basic compact button small" id="login-button" type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm

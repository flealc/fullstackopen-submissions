import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { notifyWith } from "./reducers/notificationReducer"
import { initializeBlogs } from "./reducers/blogReducer"
import { loginUser, clearLogin, setLogin } from "./reducers/loginReducer"
import { initializeUsers } from "./reducers/usersReducer"

import {
  Routes, Route
} from "react-router-dom"

import Blogs from "./components/Blogs"
import Blog from "./components/Blog"
import storageService from "./services/storage"

import LoginForm from "./components/Login"
import Notification from "./components/Notification"
import Users from "./components/Users"
import User from "./components/User"


const App = () => {
  
  const dispatch = useDispatch()

  useEffect(() => {
    const user = storageService.loadUser()
    dispatch(setLogin(user))
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  
  const login = async (username, password) => {
    try {
      await dispatch(loginUser(username, password))
      dispatch(notifyWith("welcome!"))
    } catch (e) {
      dispatch(notifyWith("wrong username or password", "error"))
    }
  }

  const logout = async () => {
    dispatch(clearLogin())
    storageService.removeUser()
    dispatch(notifyWith("logged out"))
  }

  const user = useSelector(state => state.login)

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm login={login} />
      </div>
    )
  }

  return (
    <div>
      <div>
        <h2>blogs</h2>

        <Notification />
        <div>
          {user.name} logged in
        </div>
        <button onClick={logout}>logout</button>
      
      </div>
      <Routes>
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={
          <div>
            <Blogs />
          </div>
        } />
      </Routes>
    </div>
  )
  
}

export default App

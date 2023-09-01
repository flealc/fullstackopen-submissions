import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { notifyWith } from "./reducers/notificationReducer"
import { initializeBlogs, likeBlog, deleteBlog, createBlog } from "./reducers/blogReducer"
import { loginUser, clearLogin, setLogin } from "./reducers/loginReducer"
import { initializeUsers } from "./reducers/usersReducer"

import {
  Routes, Route, useMatch
} from "react-router-dom"


import Blog from "./components/Blog"
import storageService from "./services/storage"

import LoginForm from "./components/Login"
import NewBlog from "./components/NewBlog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import Users from "./components/Users"
import User from "./components/User"



const App = () => {
  
  const dispatch = useDispatch()

  const blogFormRef = useRef()


  useEffect(() => {
    const user = storageService.loadUser()
    dispatch(setLogin(user))
  }, [])

  
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])


  const blogs = useSelector(state => state.blog).map(blog => blog)
  const users = useSelector(state => state.users)


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

  const like = async (blog) => {
    dispatch(likeBlog(blog))
    dispatch(notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`))
  }

  const create = (blog) => {
    dispatch(createBlog(blog))
    dispatch(notifyWith(`A new blog '${blog.title}' by '${blog.author}' added`))
    blogFormRef.current.toggleVisibility()
  }
  const remove = async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`,
    )
    if (ok) {
      dispatch(deleteBlog(blog.id))
      dispatch(notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`))
    }
  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm login={login} />
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

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
        
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/" element={
          <div>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <NewBlog create={create}/>
            </Togglable>
            <div> 
              {blogs.sort(byLikes).map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  like={() => like(blog)}
                  canRemove={user && blog.user.username === user.username}
                  remove={() => remove(blog)}
                />
              ))}
            </div>
          </div>
        } />
      </Routes>
    </div>
  )
  
}

export default App

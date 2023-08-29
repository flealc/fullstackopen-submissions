import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { notifyWith } from "./reducers/notificationReducer"
import { initializeBlogs, likeBlog, deleteBlog } from "./reducers/blogReducer"

import Blog from "./components/Blog"
import loginService from "./services/login"
import storageService from "./services/storage"

import LoginForm from "./components/Login"
import NewBlog from "./components/NewBlog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"



const App = () => {
  const [user, setUser] = useState("")
  
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    const user = storageService.loadUser()
    setUser(user)
  }, [])

  const blogs = useSelector(state => state.blog).map(blog => blog)
  
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])



  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      storageService.saveUser(user)
      dispatch(notifyWith("welcome!"))
    } catch (e) {
      dispatch(notifyWith("wrong username or password", "error"))
    }
  }

  const logout = async () => {
    setUser(null)
    storageService.removeUser()
    dispatch(notifyWith("logged out"))
  }


  const like = async (blog) => {
    dispatch(likeBlog(blog))
    dispatch(notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`))
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
      <h2>blogs</h2>
      
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlog />
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
  )
}

export default App

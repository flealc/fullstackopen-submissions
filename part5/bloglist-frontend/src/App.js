import { useState, useEffect } from 'react'
import Login from './components/Login'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState([null, null])
 
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      getBlogs()
    }
    
  }, [])


  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }
  
  const createBlog = async (blogToCreate) => {
    try {
      const blog = await blogService.create(blogToCreate)
      setNotification(['success', `New blog "${blog.title}" by ${blog.author} added`])
      setBlogs(blogs.concat(blog))
      setTimeout(() => {
        setNotification([null, null])
      }, 5000)
    } catch (exception) {
      setNotification(['error', exception.response.data.error])
      setTimeout(() => {
        setNotification([null, null])
      }, 5000)
    }
    
  }

  
  
  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      getBlogs()
      setNotification(['success', 'Welcome!'])
      setTimeout(() => {
        setNotification([null, null])
      }, 5000)
    } catch (exception) {
      setNotification(['error', 'Wrong username or password'])
      setTimeout(() => {
        setNotification([null, null])
      }, 5000)
    }

  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  
  return (
    <div>
      <Notification content={notification} />
      {!user ? 
        <Login 
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword} 
          /> :
          <div>
            <Blogs
              handleLogout={handleLogout}
              name={user.name}
              blogs={blogs}
            />
            <BlogForm
              createBlog={createBlog}
            />
          </div>
          }
    </div>  
      
  )
}

export default App
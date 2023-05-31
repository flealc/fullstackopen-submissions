import { useState, useEffect } from 'react'
import Login from './components/Login'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
 
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    getBlogs()
  }, [])


  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }
  
  const createBlog = async (blogToCreate) => {
    try {
      const blog = await blogService.create(blogToCreate)
      setBlogs(blogs.concat(blog.data))
    } catch (exception) {
      console.log(exception)
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
    } catch (exception) {
      console.log(exception)
    }

  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  
  return (
    <div>
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
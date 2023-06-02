import { useState, useEffect } from 'react'
import Login from './components/Login'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
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

  const updateBlog = async (blogToUpdate, blogId) => {
    try {
      const blog = await blogService.update(blogToUpdate, blogId)
      setNotification(['success', `You liked "${blog.title}" by ${blog.author}`])
      setTimeout(() => {
        setNotification([null, null])
      }, 5000)
      setBlogs(blogs.filter(b => b.id !== blog.id).concat(blog))
    } catch (exception) {
    setNotification(['error', exception.response.data.error])
    setTimeout(() => {
      setNotification([null, null])
    }, 5000)
    }
    
  }

  const deleteBlog = async (blogToDelete) => {
    if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`)) {
      try {
        await blogService.remove(blogToDelete, blogToDelete.id)
        setNotification(['success', `Blog removed!`])
        getBlogs()
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

  const likesSort = (blog1, blog2) => (
    blog2.likes-blog1.likes
  )

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
            <h2>blogs</h2>
            <p>{user.name} logged in <button onClick={ handleLogout }>logout</button></p>             
            <Togglable buttonLabel='new blog'>
              <BlogForm
                createBlog={createBlog}
              />
            </Togglable>
            {blogs.sort(likesSort).map(blog => 
              <Blog
              key={blog.id} 
              blog={blog} 
              updateBlog={updateBlog}
              deleteBlog={deleteBlog} 
              />
              )}
          </div>
          }
    </div>  
      
  )
}

export default App
import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import storageService from "./services/storage"

import LoginForm from "./components/Login"
import NewBlog from "./components/NewBlog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

import { useNotificationDispatch } from "./NotificationContext"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getBlogs, createNewBlog } from "./requests"

const App = () => {
  const [user, setUser] = useState("")

  const blogFormRef = useRef()
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()


  const blogsResult = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs
  })

  const blogs = blogsResult.data

  const newBlogMutation = useMutation(createNewBlog, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
    }
  })

  useEffect(() => {
    const user = storageService.loadUser()
    setUser(user)
  }, [])

  /* useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, []) */

  const notifyWith = (message, type = "info") => {
    dispatch({type: 'SET', payload: {
      message,
      type,
    }})

    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 3000)
  }

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      storageService.saveUser(user)
      notifyWith("welcome!")
    } catch (e) {
      notifyWith("wrong username or password", "error")
    }
  }

  const logout = async () => {
    setUser(null)
    storageService.removeUser()
    notifyWith("logged out")
  }

  const createBlog = (newBlog) => {
    newBlogMutation.mutate(newBlog)
    notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`)
    blogFormRef.current.toggleVisibility()
  }

  const like = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const updatedBlog = await blogService.update(blogToUpdate)
    notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`)
    setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)))
  }

  const remove = async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`,
    )
    if (ok) {
      await blogService.remove(blog.id)
      notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
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

  if (blogs) return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
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

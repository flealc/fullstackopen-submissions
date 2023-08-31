import { useRef } from "react"
import Blog from "./components/Blog"
import loginService from "./services/login"
import storageService from "./services/storage"

import LoginForm from "./components/Login"
import NewBlog from "./components/NewBlog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

import { useNotificationDispatch } from "./NotificationContext"
import { useUserDispatch, useUserValue } from "./UserContext"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getBlogs, createNewBlog, updateBlog, removeBlog } from "./requests"

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useNotificationDispatch()
  const userDispatch = useUserDispatch()
  const queryClient = useQueryClient()
  const user = useUserValue()  

  const blogsResult = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    refetchOnWindowFocus: false
  })

  const blogs = blogsResult.data

  const newBlogMutation = useMutation(createNewBlog, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
    }, 
    onError: () => {
      notifyWith('There was an error creating the blog', 'error')
    }
  })

  const updateBlogMutation = useMutation(updateBlog, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.map(
        blog => blog.id === updatedBlog.id 
          ? updatedBlog
          : blog
      ))
    }
  })

  const removeBlogMutation = useMutation(removeBlog, {
    onSuccess: (id) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.filter(
        blog => blog.id !== id 
      ))
      }
  })

  const notifyWith = (message, type = "info") => {
    dispatch({ type: 'SET', payload: {
      message,
      type,
    }})

    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 3000)
  }

  const login = async (username, password) => {
    try {
      const loggedUser = await loginService.login({ username, password })
      storageService.saveUser(loggedUser)
      userDispatch({ type: 'SET', payload: loggedUser })
      notifyWith("welcome!")
    } catch (e) {
      notifyWith("wrong username or password", "error")
    }
  }

  const logout = async () => {
    userDispatch({ type: 'CLEAR' })
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
    updateBlogMutation.mutate(blogToUpdate)
    notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`)
  }

  const remove = async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`,
    )
    if (ok) {
      removeBlogMutation.mutate(blog.id)
      notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`)
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

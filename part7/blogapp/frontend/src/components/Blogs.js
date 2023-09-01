import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Togglable from "./Togglable"
import NewBlog from "./NewBlog"
import { useRef } from "react"
import { notifyWith } from "../reducers/notificationReducer"
import { createBlog, deleteBlog } from "../reducers/blogReducer"
import { useDispatch } from "react-redux"

const Blogs = () => {

  const user = useSelector(state => state.login)
  const blogs = useSelector(state => state.blog).map(blog => blog)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

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
  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: "solid",
  }


  const byLikes = (b1, b2) => b2.likes - b1.likes
  if (!blogs) {
    return null
  }

  return (
    
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlog create={create}/>
      </Togglable>
      {blogs.sort(byLikes).map((blog) => (
        <div key={blog.id} style={style}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          {' '}
          {(user && blog.user.username === user.username) && <button onClick={() => remove(blog)}>delete</button>}
          {' '}
        </div>
      ))}
    </div>
  )
}

export default Blogs
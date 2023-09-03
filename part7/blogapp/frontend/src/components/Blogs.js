import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Togglable from "./Togglable"
import NewBlog from "./NewBlog"
import { useRef, useEffect } from "react"
import { notifyWith } from "../reducers/notificationReducer"
import { createBlog, deleteBlog } from "../reducers/blogReducer"
import { useDispatch } from "react-redux"
import { initializeUsers } from "../reducers/usersReducer"

const Blogs = () => {

  const blogs = useSelector(state => state.blog).map(blog => blog)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [blogs])


  const user = useSelector(state => state.login)
  

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
  /* const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: "solid",
  } */


  const byLikes = (b1, b2) => b2.likes - b1.likes
  if (!blogs) {
    return null
  }

  return (
    
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlog create={create}/>
      </Togglable>
      <div className="ui divided list">
        {blogs.sort(byLikes).map((blog) => (
          <div className="item"  key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            {' '}
            {(user && blog.user.username === user.username) && <button className="ui basic compact button mini" onClick={() => remove(blog)}>delete</button>}
            {' '}
            <div className="description">{blog.likes} likes</div>
          </div>
        ))}
      </div>
     
    </div>
  )
}

export default Blogs
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useMatch } from "react-router-dom"
import { useDispatch } from "react-redux"
import { likeBlog } from "../reducers/blogReducer"
import { notifyWith } from "../reducers/notificationReducer"

const Blog = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blog)
  
  const match = useMatch('/blogs/:id')
  const blog = match 
    ? blogs.find(blog => blog.id === match.params.id)
    : null
  
  const like = async () => {
    dispatch(likeBlog(blog))
    dispatch(notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`))
  }

  if (!blog) {
    return null
  }

  return (
    <div className="blog">
      <h2>{blog.title} {blog.author}</h2> 
      
        <div>
          <div>
            {" "}
            <a href={blog.url}> {blog.url}</a>{" "}
          </div>
          <div>
            likes {blog.likes} <button onClick={like}>like</button>
          </div>
          <div>added by {blog.user && blog.user.name}</div>
        </div>
    </div>
  )
}

export default Blog

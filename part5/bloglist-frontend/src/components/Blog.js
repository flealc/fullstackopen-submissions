import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog}) => {

  const [displayedBlog, setDisplayedBlog] = useState(blog)
  const [visible, setVisible] = useState(false)
  
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const buttonLabel = visible ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    
    const likedBlog = {
      user: blog.user.id,
      likes: displayedBlog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    try {
      const updatedBlog= await blogService.update(likedBlog, blog.id)
      setDisplayedBlog(updatedBlog)
    } catch (exception) {
       console.log(exception.response.data.error)
    }
    }
  
  const showWhenVisible = { display: visible ? '' : 'none' }
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>likes {displayedBlog.likes} <button onClick={handleLike}>like</button></div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  )
  }

export default Blog
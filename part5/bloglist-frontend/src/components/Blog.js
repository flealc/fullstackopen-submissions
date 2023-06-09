import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {


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
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    await updateBlog(likedBlog, blog.id)
  }

  const handleDelete = async () => {
    await deleteBlog(blog)
  }

  const showWhenVisible = { display: visible ? '' : 'none' }
  const blogUser = JSON.parse(localStorage.getItem('loggedUser')).username
  const userIsAuthor = { display: blog.user.username === blogUser ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility} id="detailsButton">{buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="blogDetails">
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
        <div>{blog.user.name}</div>
        <div style={userIsAuthor}><button id="removeButton" onClick={handleDelete}>remove</button></div>
      </div>
    </div>
  )
}

export default Blog
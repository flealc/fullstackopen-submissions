import { createSlice } from "@reduxjs/toolkit"
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const id = action.payload.id
      return state.map(blog => blog.id === id ? action.payload : blog)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },
    commentBlog(state, action) {
      const blog_id = action.payload.blog
      const comment = {
        content: action.payload.content,
        id: action.payload.id
      }
      return state.map(blog => blog.id === blog_id 
        ? {...blog, comments: blog.comments.concat(comment)} 
        : blog)
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = content => {
  return async dispatch => {
    const blogToUpdate = {...content, likes: content.likes + 1, user: content.user.id}
    const updatedBlog = await blogService.update(blogToUpdate)
    dispatch(updateBlog(updatedBlog))
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export const addComment = (comment, id) => {
  return async dispatch => {
   const newComment = await blogService.addComment(comment, id)
   dispatch(commentBlog(newComment))
  }
}

export const { setBlogs, appendBlog, updateBlog, removeBlog, commentBlog } = blogSlice.actions

export default blogSlice.reducer
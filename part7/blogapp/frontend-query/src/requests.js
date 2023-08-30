import axios from 'axios'
import storageService from "./services/storage"

const baseUrl = 'http://localhost:3000/api/blogs'

const headers = {
  Authorization: storageService.loadUser()
    ? `Bearer ${storageService.loadUser().token}`
    : null,
}

export const getBlogs = () => 
  axios.get(baseUrl).then(res => res.data)

export const createNewBlog = newBlog =>
  axios.post(baseUrl, newBlog, { headers }).then(res => res.data)
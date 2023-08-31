import axios from 'axios'
import storageService from "./services/storage"

const baseUrl = '/api/blogs'

const getHeaders = () => {
  const user = storageService.loadUser();
  return {
    Authorization: user ? `Bearer ${user.token}` : null,
  }
}


export const getBlogs = () => 
   axios.get(baseUrl).then(res => res.data)


export const createNewBlog = newBlog => {
  const headers = getHeaders()
  return axios.post(baseUrl, newBlog, { headers }).then(res => res.data)
}
export const updateBlog = blogToUpdate => {
  const headers = getHeaders()
  return axios.put(`${baseUrl}/${blogToUpdate.id}`, blogToUpdate, { headers })
       .then(res => res.data) 
}

export const removeBlog = id => {
  const headers = getHeaders()
  return axios.delete(`${baseUrl}/${id}`, { headers }).then(res => id)
}
  
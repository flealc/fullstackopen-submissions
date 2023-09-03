import axios from "axios"
import storageService from "../services/storage"
const baseUrl = "/api/blogs"

const getHeaders = () => {
  const user = storageService.loadUser();
  return {
    Authorization: user ? `Bearer ${user.token}` : null,
  }
}


const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (object) => {
  const headers = getHeaders()
  const request = await axios.post(baseUrl, object, { headers })
  return request.data
}

const update = async (object) => {
  const headers = getHeaders()
  const request = await axios.put(`${baseUrl}/${object.id}`, object, {
    headers,
  })
  return request.data
}

const remove = async (id) => {
  const headers = getHeaders()
  await axios.delete(`${baseUrl}/${id}`, { headers })
}

const addComment = async (comment, id) => {
  const headers = getHeaders()
  const request = await axios.post(`${baseUrl}/${id}/comments`, comment, { headers })
  return request.data
}
export default { getAll, create, update, remove, addComment }

import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null
let config

const setToken = newToken => {
  token = `bearer ${newToken}`
  config = {
    headers: {Authorization: token}
  }
}

const getAll = async () => {

  const response = await axios.get(baseUrl, config)

  return  response.data
}

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, config)
  
  return response.data
}

const update = async (blog, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog, config)

  return response.data
}

const remove = async (blog, id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config)

  return response.data
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create, update, remove }
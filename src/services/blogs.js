import axios from 'axios'
const baseUrl = '/api/blogs'

let token = '' // Define the token variable

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const url = `${baseUrl}/${updatedBlog.id}`
  const response = await axios.put(url, updatedBlog, config)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}
const remove = async (blogid) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${blogid}`, config)
}
export default { getAll, create, update, setToken, remove }



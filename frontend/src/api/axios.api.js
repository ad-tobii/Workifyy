import axios from 'axios'

const api = axios.create({
  baseUrl: process.env.REACT_APP_API_URL,
  withCredentials: true,
})

export default api

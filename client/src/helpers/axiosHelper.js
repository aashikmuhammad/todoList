import axios from 'axios';

const app = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

app.interceptors.response.use(
    response => (response),
    error => (Promise.reject(error?.response?.data?.err))
)

export default app;
import axios from 'axios'
const instance = axios.create({
    baseURL: 'https://server-test-dunks-projects.vercel.app/api'
})
// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        try {
            const localStorage = window.localStorage.getItem('persist:shop/admin')

            if (localStorage) {
                const parsedStorage = JSON.parse(localStorage)
                const { token } = parsedStorage
                console.log('token nè', token)
                if (token && token !== '') {
                    config.headers.Authorization = `Bearer ${token}`
                } else {
                    console.warn('Token is missing or empty.')
                }
            } else {
                console.warn('Local storage is empty or the "persist:shop/admin" key is missing.')
            }
        } catch (error) {
            console.error('Error parsing local storage or assigning token:', error)
        }

        return config
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error)
    }
)

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return error.response.data
    }
)

export default instance

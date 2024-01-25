import axios from 'axios'


const APIKit = axios.create({
    // baseURL: "https://api-kings.vercel.app",
    baseURL: "http://192.168.1.41:3000",
})

export default APIKit;
import axios from 'axios'
import baseaddress from './baseAddress'
const APIKit = axios.create({
    // baseURL: "https://api-kings.vercel.app",
    baseURL: baseaddress,
})

export default APIKit;
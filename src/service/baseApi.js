import axios from 'axios'
import baseAddress from './baseAddress';
const APIKit = axios.create({
    // baseURL: "https://api-kings.vercel.app",
    baseURL: baseAddress,
})

export default APIKit;
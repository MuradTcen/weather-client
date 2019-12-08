import axios from 'axios'

export const AXIOS = axios.create({
    baseURL: `https://thewhear.herokuapp.com`,
    headers: {
        'Access-Control-Allow-Origin': 'https://thewhear.herokuapp.com'
    }
})
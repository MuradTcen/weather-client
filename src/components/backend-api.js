import {AXIOS} from '../http-commons'

// const AXIOS = axios.create({
//     baseURL: `/`,
//     timeout: 1000
// });


export default {
    getWheather(provider, latitude, longitude) {
        return AXIOS.get(`/wheather-by-provider-lat-lon`, {
            params: {
                provider:provider,
                lat:latitude,
                lon:longitude
            }
        });
    },
    getCoordinates(location) {
        return AXIOS.get(`/coordinates-by-name`,{
                params : {
                    name: location
                },
            });
    }
}
import Vue from 'vue'
import Vuex from 'vuex'
import api from './components/backend-api'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        longitude: null,
        latitude: null,
        location: null,
        temp: null,
        humidity: null,
        windSpeed: null,
        windDirection: null
    },
    mutations: {
        location_success(state, payload){
            state.latitude = payload.latitude;
            state.longitude = payload.longitude;
            state.location = payload.location;
        },
        weather_success(state, payload){
            state.temp = payload.temp;
            state.humidity = payload.humidity;
            state.windSpeed = payload.windSpeed;
            state.windDirection = payload.windDirection;
        }
    },
    actions: {
        location({commit}, {location}) {
            return new Promise((resolve, reject) => {
                console.log("Location: '" + location + "'");
                api.getCoordinates(location)
                    .then(response => {
                        console.log("Response: '" + JSON.stringify(response.data) + "' with Statuscode " + response.status);
                        if(response.status == 200) {
                            commit('location_success', {
                                latitude: response.data.latitude,
                                longitude: response.data.longitude,
                                location: response.data.name,
                            });
                        }
                        resolve(response)
                    })
                    .catch(error => {
                        console.log("Error: " + error);
                    })
            })
        },
        weather({commit}, {provider, latitude, longitude}) {
            return new Promise((resolve, reject) => {
                console.log(provider, latitude, longitude);
                api.getWheather(provider, latitude, longitude)
                    .then(response => {
                        console.log("Response: '" + JSON.stringify(response.data) + "' with Statuscode " + response.status);
                        if(response.status == 200) {
                            commit('weather_success', {
                                temp: response.data.temp,
                                humidity: response.data.humidity,
                                windSpeed: response.data.windSpeed,
                                windDirection: response.data.windDirection,
                            });
                        }
                        resolve(response)
                    })
                    .catch(error => {
                        console.log("Error: " + error);
                    })
            })
        },
    },
    getters: {
        getLatitude: state => state.latitude,
        getLongitude: state => state.longitude,
        getLocation: state => state.location,
        getTemp: state => state.temp,
        getHumidity: state => state.humidity,
        getWindSpeed: state => state.windSpeed,
        getWindDir: state => state.windDirection
    }
})
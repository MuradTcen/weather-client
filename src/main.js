import Vue from 'vue'
import VueRouter from 'vue-router'
import App from "./App"
import store from './store'
var VueCookie = require('vue-cookie');


Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueCookie);

const routes = [
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
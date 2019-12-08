<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/Weather.vue'
import {AXIOS} from './http-commons'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  async created () {
    try {
      const response = await AXIOS.get('/coordinates-by-name?name=Екатеринбург')
      this.authors = response.data
      this.isLoading = false
    } catch(e) {
      // handle authentication error here
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

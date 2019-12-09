<template>
    <div class="hello">
            <select v-model="selectedProvider">
                <option v-for="(item, key) in providers" :value="key">
                    {{item}}
                </option>
            </select>
            <br>
            <br>

            <select v-model="selectedLocation">
                <option v-for="(item, key) in locations" :value="key">
                    {{item}}
                </option>
            </select>
            <br>
            <br>

        <form @submit.prevent="callSimpleQuery()">
            <button type="submit" class="btn btn-success">Отправить запрос</button><!---->
            <br>
            <br>
        </form>
            <h4>Location: {{ this.$store.getters.getLocation }}</h4>
            <h4>Temperature: {{ this.$store.getters.getTemp }}</h4>
            <h4>Humidity: {{ this.$store.getters.getHumidity }}%</h4>
            <h4>Wind Speed: {{ this.$store.getters.getWindSpeed }}</h4>
            <h4>Wind Direction: {{ this.$store.getters.getWindDir }}</h4>
        </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
      async created () {
          try {
              this.selectedLocation = this.$cookie.get('location');
              this.selectedProvider = this.$cookie.get('weatherProvider');
          } catch(e) {
              // handle authentication error here
          }
      },

      async updated() {
          this.$cookie.set('location', this.selectedLocation);
          this.$cookie.set('weatherProvider', this.selectedProvider);
      },

    data () {
      return {
        location: 'Магнитогорск',
        weatherProvider: 'yandex',
        selectedProvider: 'yandex',
          //todo сделать списка из роута бэка
        providers: {
         "yandex": "yandex",
         "unlocked": "unlocked",
         "dark-sky": "dark-sky"
      },
          selectedLocation: 'Екатеринбург',
          locations: {
              "Екатеринбург": "Екатеринбург",
              "Магнитогорск": "Магнитогорск",
              "Москва": "Москва"
          }
      }
    },
    methods: {
      callSimpleQuery() {
          this.$store.dispatch("location", { location: this.selectedLocation})
              .then(() => {
                  console.log(
                      this.$store.getters.getLatitude,
                      this.$store.getters.getLongitude,
                      this.$store.getters.getLocation
                  );
              })
              .catch(error => {
              })

          this.$store.dispatch("weather", {
              provider: this.selectedProvider,
              latitude: this.$store.getters.getLatitude,
              longitude: this.$store.getters.getLongitude
          })
              .then(() => {
                  console.log("Out",this.$store.getters.getTemp, this.$store.getters.getHumidity,
                      this.$store.getters.getWindSpeed,this.$store.getters.getWindDir);
              })
              .catch(error => {
              })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>

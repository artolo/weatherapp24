<template>
  <div class="weatherapp">
    <header>
      <weatherapp-header :small-size="false"/>
    </header>
    <main>
      <div class="weatherapp__text">
        Check the weather! Enter the city name, or <b>leave empty for geolocation</b>
      </div>
      <div class="weatherapp__places">
        <VueGooglePlaces
          :api-key="'AIzaSyB_DBJcX1L9inF5_grYupjuWmjVQ0SkYtM'"
          class="weatherapp__places_google"
          :enable-geolocation="true"
          types="(cities)"
          v-model="value"
          :version="'3.40'"
          :enableGeocode="true"
          :auto-complete="true"
          onfocus="value = ''"
        />
        <button type="button" @click="setValue"><p>CHECK</p></button>
      </div>
      <component-simple-notifications
        :date="weatherDate"
        :descriptions="weatherDescription"
        :location="weatherCityName"
        :temperature="weatherTemp"
        :country="weatherCityCountry"
        :value="value"
      />
    </main>
  </div>
</template>

<script>
import { VueGooglePlaces } from 'vue-google-places'
import weatherappHeader from '@/components/layout/weatherappHeader.vue'
import ComponentSimpleNotifications from '@/components/shared/componentSimpleNotifications'

export default {
  name: 'weather-app',
  components: {
    ComponentSimpleNotifications,
    weatherappHeader,
    VueGooglePlaces

  },
  data () {
    return {
      value: ''
    }
  },
  computed: {
    weatherCityName () {
      return this.$store.getters.getOpenWeatherMapCityName
    },
    weatherCityCountry () {
      return this.$store.getters.getOpenWeatherMapCityCountry
    },
    weatherDescription () {
      return this.$store.getters.getOpenWeatherMapDescription
    },
    weatherDate () {
      return this.$store.getters.getOpenWeatherMapDate
    },
    weatherTemp () {
      return this.$store.getters.getOpenWeatherMapTemp
    }
  },
  methods: {
    setValue: function () {
      const location = this.value
      return this.$store.dispatch('openWeatherMapGet', { location: location })
    }
  },
  created () {
    setTimeout(() => {
      this.setValue()
    }, 1000)
  }
}
</script>
<style lang="scss">
  @import "~@/assets/scss/views/_weatherapp.scss";
</style>

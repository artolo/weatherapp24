<template>
  <div class="weatherapp__more">
    <header>
      <weatherapp-header :small-size="true"/>
    </header>
    <section>
    <div class="weatherapp__more_place">
      <div class="weatherapp__more_place_date">
        <h1>Date:</h1>
        <p>{{ weatherTime }}</p>
      </div>
      <div class="weatherapp__more_place_location">
        <h1>Location:</h1>
        <p>{{weatherName}}, {{ weatherCountry }}</p>
      </div>
    </div>
    </section>
    <section>
      <component-table-notifications
      :items="weatherList"/>
    </section>
  </div>
</template>
<script>
import weatherappHeader from '@/components/layout/weatherappHeader.vue'
import ComponentTableNotifications from '@/components/shared/componentTableNotifications'
export default {
  name: 'weather-app',
  components: {
    ComponentTableNotifications,
    weatherappHeader
  },
  computed: {
    weatherName () {
      return this.$store.getters.getOpenWeatherMapCityName
    },
    weatherCountry () {
      return this.$store.getters.getOpenWeatherMapCityCountry
    },
    weatherTime () {
      return this.$store.getters.getOpenWeatherMapDate
    },
    weatherList () {
      return this.$store.getters.getOpenWeatherMapListList
    }
  },
  methods: {
    getWeatherMap: function () {
      this.$store.dispatch('openWeatherMapGet', { location: this.$route.params.place })
    }
  },
  created () {
    setTimeout(() => {
      this.getWeatherMap()
    }, 1000)
  }
}
</script>
<style lang="scss">
  @import "~@/assets/scss/views/_weatherappmore.scss";
</style>

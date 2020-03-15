<template>
  <div class="weatherapp__header">
    <div :class="!smallSize ? 'weatherapp__header_box' : 'weatherapp__header_box--small'">
      <img
        :class="!smallSize ? 'weatherapp__header_box_logo' : 'weatherapp__header_box_logo--small'"
        src="../../assets/img/weather_logo.png"
        alt="logo"
      >
      <h2>{{ weatherApp }}</h2><h1>{{ hours }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'weatherapp-header',
  data () {
    return {
      weatherApp: 'WeatherApp',
      hours: '24'
    }
  },
  props: {
    smallSize: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss">
  @import "~@/assets/scss/layout/_weatherappheader.scss";
</style>

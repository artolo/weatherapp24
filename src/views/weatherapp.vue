<template>
  <div class="weatherapp">
    <img
      class="weatherapp__background"
      src="../assets/img/weather_background.jpg"
      alt="background"
    >
    <header>
      <weatherapp-header :small-size="false"/>
    </header>
    <main>
      <div class="weatherapp__main">
      </div>
    </main>
    <footer>
      <weatherapp-footer/>
    </footer>
  </div>
</template>

<script>
import weatherappFooter from '@/components/weatherappFooter.vue'
import weatherappHeader from '@/components/weatherappHeader.vue'

export default {
  name: 'weather-app',
  components: {
    weatherappFooter,
    weatherappHeader
  }
}
</script>
<style lang="scss">
  @import "~@/assets/scss/views/_weatherapp.scss";
</style>

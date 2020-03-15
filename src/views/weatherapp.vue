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
      <component-simple-notifications
        :date="'15.03.2020'"
        :descriptions="'Sunny'"
        :location="'Częstochowa, PL'"
        :temperature="'29'"
      />
    </main>
    <footer>
      <weatherapp-footer/>
    </footer>
  </div>
</template>

<script>
import weatherappFooter from '@/components/layout/weatherappFooter.vue'
import weatherappHeader from '@/components/layout/weatherappHeader.vue'
import ComponentSimpleNotifications from '@/components/shared/componentSimpleNotifications'

export default {
  name: 'weather-app',
  components: {
    ComponentSimpleNotifications,
    weatherappFooter,
    weatherappHeader
  }
}
</script>
<style lang="scss">
  @import "~@/assets/scss/views/_weatherapp.scss";
</style>

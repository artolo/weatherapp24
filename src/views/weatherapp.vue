<template>
  <div class="weatherapp">
    <component-background/>
    <header>
      <weatherapp-header :small-size="false"/>
    </header>
    <main>
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
        <button type="button"><p>CHECK</p></button>
      </div>
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
import { VueGooglePlaces } from 'vue-google-places'
import weatherappFooter from '@/components/layout/weatherappFooter.vue'
import weatherappHeader from '@/components/layout/weatherappHeader.vue'
import ComponentSimpleNotifications from '@/components/shared/componentSimpleNotifications'
import ComponentBackground from '@/components/shared/componentBackground'

export default {
  name: 'weather-app',
  components: {
    ComponentBackground,
    ComponentSimpleNotifications,
    weatherappFooter,
    weatherappHeader,
    VueGooglePlaces
  },
  data () {
    return {
      value: ''
    }
  }
}
</script>
<style lang="scss">
  @import "~@/assets/scss/views/_weatherapp.scss";
</style>

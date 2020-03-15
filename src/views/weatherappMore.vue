<template>
  <div class="weatherapp__more">
    <header>
      <weatherapp-header :small-size="true"/>
    </header>
    <section>
    <div class="weatherapp__more_place">
      <div class="weatherapp__more_place_date">
        <h1>Date:</h1>
        <p>22.05.2020</p>
      </div>
      <div class="weatherapp__more_place_location">
        <h1>Location:</h1>
        <p>Poznań</p>
      </div>
    </div>
    </section>
    <section>
      <component-table-notifications
        :date="'data'"
        :descriptions="'data'"
        :temperature="'data'"
      />
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
  goBack () {
    this.$router.push('/')
  }
}
</script>
<style lang="scss">
  @import "~@/assets/scss/views/_weatherappmore.scss";
</style>

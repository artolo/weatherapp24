<template>
  <div class="weatherapp__header">
    <div :class="!smallSize ? 'weatherapp__header_box' : 'weatherapp__header_box--small'">
      <img
        :class="!smallSize ? 'weatherapp__header_box_logo' : 'weatherapp__header_box_logo--small'"
        src="../../assets/img/weather_logo.png"
        alt="logo"
        @click="goBack"
      >
      <h2 @click="goBack">{{ weatherApp }}</h2>
      <h1 @click="goBack">{{ hours }}</h1>
    </div>
    <div class="weatherapp__header_button">
      <component-button
        v-if="visible"
        :name="name"
        :route="route"
        :small="smallButton"
      />
    </div>
  </div>
</template>

<script>
import ComponentButton from '@/components/shared/componentButton'
export default {
  name: 'weatherapp-header',
  components: { ComponentButton },
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
    },
    visible: {
      type: Boolean,
      required: true
    },
    route: {
      type: String,
      default: 'Home'
    },
    name: {
      type: String
    },
    smallButton: {
      type: Boolean
    }
  },
  methods: {
    goBack () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
  @import "~@/assets/scss/layout/_weatherappheader.scss";
</style>

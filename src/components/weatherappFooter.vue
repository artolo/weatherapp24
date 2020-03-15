<template>
  <div class="weatherapp__footer">
    <div class="weatherapp__footer_create">{{ createdBy }}</div>
    <div class="weatherapp__footer_artolo">{{ artolo }}</div>
  </div>
</template>

<script>
export default {
  name: 'weatherapp-footer',
  data () {
    return {
      createdBy: 'created by © 2020',
      artolo: '"Artolo" Bartosz Brącel'
    }
  }
}
</script>

<style lang="scss">
  @import "~@/assets/scss/shared/_weatherappfooter.scss";
</style>

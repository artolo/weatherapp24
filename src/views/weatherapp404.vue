<template>
<div class="weatherapp__404">
  <div class="weatherapp__404_text">
    <h1>404</h1>
    <p>PAGE NOT FOUND</p>
    <component-button :name="'Go back'" :route="'Home'"/>
  </div>
</div>
</template>

<script>

import ComponentButton from '@/components/shared/componentButton'
export default {
  name: 'weather-app-404',
  components: { ComponentButton }
}
</script>
<style lang="scss">
  @import "~@/assets/scss/views/_weatherapp404.scss";
</style>

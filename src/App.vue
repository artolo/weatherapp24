<template>
  <div id="app">
    <div id="app__container">
      <component-background/>
      <router-view/>
      <footer>
        <weatherapp-footer/>
      </footer>
    </div>
  </div>
</template>

<script>
import ComponentBackground from '@/components/shared/componentBackground'
import weatherappFooter from '@/components/layout/weatherappFooter.vue'

export default {
  name: 'app',
  components: {
    ComponentBackground,
    weatherappFooter
  }
}
</script>
<style lang="scss">
  @import "~@/assets/scss/_app.scss";
</style>

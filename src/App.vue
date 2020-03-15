<template>
  <div id="app">
    <div id="app__container">
      <component-background/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import ComponentBackground from '@/components/shared/componentBackground'
export default {
  name: 'app',
  components: {
    ComponentBackground
  }
}
</script>
<style lang="scss">
  @import "~@/assets/scss/_app.scss";
</style>

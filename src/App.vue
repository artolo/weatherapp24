<template>
  <div id="app">
    <div id="app__container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style lang="scss">
  @import "~@/assets/scss/_app.scss";
</style>

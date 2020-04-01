<template>
  <div class="component__button">
    <button
      :class="!small ? 'component__button_normal' :
      'component__button_normal--small'"
      @click="goBackToPage">
      {{ name }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'component-button',
  props: {
    route: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      default: 'Go back'
    },
    small: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    goBackToPage () {
      this.$router.push({ name: `${this.route}` })
    }
  }
}
</script>

<style lang="scss">
  @import "~@/assets/scss/shared/_componentbutton.scss";
</style>

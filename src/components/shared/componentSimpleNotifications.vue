<template>
<div class="componentsimple__notyfications">
  <div class="componentsimple__notyfications_box">
    <div class="componentsimple__notyfications_box_temperature"><h1>{{ temperature }}</h1><p>&nbsp;&#176;C</p></div>
    <div class="componentsimple__notyfications_box_data">
      <ul>
        <li><h1>Date:</h1> <p>15.03.2020</p></li>
        <li><h1>Location:</h1> <p>Częstochowa, PL</p></li>
        <li><h1>Descriptions:</h1> <p>Sunny</p></li>
      </ul>
    </div>
    <div class="componentsimple__notyfications_box_more">
      <router-link :to="'about'"> MORE </router-link>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'componentSimpleNotifications',
  props: {
    temperature: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    descriptions: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
  @import "~@/assets/scss/shared/_componentsimplenotifications.scss";
</style>

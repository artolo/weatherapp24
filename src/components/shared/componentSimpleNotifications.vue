<template>
<div class="componentsimple__notyfications">
  <div class="componentsimple__notyfications_box">
    <div class="componentsimple__notyfications_box_temperature"><h1>{{ temperature }}</h1><p v-if="temperature">&nbsp;&#176;C</p></div>
    <div class="componentsimple__notyfications_box_data">
      <ul>
        <li><h1>Date:</h1> <p>{{ date }}</p></li>
        <li><h1>Location:</h1> <p>{{ location }}, {{ country }}</p></li>
        <li><h1>Descriptions:</h1> <p>{{ descriptions }}</p></li>
      </ul>
    </div>
    <div class="componentsimple__notyfications_box_more">
      <router-link v-if="value" :to="{ name: 'More', params: { place: value.toLowerCase() } }"> MORE </router-link>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'componentSimpleNotifications',
  props: {
    value: {
      type: String,
      required: true
    },
    temperature: {
      type: [Number, String],
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
    },
    country: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
  @import "~@/assets/scss/shared/_componentsimplenotifications.scss";
</style>

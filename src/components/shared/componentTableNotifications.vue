<template>
  <div class="componenttable__notifications">
    <div class="componenttable__notifications_table">
      <table>
        <tr>
          <td><h1>Hour</h1></td>
          <td><h1>Temperature</h1></td>
          <td><h1>Description</h1></td>
        </tr>
      </table>
      <div
        class="componenttable__notifications_table_box"
        v-for="(item, index) in items"
        :key="index">
        <div class="componenttable__notifications_table_box_hour">{{ JSON.parse(JSON.stringify(item.dt_txt.substr(10, 6))) }}</div>
        <div class="componenttable__notifications_table_box_temperature">{{Math.round(item.main.temp - 273.15)}} &#176;C</div>
        <div class="componenttable__notifications_table_box_description">{{ item.weather.map(obj => obj.description).toString() }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'componentTableNotifications',
  data () {
    return {
      dt_txt: '',
      weather: '',
      temp: ''
    }
  },
  props: {
    items: {
      type: [Array],
      required: true
    }
  },
  computed: {
    temperature () {
      const time = this.item.main.temp
      return Math.round(time - 273.15)
    },
    name () {
      return this.item
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
  @import "~@/assets/scss/shared/_componenttablenotifications.scss";
</style>

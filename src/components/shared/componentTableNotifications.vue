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
      <div class="componenttable__notifications_table_box">
        <div class="componenttable__notifications_table_box_hour">detal</div>
        <div class="componenttable__notifications_table_box_temperature">detal &#176;C</div>
        <div class="componenttable__notifications_table_box_description">detal</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'componentTableNotifications',
  props: {
    descriptions: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    temperature: {
      type: [Number, String],
      required: true
    }
  }
}
</script>

<style lang="scss">
  @import "~@/assets/scss/shared/_componenttablenotifications.scss";
</style>

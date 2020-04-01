import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuetify from 'vuetify/lib'
import { VuetifyGooglePlaces } from './googlePlaces'

Vue.use(Vuetify)
Vue.use(VueAxios, axios)
Vue.use(VuetifyGooglePlaces)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  Vuetify,
  render: h => h(App)
}).$mount('#app')

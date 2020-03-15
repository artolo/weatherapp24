import Vue from 'vue'
import Vuex from 'vuex'
import OpenWeatherMap from '@/store/openWeatherMap'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    OpenWeatherMap
  }
})

export default store

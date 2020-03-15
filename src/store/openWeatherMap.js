import axios from 'axios'

const openWeatherMap = {
  state: {
    data: {
      city: {
        id: '',
        name: '',
        country: ''
      },
      list: []
    }
  },
  getters: {
    getOpenWeatherMapCityName: state => {
      return state.data.city.name
    },
    getOpenWeatherMapCityCountry: state => {
      return state.data.city.country
    },
    getOpenWeatherMapDescription: state => {
      const descriptions = state.data.list
      const item = []
      for (let i = 0; i < descriptions.length; i++) {
        item[0] = descriptions[0].weather.map(obj => obj.description)
      }
      return item.toString()
    },
    getOpenWeatherMapDate: state => {
      const time = state.data.list
      const item = []
      for (let i = 0; i < time.length; i++) {
        item[0] = time[0].dt_txt.substr(0, 10)
      }
      return item.toString()
    },
    getOpenWeatherMapTemp: state => {
      const temp = state.data.list
      const item = []
      for (let i = 0; i < temp.length; i++) {
        item[0] = temp[0].main.temp - 273.15
      }
      return Math.round((item))
    },
    getOpenWeatherMapListList: state => {
      const list = state.data.list
      const items = []
      for (let i = 0; i < 8; i++) {
        items[i] = list[i]
      }
      return items
    }
  },
  mutations: {
    OPEN_WEATHER_MAP_SET (state, payload) {
      state.data = payload
    },
    OPEN_WEATHER_MAP_CLEAR (state) {
      state.data = {
        city: {
          id: '',
          name: '',
          country: ''
        },
        list: []
      }
    }
  },
  actions: {
    openWeatherMapGet (context, data) {
      context.commit('OPEN_WEATHER_MAP_CLEAR')
      const api = 'https://api.openweathermap.org/data/2.5/'
      const key = '064dc8bc6a7869f2154d3341be4ca0d4'
      const location = data.location
      axios({
        method: 'get',
        url: `${api}forecast?q=${location}&appid=${key}`
      }).then(response => {
        context.commit('OPEN_WEATHER_MAP_SET', response.data)
      }).catch(() => {
      })
    }
  }
}

export default openWeatherMap

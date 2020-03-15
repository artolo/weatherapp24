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
    getOpenWeatherMap: state => {
      return state.data
    },
    getOpenWeatherMapCityName: state => {
      return state.data.city.name
    },
    getOpenWeatherMapCityCountry: state => {
      return state.data.city.country
    },
    getOpenWeatherMapListDescription: state => {
      const descriptions = state.data.list
      const item = []
      for (let i = 0; i < descriptions.length; i++) {
        item[0] = descriptions[0].weather.map(obj => obj.description)
      }
      return item.toString()
    },
    getOpenWeatherMapListDate: state => {
      const time = state.data.list
      const item = []
      for (let i = 0; i < time.length; i++) {
        item[0] = time[0].dt_txt.substr(0, 10)
      }
      return item.toString()
    },
    getOpenWeatherMapListTemp: state => {
      const temp = state.data.list
      const item = []
      for (let i = 0; i < temp.length; i++) {
        item[0] = temp[0].main.temp - 273.15
      }
      return Math.round((item).toString())
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
      const key = '8782c824e210ad8d387bcfdabb3c860c'
      const location = data.location
      axios({
        method: 'get',
        url: `${api}forecast?q=${location}&appid=${key}`
      }).then(response => {
        context.commit('OPEN_WEATHER_MAP_SET', response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}

export default openWeatherMap

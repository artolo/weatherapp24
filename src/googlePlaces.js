import loadJS from 'load-js'
import { VTextField } from 'vuetify/lib'

let loadModulePromise
const loadModule = function (options) {
  if (Object.prototype.hasOwnProperty.call(window, 'google')) {
    return Promise.resolve()
  }
  const opt = Object.assign({
    libraries: 'places'
  }, options)
  const parameters = Object.keys(opt)
    .map(function (key) { return ((encodeURIComponent(key)) + '=' + (encodeURIComponent(opt[key]))) })
    .join('&')
  const url = 'https://maps.googleapis.com/maps/api/js?' + parameters
  return loadJS(url).catch(function (e) {
    loadModulePromise = null
  })
}

const GooglePlaces = {
  props: {
    apiKey: String,
    country: String,
    enableGeolocation: Boolean,
    enableGeocode: Boolean,
    value: String,
    version: String,
    types: [String, Array],
    addressFields: Object
  },
  data: function data () {
    return {
      geolocateSet: false,
      prepared: false,
      textValue: '',
      currentPlace: null,
      enterPressListener: null,
      hasDownBeenPressed: false
    }
  },
  computed: {
    getAppendIcon: function getAppendIcon () {
      return this.currentPlace ? 'close' : this.appendIcon
    }
  },
  watch: {
    country: function country (newVal) {
      if (newVal && this.autocomplete) {
        this.autocomplete.componentRestrictions.country = newVal
      }
    },

    types: function types (newVal) {
      if (newVal) {
        var types = Array.isArray(newVal) ? newVal : [newVal]
        this.autocomplete.setTypes(types)
      }
    }
  },
  created: function created () {
    // STUB for vue2-google-maps and vue-google-places work together
    if (typeof this.$gmapApiPromiseLazy === 'function') {
      loadModulePromise = this.$gmapApiPromiseLazy()
    } else {
      loadModulePromise = loadModulePromise || loadModule({
        key: this.apiKey,
        v: this.version
      })
    }
    this.parsedAddressFields = Object.assign({
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      administrative_area_level_2: 'short_name',
      administrative_area_level_3: 'short_name',
      postal_code: 'short_name'
    }, this.addressFields)
  },
  mounted: function mounted () {
    var this$1 = this

    loadModulePromise.then(function () {
      this$1.setupGoogle()
    })
  },
  methods: {
    enableEnterKey: function enableEnterKey (input) {
      const _addEventListener = input.addEventListener

      const addEventListenerWrapper = function (type, listener) {
        if (type === 'keydown') {
          const _listener = listener
          listener = function (event) {
            // eslint-disable-next-line camelcase
            const suggestion_selected = document.getElementsByClassName('pac-item-selected').length > 0
            // eslint-disable-next-line camelcase
            if (event.which === 13 && !suggestion_selected) {
              const e = JSON.parse(JSON.stringify(event))
              e.which = 40
              e.keyCode = 40
              console.log('e', e)
              _listener.apply(input, [e])
            }
            _listener.apply(input, [event])
          }
        }
        _addEventListener.apply(input, [type, listener])
      }

      input.addEventListener = addEventListenerWrapper
    },
    setupInput: function setupInput () {
      const this$1 = this

      this.element.addEventListener('keydown', function (e) {
        if (e.keyCode === 40) {
          this$1.hasDownBeenPressed = true
        }
      })

      this.enterPressListener = window.google.maps.event.addDomListener(this.element, 'keydown', function (e) {
        e.cancelBubble = true
        // If enter key, or tab key
        if (e.keyCode === 13 || e.keyCode === 9) {
          // If user isn't navigating using arrows and this hasn't ran yet
          if (!this$1.hasDownBeenPressed && !e.hasRanOnce) {
            let event = { keyCode: 40, hasRanOnce: true }
            if (window.KeyboardEvent) {
              // eslint-disable-next-line no-const-assign
              event = new window.KeyboardEvent('keydown', event)
            }
            // eslint-disable-next-line no-undef
            google.maps.event.trigger(e.target, 'keydown', event)
          }
        }
      })

      this.element.addEventListener('focus', function () {
        this$1.hasDownBeenPressed = false
      })
    },
    setupGoogle: function setupGoogle () {
      const options = {}

      if (typeof this.types === 'string') {
        options.types = [this.types]
      } else if (Array.isArray(this.types)) {
        options.types = this.types
      }

      if (this.country) {
        options.componentRestrictions = {
          country: this.country
        }
      }

      this.element = this.$el
      // this.element = this.$refs.input.$el || this.$refs.input
      if (this.element.tagName !== 'INPUT') {
        this.element = this.element.querySelector('input')
      }
      if (!this.element) {
        console.warn('Input element was not found in ' + this.component)
        return
      }
      this.autocomplete = new window.google.maps.places.Autocomplete(
        this.element,
        options
      )
      // this.enableEnterKey(this.element)
      this.setupInput()

      this.autocomplete.addListener('place_changed', this.onPlaceChange)
      this.geocoder = new window.google.maps.Geocoder()
      this.geolocate()
    },
    parsePlace: function parsePlace (place) {
      const returnData = {}

      if (place.formatted_address !== undefined) {
        this.textValue = place.formatted_address
        // document.getElementById(this.id).value = place.formatted_address
      }

      if (place.address_components !== undefined) {
        // Get each component of the address from the place details
        for (let i = 0; i < place.address_components.length; i += 1) {
          const addressType = place.address_components[i].types[0]

          if (this.parsedAddressFields[addressType]) {
            const val = place.address_components[i][this.parsedAddressFields[addressType]]
            returnData[addressType] = val
          }
          if (addressType === 'country') {
            returnData.country = place.address_components[i].long_name
            returnData.country_code = place.address_components[i].short_name
          }
        }

        returnData.latitude = place.geometry.location.lat()
        returnData.longitude = place.geometry.location.lng()

        // additional fields available in google places results
        returnData.name = place.name
        returnData.formatted_address = place.formatted_address
        returnData.photos = place.photos
        returnData.place_id = place.place_id
        returnData.place = place
      }
      return returnData
    },
    changePlace: function changePlace (place) {
      this.$emit('placechanged', place)
      this.textValue = place ? this.textValue : ''
      this.$emit('input', this.textValue)
      this.currentPlace = place
    },
    onPlaceChange: function onPlaceChange () {
      this.hasDownBeenPressed = false
      const place = this.autocomplete.getPlace()

      if (!place.geometry) {
        this.$emit('noresult', place)
        return
      }

      const pl = this.parsePlace(place)
      this.changePlace(pl)
    },
    geolocate: function geolocate () {
      const this$1 = this

      if (this.enableGeolocation && !this.geolocateSet) {
        if (!navigator.geolocation) {
          return
        }
        navigator.geolocation.getCurrentPosition(function (position) {
          const geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          const circle = new window.google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
          })
          if (this$1.enableGeocode) {
            this$1.geocoder.geocode({ location: geolocation }, function (results, status) {
              if (status === 'OK' && results.length) {
                this$1.textValue = results[1].formatted_address
                const pl = this$1.parsePlace(results[3])
                this$1.changePlace(pl)
              }
            })
          }
          this$1.autocomplete.setBounds(circle.getBounds())
          this$1.geolocateSet = true
        })
      }
    },
    renderInput: function renderInput (h) {
      return h('input', {
        attrs: Object.assign({}, {
          type: 'text',
          class: 'v-google-places__input',
          value: this.textValue
        },
        this.$attrs)
      })
    }
  },
  render: function render (h) {
    const inputNode = this.$slots.default || [this.renderInput(h)]
    return h('div', {
      class: 'v-google-places'
    }, inputNode)
  },
  beforeDestroy: function beforeDestroy () {
    if (this.enterPressListener) {
      window.google.maps.event.removeListener(this.enterPressListener)
    }
  }
}

const mixin = {
  props: {
    value: String
  },
  data: function data () {
    return {
      val: this.value,
      place: null
    }
  },
  watch: {
    value: function value (value$1) {
      this.val = value$1
    }
  },
  render: function render (h) {
    const this$1 = this

    return h(GooglePlaces, {
      ref: 'gp',
      attrs: this.$attrs,
      on: Object.assign({}, this.$listeners,
        {
          placechanged: function (place) {
            this$1.place = place
            this$1.$emit('placechanged', place)
          },
          input: function (value) {
            this$1.val = value
            this$1.$emit('input', value)
          }
        })
    }, [
      this.renderInput()
    ])
  }
}

const VuetifyGooglePlaces = {
  mixins: [mixin],
  props: {
    searchIcon: {
      type: String,
      default: function () { return 'search' }
    },
    clearIcon: {
      type: String,
      default: function () { return 'close' }
    }
  },
  computed: {
    getAppendIcon: function getAppendIcon () {
      return this.place ? this.clearIcon : this.searchIcon
    }
  },
  methods: {
    renderInput: function renderInput () {
      const this$1 = this

      return this.$createElement(VTextField, {
        attrs: this.$attrs,
        on: {
          'click:append': function () {
            this$1.$refs.gp.changePlace(null)
          }
        },
        props: {
          appendIcon: this.getAppendIcon,
          value: this.val
        }
      })
    }
  }
}

// Import vue component

// install function executed by Vue.use()
function install (Vue) {
  if (install.installed) { return }
  install.installed = true
  Vue.component('VueGooglePlaces', GooglePlaces)
}

// Create module definition for Vue.use()
const plugin = {
  install: install
}

// To auto-install when vue is found
/* global window global */
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

export default plugin
export { GooglePlaces, VuetifyGooglePlaces }

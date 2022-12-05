import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSession from 'vue-session'

axios.defaults.withCredentials = true
Vue.config.productionTip = false
Vue.use(VueAxios, axios);

let sessionOptions = {
    persist: true
}

Vue.use(VueSession, sessionOptions)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

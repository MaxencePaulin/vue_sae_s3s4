import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'

require('@/store/subscriber')

axios.defaults.withCredentials = true
Vue.config.productionTip = false
Vue.use(VueAxios, axios);

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => { // ceci est pour éviter que les éléments apparaisse avant que le token soit chargé ou mis à null
    new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
    }).$mount('#app')
})

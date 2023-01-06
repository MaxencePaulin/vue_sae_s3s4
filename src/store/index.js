import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import artist from './artist'
import feedback from "./feedback"
import concert from './concert'
import ticket from './ticket'
import prestataire from './prestataire'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        auth,
        artist,
        feedback,
        concert,
        ticket,
        prestataire
    }
})

import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        allArtists: null,
    },
    getters: {
        allArtists (state) {
            return state.allArtists
        }
    },
    mutations: {
        SET_ALL_ARTIST (state, allArtists) {
            state.allArtists = allArtists
        }
    },
    actions: {
        async getAllArtists ({ commit }) {
            await Vue.axios.get('http://localhost:3000/artist/')
                .then((response) => {
                    commit('SET_ALL_ARTIST', response.data)
                })
                .catch((e) => {
                    console.log("axios error artists/");
                    console.log(e);
                })
        }
    },
    modules: {
        auth
    }
})

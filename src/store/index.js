import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        allArtists: null,
        artist: null,
    },
    getters: {
        allArtists (state) {
            return state.allArtists
        },
        artist (state) {
            return state.artist
        }
    },
    mutations: {
        SET_ALL_ARTIST (state, allArtists) {
            state.allArtists = allArtists
        },
        SET_ARTIST (state, artist) {
            state.artist = artist
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
        },
        async getArtist ({ commit }, id) {
            await Vue.axios.get('http://localhost:3000/artist/' + id)
                .then((response) => {
                    console.log(response.data);
                    commit('SET_ARTIST', response.data)
                })
                .catch((e) => {
                    console.log("axios error artist/" + id);
                    console.log(e);
                })
        }
    },
    modules: {
        auth
    }
})

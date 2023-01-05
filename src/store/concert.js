import Vue from 'vue'

export default {
    namespaced: true,

    state: {
        allConcerts: null
    },
    getters: {
        allConcerts (state) {
            return state.allConcerts
        }

    },
    mutations: {
        SET_ALL_CONCERTS (state, allConcerts) {
            state.allConcerts = allConcerts
        }
    },
    actions: {
        async getAllConcerts ({ commit }) {
            let response = await Vue.axios.get('http://localhost:3000/concert/')
            console.log(response.data)
            commit('SET_ALL_CONCERTS', response.data)
        }
    }
}
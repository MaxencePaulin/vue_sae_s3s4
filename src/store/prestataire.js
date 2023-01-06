import Vue from 'vue'

export default {
    namespaced: true,

    state: {
        allPrestataires: null,
        prestataire: null,
    },
    getters: {
        allPrestataires (state) {
            return state.allPrestataires
        },
        prestataire (state) {
            return state.prestataire
        },
    },
    mutations: {
        SET_ALL_PRESTATAIRES (state, allPrestataires) {
            state.allPrestataires = allPrestataires
        },
        SET_PRESTATAIRE (state, prestataire) {
            state.prestataire = prestataire
        },
    },
    actions: {
        async getAllPrestataires ({ commit }) {
            let response = await Vue.axios.get('http://localhost:3000/prestataire/')
            commit('SET_ALL_PRESTATAIRES', response.data);
        },
        async getPrestataire ({ commit }, id) {
            let response = await Vue.axios.get(`http://localhost:3000/prestataire/${id}`)
            console.log(response.data)
            commit('SET_PRESTATAIRE', response.data);
        },
    },
}
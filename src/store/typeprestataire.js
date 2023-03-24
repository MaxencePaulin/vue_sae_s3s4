import Vue from 'vue'

export default {
    namespaced: true,

    state: {
        allTypesPrestataire: null
    },
    getters: {
    },
    mutations: {
        SET_ALL_TYPES_PRESTATAIRE (state, allTypesPrestataire) {
            state.allTypesPrestataire = allTypesPrestataire
        },
    },
    actions: {
        async getAllTypesPrestataires ({ commit }) {
            let response = await Vue.axios.get('http://localhost:3000/typeprestataire/')
            if (response.status === 500) {
                return -1;
            }
            await commit('SET_ALL_TYPES_PRESTATAIRE', response.data);
        },
    },
}
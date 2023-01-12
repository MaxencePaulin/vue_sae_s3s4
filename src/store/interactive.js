import Vue from 'vue'

export default {
    namespaced: true,

    state: {
        allScenes: null
    },
    getters: {
        //
    },
    mutations: {
        SET_ALL_SCENES (state, allScenes) {
            state.allScenes = allScenes
        },
    },
    actions: {
        async getAllScenes ({ commit }) {
            let response = await Vue.axios.get('http://localhost:3000/scene/')
            if (response.status === 500) {
                return -1;
            }
            await commit('SET_ALL_SCENES', response.data)
        }
    }
}
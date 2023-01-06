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
            let timestamp =  response.data[0].date_concert;
            let dateFormat = new Date(timestamp );
            console.log("Date: "+ dateFormat.getDate()+
                "/"+(dateFormat.getMonth()+1)+
                "/"+dateFormat.getFullYear()+
                " "+dateFormat.getHours()+
                ":"+dateFormat.getMinutes()+
                ":"+dateFormat.getSeconds());
            commit('SET_ALL_CONCERTS', response.data)
        }
    }
}
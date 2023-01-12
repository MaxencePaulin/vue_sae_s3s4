import Vue from 'vue'

export default {
    namespaced: true,

    state: {
        allTicket: null,
        date_validity_ticket: null,
        currentTicket: null,
    },
    getters: {
        currentTicket (state) {
            return state.currentTicket
        }
    },
    mutations: {
        SET_ALL_TICKET (state, allTicket) {
            state.allTicket = allTicket
        },
        SET_DATE_VALIDITY_TICKET (state, date_validity_ticket) {
            state.date_validity_ticket = date_validity_ticket
        },
        SET_CURRENT_TICKET (state, currentTicket) {
            state.currentTicket = currentTicket
        }
    },
    actions: {
        async getAllTicket ({ commit }) {
            let response = await Vue.axios.get('http://localhost:3000/ticket/')
            if (response.status === 500) {
                console.log("axios error ticket/");
                console.log(response.data.message);
                return -1;
            }
            await commit('SET_ALL_TICKET', response.data);
            response = await Vue.axios.get('http://localhost:3000/datevalidityticket/')
            if (response.status === 500) {
                console.log("axios error date_validity_ticket/");
                console.log(response.data.message);
                return -1;
            }
            await commit('SET_DATE_VALIDITY_TICKET', response.data);
        },
        async getTicket ({ commit }, id) {
            let response = await Vue.axios.get('http://localhost:3000/ticket/' + id)
            if (response.status === 500) {
                console.log("axios error ticket/" + id);
                console.log(response.data.message);
                return -1;
            }
            await commit('SET_CURRENT_TICKET', response.data);
        },
        async buyTicket ({ dispatch }, ticket) {
            let response = await Vue.axios.post('http://localhost:3000/bought/', ticket)
            if (response.status === 500) {
                console.log("axios error ticket/");
                console.log(response.data.message);
                return -1;
            }
            await dispatch('getAllTicket');
        }
    },
}
import Vue from 'vue'

export default {
    namespaced: true,

    state: {
        token: null,
        user: null,
    },

    getters: {
        authenticated (state) {
            return state.token && state.user
        },

        user (state) {
            return state.user
        },

        userTicket (state) {
            return state.user.ticket
        }
    },

    mutations: {
        SET_TOKEN (state, token) {
            state.token = token
        },

        SET_USER (state, data) {
            state.user = data
        },

        SET_TICKET (state, data) {
            state.user.ticket = data
        }
    },

    actions: {
        async signIn ({ dispatch }, credentials) {
            await Vue.axios.post('http://localhost:3000/users/login', credentials)
                .then((response) => {
                    return dispatch('attempt', response.data.data.token)
                })
        },

        async attempt ({ commit, state }, token) {
            if (token) {
                commit('SET_TOKEN', token)
            }

            if (!state.token) {
                return
            }

            await Vue.axios.get('http://localhost:3000/users/me')
                .then((response) => {
                    commit('SET_USER', response.data.data)
                })
                .catch((e) => {
                    commit('SET_TOKEN', null);
                    commit('SET_USER', null);
                    console.log("axiox error users/me");
                    console.log(e);
            })
        },

        signOut ({ commit }) {
            return Vue.axios.post('http://localhost:3000/users/logout')
                .then(() => {
                    commit('SET_TOKEN', null)
                    commit('SET_USER', null)
                }).catch((e) => {
                    console.log("axiox error users/logout");
                    console.log(e);
                });
        },

        async getTicket({ commit }, id) {
            let response = await Vue.axios.get('http://localhost:3000/bought/user/' + id);
            if (response.status === 500) {
                return -1;
            }
            await commit('SET_TICKET', response.data);
        }
    },
}
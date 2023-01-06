import Vue from 'vue'

export default {
    namespaced: true,

    state: {
        allFeedBack: null,
        feedBackFest: null,
    },
    getters: {
    },
    mutations: {
        SET_ALL_FEEDBACK (state, allFeedBack) {
            state.allFeedBack = allFeedBack
        },
        SET_FEEDBACK_FEST (state) {
            state.feedBackFest = state.allFeedBack.filter(feedBack => feedBack.id_artist === null && feedBack.id_prestataire === null)
        }
    },
    actions: {
        async getAllFeedBack ({ commit }) {
            let response = await Vue.axios.get('http://localhost:3000/guest_book/')
            if (response.status === 500) {
                console.log("axios error guest_book/");
                console.log(response.data.message);
                return -1;
            }
            await commit('SET_ALL_FEEDBACK', response.data);
        },
        async addGlobalFeedBack ({ commit }, {id_user, libelle_avis}) {
            let response = await Vue.axios.post('http://localhost:3000/guest_book/', {
                id_user: id_user,
                libelle_avis: libelle_avis
            })
            if (response.status === 500) {
                console.log("axios error guestbook/");
                console.log(response.data.message);
            }
            commit('SET_ALL_FEEDBACK', response.data)
        },
        async deleteGlobalFeedBack ({dispatch}, id_avis) {
            let res = await Vue.axios.delete('http://localhost:3000/guest_book/' + id_avis)
            if (res.status === 500) {
                console.log("axios error guestbook/" + id_avis);
                console.log(res.data.message);
            }
            await dispatch('getAllFeedBack');
        }
    },
}
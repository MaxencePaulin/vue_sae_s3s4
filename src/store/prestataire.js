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
        SET_GUEST_BOOK_PRESTATAIRE (state, guestBookPrestataire) {
            state.prestataire.guestBook = guestBookPrestataire
        }
    },
    actions: {
        async getAllPrestataires ({ commit }) {
            let response = await Vue.axios.get('http://localhost:3000/prestataire/')
            if (response.status === 500) {
                return -1;
            }
            await commit('SET_ALL_PRESTATAIRES', response.data);
        },
        async getPrestataire ({ commit }, id) {
            let response = await Vue.axios.get(`http://localhost:3000/prestataire/${id}`)
            console.log(response.data)
            commit('SET_PRESTATAIRE', response.data);
        },
        async getGuestBookPrestataire ({ commit }, id) {
            let response = await Vue.axios.get('http://localhost:3000/guest_book/one?id_prestataire=' + id)
            if (response.status === 500) {
                console.log("axios error guestbook/one?id_prestataire=" + id);
                console.log(response.data.message);
            }
            await commit('SET_GUEST_BOOK_PRESTATAIRE', response.data);
        },
        async addCommentPrestataire ({ commit }, {id_prestataire, id_user, libelle_avis}) {
            let response = await Vue.axios.post('http://localhost:3000/guest_book/', {
                id_prestataire: id_prestataire,
                id_user: id_user,
                libelle_avis: libelle_avis
            })
            if (response.status === 500) {
                console.log("axios error guestbook/");
                console.log(response.data.message);
            }
            await commit('SET_GUEST_BOOK_ARTIST', response.data)
        },
        async deleteCommentPrestataire ({dispatch},{id_avis, id_prestataire}) {
            let res = await Vue.axios.delete('http://localhost:3000/guest_book/' + id_avis)
            if (res.status === 500) {
                console.log("axios error guestbook/" + id_avis);
                console.log(res.data.message);
            }
            await dispatch('getGuestBookPrestataire', id_prestataire)
        }
    },
}
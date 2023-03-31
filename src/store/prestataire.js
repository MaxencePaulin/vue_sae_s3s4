import Vue from 'vue'

export default {
    namespaced: true,

    state: {
        allPrestataires: null,
        prestataire: null,
        allService: null,
    },
    getters: {
        allPrestataires (state) {
            return state.allPrestataires
        },
        prestataire (state) {
            return state.prestataire
        },
        allServices (state) {
            return state.allService
        }
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
        },
        SET_SERVICE_PRESTATAIRE (state, allServices) {
            state.allService = allServices
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
            await commit('SET_PRESTATAIRE', response.data);
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
            await commit('SET_GUEST_BOOK_PRESTATAIRE', response.data)
        },
        async deleteCommentPrestataire ({dispatch},{id_avis, id_prestataire}) {
            let res = await Vue.axios.delete('http://localhost:3000/guest_book/' + id_avis)
            if (res.status === 500) {
                console.log("axios error guestbook/" + id_avis);
                console.log(res.data.message);
            }
            await dispatch('getGuestBookPrestataire', id_prestataire)
        },
        async deleteServicePrestataire ({dispatch},{id_prestataire, id_service}) {
            let res = await Vue.axios.delete('http://localhost:3000/propose/one?id_prestataire='+ id_prestataire +'&id_service='+id_service)
            if (res.status === 500) {
                console.log("axios error propose/" );
                console.log(res.data.message);
            }
            else {
                console.log("succes")
            }
            await dispatch('getServicePrestataire', id_prestataire)
        },
        async getServicePrestataire ({ commit }) {
            let response = await Vue.axios.get('http://localhost:3000/propose/')
            if (response.status === 500) {
                console.log("axios error propose/");
                console.log(response.data.message);
            }
            console.log(response.data)
            await commit('SET_SERVICE_PRESTATAIRE', response.data)
        },
        async addServicePrestataire ({ commit }, {id_prestataire, libelle_service}) {
            let response = await Vue.axios.post('http://localhost:3000/propose/withnewservice/', {
                id_prestataire: id_prestataire,
                libelle_service: libelle_service
            })
            if (response.status === 500) {
                console.log("axios error service add/");
            }
            console.log(response.data)
            await commit('SET_SERVICE_PRESTATAIRE', response.data)
        },
        async addPrestataire ({ dispatch },  data) {
            let response = await Vue.axios.post('http://localhost:3000/prestataire/', data)
            if (response.status === 500) {
                console.log("axios error prestataire add/");
            }
            await dispatch('getAllPrestataires')
        }
    },
}
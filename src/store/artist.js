import Vue from 'vue'

export default {
    namespaced: true,

    state: {
        allArtists: null,
        artist: null,
    },
    getters: {
        allArtists (state) {
            return state.allArtists
        },
        artist (state) {
            return state.artist
        }
    },
    mutations: {
        SET_ALL_ARTIST (state, allArtists) {
            state.allArtists = allArtists
        },
        SET_ARTIST (state, artist) {
            state.artist = artist
        },
        SET_GUEST_BOOK_ARTIST (state, guestBookArtist) {
            state.artist.guestBook = guestBookArtist
        }
    },
    actions: {
        async getAllArtists ({ commit }) {
            await Vue.axios.get('http://localhost:3000/artist/')
                .then((response) => {
                    commit('SET_ALL_ARTIST', response.data)
                })
                .catch((e) => {
                    console.log("axios error artists/");
                    console.log(e);
                })
        },
        async getArtist ({ commit }, id) {
            await Vue.axios.get('http://localhost:3000/artist/' + id)
                .then((response) => {
                    commit('SET_ARTIST', response.data)
                })
                .catch((e) => {
                    console.log("axios error artist/" + id);
                    console.log(e);
                })
        },
        async getGuestBookArtist ({ commit }, id) {
            await Vue.axios.get('http://localhost:3000/guest_book/one?id_artist=' + id)
                .then((response) => {
                    commit('SET_GUEST_BOOK_ARTIST', response.data)
                })
                .catch((e) => {
                    console.log("axios error guestbook/" + id);
                    console.log(e);
                })
        },
        async addCommentArtist ({ commit }, {id_artist, id_user, libelle_avis}) {
            await Vue.axios.post('http://localhost:3000/guest_book/', {
                id_artist: id_artist,
                id_user: id_user,
                libelle_avis: libelle_avis
            })
                .then((response) => {
                    commit('SET_GUEST_BOOK_ARTIST', response.data)
                })
                .catch((e) => {
                    console.log("axios error guestbook/");
                    console.log(e);
                })
        },
        async deleteCommentArtist ({dispatch},{id_avis, id_artist}) {
            await Vue.axios.delete('http://localhost:3000/guest_book/' + id_avis)
                .then(() => {
                    dispatch('getGuestBookArtist', id_artist)
                })
                .catch((e) => {
                    console.log("axios error guestbook/" + id_avis);
                    console.log(e);
                })
        }
    },
}
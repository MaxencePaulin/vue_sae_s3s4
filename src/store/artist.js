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
            let response = await Vue.axios.get('http://localhost:3000/artist/')
            if (response.status === 500) {
                console.log("axios error artist/");
                console.log(response.data.message);
            }
            await commit('SET_ALL_ARTIST', response.data)
        },
        async getArtist ({ commit }, id) {
            let response = await Vue.axios.get('http://localhost:3000/artist/' + id)
            if (response.status === 500) {
                console.log("axios error artist/" + id);
                console.log(response.data.message);
            }
            await commit('SET_ARTIST', response.data)
        },
        async getGuestBookArtist ({ commit }, id) {
            let response = await Vue.axios.get('http://localhost:3000/guest_book/one?id_artist=' + id)
            if (response.status === 500) {
                console.log("axios error guestbook/one?id_artist=" + id);
                console.log(response.data.message);
            }
            await commit('SET_GUEST_BOOK_ARTIST', response.data);
        },
        async addCommentArtist ({ commit }, {id_artist, id_user, libelle_avis}) {
            let response = await Vue.axios.post('http://localhost:3000/guest_book/', {
                id_artist: id_artist,
                id_user: id_user,
                libelle_avis: libelle_avis
            })
            if (response.status === 500) {
                console.log("axios error guestbook/");
                console.log(response.data.message);
            }
            await commit('SET_GUEST_BOOK_ARTIST', response.data)
        },
        async deleteCommentArtist ({dispatch},{id_avis, id_artist}) {
            let res = await Vue.axios.delete('http://localhost:3000/guest_book/' + id_avis)
            if (res.status === 500) {
                console.log("axios error guestbook/" + id_avis);
                console.log(res.data.message);
            }
            await dispatch('getGuestBookArtist', id_artist)
        }
    },
}
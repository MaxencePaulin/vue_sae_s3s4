<template>
    <v-container fluid style="margin-top: 5vh; margin-bottom: 5vh">
        <v-card>
            <v-card-title>
                <h1>{{ artist.name }}</h1>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-img
                            :src="artist.image"
                            :alt="artist.name"
                            max-width="100%"
                            max-height="100%"
                        ></v-img>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                        <v-card>
                            <v-card-title>
                                <h2>Genre :</h2>
                            </v-card-title>
                            <v-card-text>
                                <p>{{ artist.genre }}</p>
                            </v-card-text>
                            <v-card-title>
                                <h2>Biographie :</h2>
                            </v-card-title>
                            <v-card-text>
                                <p>{{ artist.biography }}</p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-card style="margin: 5vh; background-color:rgb(255,222,89)">
            <v-card-title>
                <h2>Avis</h2>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6" md="4" v-for="comment in guestBook" :key="comment.id_avis">
                        <v-card>
                            <v-card-title>
                                <h3>{{ comment.user.firstname }}</h3>
                            </v-card-title>
                            <v-card-text>
                                <p>{{ comment.libelle_avis }}</p>
                                <v-btn v-if="comment.id_user === currentUser.id_user || currentUser.id_role === 3" @click="confirmDelete(comment.id_avis)">
                                    <v-icon color="red">mdi-delete</v-icon>
                                </v-btn>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <pagination-component :data=artist.guestBook :currentPage="currentPage" :perPage="perPage" :colorcss="colorcss" @page-update="updatePage"></pagination-component>
                <v-spacer></v-spacer>
                <v-btn  color="black" text @click="goToComment">Ajouter un avis</v-btn>
            </v-card-actions>
        </v-card>
<!--        <v-card style="margin: 5vh" v-for="comment in artist.guestBook" :key="comment.id_avis">-->
<!--            <v-card-title>-->
<!--                <h2>{{ comment.user.firstname}}</h2>-->
<!--            </v-card-title>-->
<!--            <v-card-text>-->
<!--                <p>{{ comment.libelle_avis }}</p>-->
<!--            </v-card-text>-->
<!--        </v-card>-->
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PaginationComponent from "@/components/PaginationComponent.vue";
export default {
    name: "ArtistView",
    components: {PaginationComponent},
    data: () => ({
        currentPage: 0,
        perPage: 9,
        colorcss: {
            color: "rgb(50,50,50)"
        },
    }),
    computed: {
        ...mapGetters('artist',['artist']),
        ...mapGetters('auth',['user']),
        guestBook () {
            if (this.artist.guestBook) {
                return this.artist.guestBook.slice(
                    this.currentPage * this.perPage,
                    (this.currentPage + 1) * this.perPage
                );
            }
            return [];
        },
        currentUser () {
            if (this.user) {
                return this.user.id_user;
            }
            return null;
        }
    },
    methods: {
        updatePage(pageNumber) {
            this.currentPage = pageNumber;
        },
        goToComment() {
            this.$router.push({name: 'commentArtist', params: {id: this.artist.id_artist}}).catch(() => {});
        },
        ...mapActions('artist', ['getArtist', 'deleteCommentArtist']),
        confirmDelete(idx) {
            if (confirm('Voulez-vous vraiment supprimer cet avis ?')) {
                this.deleteCommentArtist({id_avis: idx, id_artist: this.artist.id_artist})
                    .then(() => {
                        this.$router.go('/artist/' + this.artist.id_artist);
                    });
            }
        },
    },
}
</script>

<style scoped>

</style>
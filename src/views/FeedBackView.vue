<template>
    <v-container  fluid style="margin-top: 5vh; margin-bottom: 5vh">
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
                                <v-btn v-if="comment.id_user === currentUser?.id_user || currentUser?.id_role === 3" @click="confirmDelete(comment.id_avis)">
                                    <v-icon color="red">mdi-delete</v-icon>
                                </v-btn>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <pagination-component :data=feedBackFest :currentPage="currentPage" :perPage="perPage" :colorcss="colorcss" @page-update="updatePage"></pagination-component>
                <v-spacer></v-spacer>
                <v-btn  color="black" text @click="goToComment">Ajouter un avis</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>

</template>

<script>
import PaginationComponent from "@/components/PaginationComponent.vue";
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    name: "FeedBackView",
    components: {PaginationComponent},
    data: () => ({
        currentPage: 0,
        perPage: 9,
        colorcss: {
            color: "rgb(50,50,50)"
        },
    }),
    computed: {
        ...mapState('feedback', ['feedBackFest']),
        guestBook() {
            return this.feedBackFest.slice(this.currentPage * this.perPage, (this.currentPage * this.perPage) + this.perPage);
        },
        ...mapGetters('auth', ['user']),
        currentUser() {
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
            this.$router.push({name: 'commentFest'}).catch(() => {});
        },
        ...mapActions('feedback', ['deleteGlobalFeedBack']),
        confirmDelete(idx) {
            if (confirm('Voulez-vous vraiment supprimer cet avis ?')) {
                this.deleteGlobalFeedBack(idx)
                    .then(() => {
                        this.$router.go('/feedback');
                    });
            }
        },
    }
}
</script>

<style scoped>

</style>
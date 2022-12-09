<template>
    <v-container>
        <v-card style="margin: 5vh; background-color:rgb(255,222,89)">
            <v-card-title>
                <h2>Ajouter un avis sur {{ artist.name }}</h2>
            </v-card-title>
            <v-card-subtitle>
                <h3>Connecté sur le compte : {{ user.login }}</h3>
            </v-card-subtitle>
            <v-card-text>
                Si vous appuyer sur le bouton "Ajouter", votre avis sera ajouté à la liste des avis de l'artiste avec le nom : {{ user.firstname }}.
            </v-card-text>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-textarea
                        v-model="comment"
                        :counter="500"
                        :rules="commentRules"
                        label="Commentaire"
                        required
                    ></v-textarea>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="black" text @click="addComment">Ajouter</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: "AddCommentView",
    data: () => ({
        valid: true,
        comment: '',
        commentRules: [
            v => !!v || 'Commentaire requis',
            v => (v && v.length <= 500) || 'Le commentaire doit faire moins de 500 caractères',
        ],
    }),
    computed: {
        ...mapGetters('auth', ['user']),
        ...mapGetters('artist', ['artist']),
    },
    methods: {
        ...mapActions('artist', ['addCommentArtist']),
        addComment() {
            if (this.$refs.form.validate()) {
                this.addCommentArtist({
                    id_artist: this.artist.id_artist,
                    id_user: this.user.id_user,
                    libelle_avis: this.comment,
                });
                this.$router.push({ name: 'artistId', params: { id: this.artist.id_artist } });
            }
        },
    },
}
</script>

<style scoped>

</style>
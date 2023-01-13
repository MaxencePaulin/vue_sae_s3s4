<template>
  <v-container>
    <v-card style="margin: 5vh; background-color:rgb(255,222,89)">
      <v-card-title>
        <h2>Ajouter un avis sur {{ prestataire.libelle_prestataire }}</h2>
      </v-card-title>
      <v-card-subtitle>
        <h3>Connecté sur le compte : {{ user.login }}</h3>
      </v-card-subtitle>
      <v-card-text>
        Si vous appuyez sur le bouton "Ajouter", votre avis sera ajouté à la liste des avis du prestataire avec le nom : {{ user.firstname }}.
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
        <v-btn color="black" text @click="addCommentPrest">Ajouter</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "AddCommentViewPrest",
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
    ...mapGetters('prestataire', ['prestataire']),
  },
  methods: {
    ...mapActions('prestataire', ['addCommentPrestataire']),
    async addCommentPrest() {
      if (this.$refs.form.validate()) {
        await this.addCommentPrestataire({
          id_prestataire: this.prestataire.id_prestataire,
          id_user: this.user.id_user,
          libelle_avis: this.comment,
        });
        this.$router.push({ name: 'prestataireId', params: { id: this.prestataire.id_prestataire } });
      }
    },
  },
}
</script>

<style scoped>

</style>
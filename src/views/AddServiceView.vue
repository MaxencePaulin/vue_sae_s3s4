<template>
  <v-container>
    <v-card style="margin: 5vh; background-color:rgb(255,222,89)">
      <v-card-title>
        <h2>Ajouter un service sur {{ prestataire.libelle_prestataire }}</h2>
      </v-card-title>
      <v-card-subtitle>
        <h3>Connecté sur le compte : {{ user.login }}</h3>
      </v-card-subtitle>
      <v-card-text>
        Si vous appuyez sur le bouton "Ajouter", votre service sera ajouté à la liste des services du prestataire {{ prestataire.libelle_prestataire }}.
      </v-card-text>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-textarea
              v-model="service"
              :counter="500"
              :rules="serviceRules"
              label="Service"
              required
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="black" text @click="addService">Ajouter</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "AddServiceView",
  data: () => ({
    valid: true,
    service: '',
    serviceRules: [
      v => !!v || 'Service requis',
      v => (v && v.length <= 500) || 'Le service doit faire moins de 20 caractères',
    ],
  }),
  computed: {
    ...mapGetters('auth', ['user']),
    ...mapGetters('artist', ['artist']),
    ...mapGetters('prestataire', ['prestataire']),
  },
  methods: {
    ...mapActions('prestataire', ['addServicePrestataire','allService']),
    async addService() {
      if (this.$refs.form.validate()) {
        await this.addServicePrestataire({
          id_prestataire: this.prestataire.id_prestataire,
          id_user: this.user.id_user,
          libelle_service: this.service,
        });
        await this.allService(this.prestataire.id_prestataire);
        this.$router.push({ name: 'prestataireId', params: { id: this.prestataire.id_prestataire } });
      }
    }
  },
}
</script>

<style scoped>

</style>
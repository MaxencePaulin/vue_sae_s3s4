<template>
  <v-container fluid style="margin-top: 5vh; margin-bottom: 5vh">
    <v-card>
      <v-card-title>
        <h1>{{ prestataire.libelle_prestataire }}</h1>
      </v-card-title>
      <v-card-text>
            <v-card>
              <v-card-title>
                <h2>Nom  :</h2>
              </v-card-title>
              <v-card-text>
                <p>{{ prestataire.libelle_prestataire }}</p>
              </v-card-text>
              <v-card-title>
                <h2>Type prestataire :</h2>
              </v-card-title>
              <v-card-text>
                <p>{{ prestataire.typeprestataire.libelle_typeprestataire }}</p>
              </v-card-text>
            </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'PrestataireView',
  data: () => ({
    currentPage: 0,
    perPage: 9,
    colorcss: {
      color: "rgb(50,50,50)"
    },
  }),
  computed: {
    ...mapGetters('prestataire',['prestataire']),
  },
  methods: {
    ...mapActions('prestataire', ['getPrestataire']),
  },
}
</script>

<style scoped>

</style>
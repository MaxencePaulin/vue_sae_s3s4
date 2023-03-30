<template>
    <v-container fluid style="margin-top: 10vh; margin-bottom: 10vh">
        <v-row>
            <v-col cols="12" sm="10" md="8" offset-md="2" offset-sm="1">
                <v-card style="background-color: rgb(255,222,89)">
                    <v-card-title>
                        <h1 class="display-2 mx-auto">Ajouter un Prestataire</h1>
                    </v-card-title>
                    <v-card-text>
                        <v-select v-model="selectedId" label="Type de prestataire" :items="allTypesPrestataire"
                            item-text="libelle_typeprestataire" item-value="id_typeprestataire" @change="log">
                        </v-select>
                        <v-select v-model="selectedId" label="Type de service" :items="allServices"
                            item-text="libelle_service" item-value="id_service" @change="log">
                        </v-select>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field v-model="libelle_presta" :rules="libelle_prestaRules" label="Nom du Prestataire"
                                required @keyup.enter="valider">
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="warning" @click="valider">Ajouter</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: "AddPrestataireView",
    data: () => ({
        valid: true,
        service: '',
        libelle_presta: '',
        selectedId: -1,
        serviceRules: [
            v => !!v || 'Service requis'
        ],
        libelle_prestaRules: [
            v => !!v || 'Libelle du prestataire requis'
        ],
    }),
    computed: {
        ...mapState('typeprestataire', ['allTypesPrestataire']), // a ne surtout pas modifier les types directement -> state
        ...mapState('prestataire', ['allServices']),
    },
    methods: {
        ...mapActions('prestataire', ['addPrestataire']), // TODO dans le store prestataire
        valider() {
            if (this.$refs.form.validate()) {
                if (this.selectedId === -1) {
                    alert('Veuillez choisir un type de prestataire');
                    return
                }
                this.addPrestataire({
                    id_typeprestataire: this.selectedId,
                    libelle_typeprestataire: this.libelle_presta,
                }).then(() => {
                    this.$router.push({ name: 'prestataire' });
                }).catch(() => {
                    this.$router.push({ name: '404' });
                });
            }
        },
    }
}
</script>
  
<style scoped></style>
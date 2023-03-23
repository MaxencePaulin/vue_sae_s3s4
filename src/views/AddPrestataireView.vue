<template>
    <v-container fluid style="margin-top: 10vh; margin-bottom: 10vh">
        <v-row>
            <v-col cols="12" sm="10" md="8" offset-md="2" offset-sm="1">
                <v-card style="background-color: rgb(255,222,89)">
                    <v-card-title>
                        <h1 class="display-2 mx-auto">Ajouter un Prestataire</h1>
                    </v-card-title>
                    <v-card-text>
                        <select name="type_presta">
                            <option v-for="type , id in alltype" id=:id >{{ type }}</option>
                        </select>
                        <v-form ref="form" v-model="valide" lazy-validation>
                            <v-text-field v-model="service" :rules="service" label="Service" required
                                @keyup.enter="valider"></v-text-field>
                            <v-text-field v-model="libelle_presta" :rules="service" label="Nom du Prestataire" required
                            @keyup.enter="valider"></v-text-field>
                          
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
//   import { mapGetters, mapActions } from 'vuex';
import Vue from 'vue'
  export default {
    name: "AddServiceView",
    data: () => ({
      valid: true,
      service: '',
      libelle_presta : '' ,
      id : 0 ,
      alltype : Vue.axios.get("http://localhost:3000/typeprestataire").then((response) => {
                if (response.data.success === 1) {
                    return response.data
                } else {
                    return []
                }
            }).catch((e) => {
                console.log(e);
                alert("Une erreur est survenu");
            }),
      serviceRules: [
        v => !!v || 'Service requis'
      ],
    }),
    methods: {
        valider() {
            if (this.service === '' ||
                this.libelle_presta === '') {
                alert("Le service et le libelle du prestataire doit etre renseigner");
                return;
            }
            Vue.axios.post("http://localhost:3000/users/register", {
                login: this.identifiant,
                password: this.password,
                email: this.email,
                firstname: this.firstname,
                lastname: this.lastname,
                dob: this.dob,
                address: this.address,
                mobile: this.mobile,
                genre: this.genre
            }).then((response) => {
                if (response.data.success === 1) {
                    this.$router.push({name: "login"})
                } else {
                    alert("Identifiant ou email déjà utilisé");
                }
            }).catch((e) => {
                console.log(e);
                alert("Inscription impossible");
            });
        },
    }

    // computed: {
    //   ...mapGetters('auth', ['user']),
    //   ...mapGetters('artist', ['artist']),
    //   ...mapGetters('prestataire', ['prestataire']),
    // },
    // methods: {
    //   ...mapActions('prestataire', ['addServicePrestataire','allService']),
    //   async addService() {
    //     if (this.$refs.form.validate()) {
    //       await this.addServicePrestataire({
    //         id_prestataire: this.prestataire.id_prestataire,
    //         id_user: this.user.id_user,
    //         libelle_service: this.service,
    //       });
    //       await this.allService(this.prestataire.id_prestataire);
    //       this.$router.push({ name: 'prestataireId', params: { id: this.prestataire.id_prestataire } });
    //     }
    //   }
    // },
  }
  </script>
  
  <style scoped>
  
  </style>
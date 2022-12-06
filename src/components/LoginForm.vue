<template>
    <div :style="backgroundColor">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card class="mt-16" style="background-color: rgb(255,222,89)">
                        <v-card-title>
                            <h1 class="display-2 mx-auto">Se connecter</h1>
                        </v-card-title>
                        <v-card-subtitle>
                            <h3 style="text-align: center">Tu n'as pas encore de compte ? <a @click="$router.push('/register')" >S'inscrire</a></h3>
                        </v-card-subtitle>
                        <v-card-text>
                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-text-field
                                    v-model="identifiant"
                                    :rules="identifiantRules"
                                    label="Identifiant"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    v-model="password"
                                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="passwordRules"
                                    :type="showPassword ? 'text' : 'password'"
                                    label="Mot de passe"
                                    required
                                    @click:append="showPassword = !showPassword"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="warning" @click="login">Se connecter</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: "LoginView",
    data: () => ({
        valid: true,
        identifiant: "",
        password: "",
        showPassword: false,
        checked: false,
        identifiantRules: [
            (v) => !!v || "L'identifiant est requis",
            (v) => v.length <= 20 || "L'identifiant doit être inférieur à 20 caractères",
        ],
        passwordRules: [
            (v) => !!v || "Le mot de passe est requis",
            (v) => v.length <= 20 || "Le mot de passe doit être inférieur à 20 caractères",
        ],
        backgroundColor: {
            backgroundColor: "rgb(50, 50, 50)",
            height: "100vh"
        },
    }),
    methods: {
        ...mapActions({
            signIn: 'auth/signIn'
        }),
        login() {
            if (this.identifiant === '' || this.password === '') {
                alert('Veuillez remplir tous les champs');
                return;
            }
            this.signIn({
                login: this.identifiant,
                password: this.password,
            }).then(() => {
                this.$router.replace({
                    name: 'home'
                }).catch(() => {

                })
            }).catch(e => {
                console.log('Error login');
                console.log(e);
                if (e.response && e.response.status === 405) {
                    return alert('Identifiant ou mot de passe incorrect');
                }
                alert("Une erreur est survenue lors de la connexion, l'API n'est peut être pas allumée");
            });
        }
    }
}
</script>

<style scoped>

</style>
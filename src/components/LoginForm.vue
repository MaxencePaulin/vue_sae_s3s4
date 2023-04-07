


<template>
    <v-container fluid style="margin-top: 10vh; margin-bottom: 10vh">
        <v-row>
            <v-col cols="12" sm="10" md="8" offset-md="2" offset-sm="1">
                <v-card style="background-color: rgb(255,222,89)">
                    <v-card-title>
                        <h1 class="display-2 mx-auto">Se connecter</h1>
                    </v-card-title>
                    <v-card-subtitle>
                        <h3 style="text-align: center">Tu n'as pas encore de compte ? <a
                                @click="$router.push('/register')">S'inscrire</a></h3>
                    </v-card-subtitle>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <!-- CSRF token -->
                            <input type="hidden" name="_csrf" :value="csrfToken">
                            <v-text-field v-model="identifiant" :rules="identifiantRules" label="Identifiant" required
                                @keyup.enter="login"></v-text-field>
                            <v-text-field v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="passwordRules" :type="showPassword ? 'text' : 'password'" label="Mot de passe"
                                required @click:append="showPassword = !showPassword" @keyup.enter="login"></v-text-field>
                            <div class="text-center">
                                <div class="row">
                                    <div class="col-md-12">
                                        <button type="button" class="btn btn-danger" @click="googleLogin">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                                                <path
                                                    d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z">
                                                </path>
                                            </svg>
                                            Se connecter avec Google
                                        </button>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <button id="discord_btn">
                                            <a class="btn btn-lg btn-discord btn-block btn-outline" style="text-decoration: none; color: black" href='https://discord.com/api/oauth2/authorize?client_id=1070627686302625852&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F&response_type=code&scope=identify' >Signup Using Discord</a>
                                        </button>
                                    </div>
                                </div>
                            </div>
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
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';
import helmet from 'helmet';
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
        // CSRF
        csrfToken: ''
    }),
    mounted() {
        this.csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    },
    methods: {
        ...mapActions({
            signIn: 'auth/signIn',
            googleSignIn: 'auth/googleSignIn'
        }),
        login() {
            // Créer un jeton CSRF
            const csrfToken = helmet.csrfToken();

            // Ajouter le jeton CSRF à l'en-tête de la requête
            axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;

            if (!this.$refs.form.validate()) {
                return;
            }
            this.signIn({
                login: this.identifiant,
                password: this.password,
                // Ajouter le jeton CSRF à la requête
                _csrf: csrfToken,
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
        },
        googleLogin() {
            // id Client 909953731803-c9c2ogf8c0tbpe73n32bpm9tl1t73q3e.apps.googleusercontent.com
            // code secret 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
            console.log("Login Google")
            this.googleSignIn()/*
                .then(() => {
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
            });*/
        },
        discordLogin() {
            console.log("Login Discord")
        }
    }
}
</script>

<style scoped></style>

<style>
@import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css";
@import "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
</style>

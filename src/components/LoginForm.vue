


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
                            <v-text-field v-model="identifiant" :rules="identifiantRules" label="Identifiant" required
                                @keyup.enter="login"></v-text-field>
                            <v-text-field v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="passwordRules" :type="showPassword ? 'text' : 'password'" label="Mot de passe"
                                required @click:append="showPassword = !showPassword"
                                @keyup.enter="login"></v-text-field>
                            <div class="text-center">
                                <div class="row">
                                    <div class="col-md-12">
                                        <button type="button" class="btn btn-success" @click="googleLogin">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                                                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"></path>
                                            </svg>
                                            SignIn with Google
                                        </button>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <button type="button" class="btn btn-primary" id="discord_btn" @click="discordLogin">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-discord" viewBox="0 0 16 16">
                                                <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"></path>
                                            </svg>
                                            SignIn with Discord
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
    }),
    methods: {
        ...mapActions({
            signIn: 'auth/signIn',
            googleSignIn: 'auth/googleSignIn'
        }),
        login() {
            if (!this.$refs.form.validate()) {
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

<style scoped>

</style>

<style>
@import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css";
@import "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
</style>
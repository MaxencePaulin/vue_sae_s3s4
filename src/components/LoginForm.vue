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
                                    <button id="google_btn">
                                        <a class="btn btn-lg btn-google btn-block btn-outline" style="text-decoration: none; color : black" href="#">Signup Using Google</a>
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
            signIn: 'auth/signIn'
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
        }
    }
}
</script>

<style scoped>

</style>

<style>
/* BOUTON GOOGLE */
#google_btn {
    padding: 15px 25px;
    border: unset;
    border-radius: 15px;
    color: #212121;
    z-index: 1;
    background: #de4040;
    position: relative;
    font-weight: 1000;
    font-size: 17px;
    -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
    box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
    transition: all 250ms;
    overflow: hidden;
}

#google_btn::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    border-radius: 15px;
    background-color: #e8e8e8;
    z-index: -1;
    -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
    box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
    transition: all 250ms
}

#google_btn:hover::before {
    width: 100%;
}

/* BOUTON DISCORD */
#discord_btn {
    padding: 15px 25px;
    border: unset;
    border-radius: 15px;
    color: #212121;
    z-index: 1;
    background: #7289DA;
    position: relative;
    font-weight: 1000;
    font-size: 17px;
    -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
    box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
    transition: all 250ms;
    overflow: hidden;
}

#discord_btn::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    border-radius: 15px;
    background-color: #e8e8e8;
    z-index: -1;
    -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
    box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
    transition: all 250ms
}

#discord_btn:hover::before {
    width: 100%
}
</style>

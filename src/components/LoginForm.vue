<template>
    <div :style="backgroundColor">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card class="mt-16" style="background-color: rgb(255,222,89)">
                        <v-card-title>
                            <h1 class="display-1 mx-auto">Login</h1>
                        </v-card-title>
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

                            <input type="checkbox" id="checkbox" @click="checkedChange" v-model="checked">
                            <label for="checkbox"> Rester connecter ?</label>
                        </v-card-text>
                        <v-card-actions>

                            <v-spacer></v-spacer>
                            <v-btn color="warning" @click="login">Login</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import Vue from 'vue';
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
        }
    }),
    methods: {
        login() {
            Vue.axios.post("http://localhost:3000/users/login", {
                login: this.identifiant,
                password: this.password,
            }).then((response) => {
                let data = response.data.data;
                if (response.data.data.login) {
                    this.$session.start();
                    this.$session.set("identifiant", data.login);
                    this.$session.set("role", data.role.libelle_role);
                    window.location.href = "/";
                } else {
                    alert("Identifiant ou mot de passe incorrect");
                }
            }).catch((e) => {
                console.log(e);
                alert("Connexion impossible");
            });
        },
        checkedChange() {
            if (this.checked === false) {
                console.log("checked");
            } else {
                console.log("unchecked");
            }
        }
    }
}
</script>

<style scoped>

</style>
<template>
    <div :style="backgroundColor">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card class="mt-16" style="background-color: rgb(255,222,89)">
                        <v-card-title>
                            <h1 class="display-2 mx-auto">Inscription</h1>
                        </v-card-title>
                        <v-card-text>
                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-row>
                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                        <v-text-field
                                            v-model="identifiant"
                                            :rules="identifiantRules"
                                            label="Identifiant*"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                        <v-text-field
                                            v-model="password"
                                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                            :rules="passwordRules"
                                            :type="showPassword ? 'text' : 'password'"
                                            label="Mot de passe*"
                                            required
                                            @click:append="showPassword = !showPassword"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                        <v-text-field
                                            v-model="confirmPassword"
                                            :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                            :rules="confirmPasswordRules"
                                            :type="showConfirmPassword ? 'text' : 'password'"
                                            label="Confirmer le mot de passe*"
                                            required
                                            @click:append="showConfirmPassword = !showConfirmPassword"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                        <v-text-field
                                            v-model="email"
                                            :rules="emailRules"
                                            label="Email*"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                        <v-text-field
                                            v-model="firstname"
                                            :rules="firstnameRules"
                                            label="Prénom*"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                        <v-text-field
                                            v-model="lastname"
                                            :rules="lastnameRules"
                                            label="Nom*"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                        <v-text-field
                                            v-model="dob"
                                            :rules="dobRules"
                                            label="Date de naissance"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                        <v-text-field
                                            v-model="genre"
                                            :rules="genreRules"
                                            label="Genre (homme ou femme)"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        md="4"
                                    >
                                        <v-text-field
                                            v-model="mobile"
                                            :rules="mobileRules"
                                            label="Numéro de téléphone"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-text-field
                                    v-model="address"
                                    :rules="addressRules"
                                    label="Adresse"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="warning" @click="register">S'inscrire</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    name: "RegisterForm",
    data: () => ({
        valid: true,
        identifiant: "",
        password: "",
        email: "",
        firstname: "",
        lastname: "",
        dob: "",
        address: "",
        mobile: "",
        genre: "",
        confirmPassword: "",
        showPassword: false,
        showConfirmPassword: false,
        checked: false,
        identifiantRules: [
            (v) => !!v || "L'identifiant est requis",
            (v) => v.length <= 20 || "L'identifiant doit être inférieur à 20 caractères",
        ],
        passwordRules: [
            (v) => !!v || "Le mot de passe est requis",
            (v) => v.length <= 20 || "Le mot de passe doit être inférieur à 20 caractères",
        ],
        confirmPasswordRules: [
            (v) => !!v || "La confirmation du mot de passe est requise",
            (v) => v.length <= 20 || "La confirmation du mot de passe doit être inférieur à 20 caractères"
        ],
        emailRules: [
            (v) => !!v || "L'email est requis",
            (v) => /.+@.+\..+/.test(v) || "L'email doit être valide",
        ],
        firstnameRules: [
            (v) => !!v || "Le prénom est requis",
            (v) => v.length <= 20 || "Le prénom doit être inférieur à 20 caractères",
        ],
        lastnameRules: [
            (v) => !!v || "Le nom est requis",
            (v) => v.length <= 20 || "Le nom doit être inférieur à 20 caractères",
        ],
        dobRules: [
            (v) => v.length <= 20 || "La date de naissance doit être inférieur à 20 caractères",
            (v) => /^\d{4}-\d{2}-\d{2}$/.test(v) || "La date de naissance doit être au format YYYY-MM-DD",
        ],
        addressRules: [
            (v) => v.length <= 50 || "L'adresse doit être inférieur à 50 caractères"
        ],
        mobileRules: [
            (v) => v.length <= 20 || "Le numéro de téléphone doit être inférieur à 50 caractères"
        ],
        genreRules: [
            (v) => v.length <= 20 || "Le genre doit être inférieur à 20 caractères",
            (v) => /^(homme|femme|male|female)$/.test(v.toLowerCase()) || "Le genre doit être homme ou femme (male ou female)"
        ],
        backgroundColor: {
            backgroundColor: "rgb(50, 50, 50)",
            height: "100vh"
        }
    }),
    methods: {
        register() {
            if (this.login === '' ||
                this.password === '' ||
                this.password !== this.confirmPassword) {
                alert("Champs incorrect ou les mots de passe ne correspondent pas");
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
                    window.location.href = "/login";
                } else {
                    alert("Identifiant ou email déjà utilisé");
                }
            }).catch((e) => {
                console.log(e);
                alert("Inscription impossible");
            });
        },
    }
}
</script>

<style scoped>

</style>
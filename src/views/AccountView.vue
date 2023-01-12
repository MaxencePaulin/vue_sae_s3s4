<template>
    <div :style="backgroundColor">
        <v-container>
            <v-row>
                <v-col cols="12" sm="10" md="8" offset-md="2" offset-sm="1" style="margin-top: 50px">
                    <v-card v-if="status === 0" class="elevation-12" color="grey">
                        <v-toolbar color="amber" dark flat>
                            <v-toolbar-title style="color: black">Mon compte</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-alert
                                type="info"
                                border="left"
                                colored-border
                                elevation="2"
                                text
                                color="amber"
                            >
                                <h2>Informations du compte</h2>
                                <p>Numéro du compte: {{ user.id_user }}</p>
                                <p>Identifiant: {{ user.login }}</p>
                                <p>Adresse email: {{ user.email }}</p>
                                <p>Prénom: {{ user.firstname }}</p>
                                <p>Nom: {{ user.lastname }}</p>
                                <p>Date de naissance: {{ user.dob }}</p>
                                <p>Adresse: {{ user.address }}</p>
                                <p>Numéro de téléphone: {{ user.mobile }}</p>
                                <p>Genre: {{ user.genre }}</p>
                                <p>Statut: {{ user.libelle_role }}</p>

                            </v-alert>
                            <v-btn v-if="user.id_role !== 2" color="amber" @click="updateForm">Modifier mes informations</v-btn>
                        </v-card-text>
                    </v-card>
                    <v-card v-else class="elevation-12" color="grey">
                        <v-toolbar color="amber" dark flat>
                            <v-toolbar-title style="color: black">Modifier mon compte</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-alert
                                type="info"
                                border="left"
                                colored-border
                                elevation="2"
                                text
                                color="amber"
                            >
                                <h2>Informations du compte</h2>
                                <p>Numéro du compte: {{ user.id_user }}</p>
                                <p>Identifiant: {{ user.login }}</p>
                                <p>Adresse email: {{ user.email }}</p>
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-text-field label="Prénom" v-model="firstname" :rules="firstnameRules" color="amber"></v-text-field>
                                    <v-text-field label="Nom" v-model="lastname" :rules="lastnameRules" color="amber"></v-text-field>
                                    <v-text-field label="Date de naissance" v-model="dob" :rules="dobRules" color="amber"></v-text-field>
                                    <v-text-field label="Adresse" v-model="address" :rules="addressRules" color="amber"></v-text-field>
                                    <v-text-field label="Numéro de téléphone (sans espace)" v-model="mobile" :rules="mobileRules" color="amber"></v-text-field>
                                    <v-text-field label="Genre (Homme, Femme ou autre)" v-model="genre" :rules="genreRules" color="amber"></v-text-field>
                                </v-form>
                                <p>Statut: {{ user.libelle_role }}</p>

                            </v-alert>
                            <v-btn v-if="user.id_role !== 2" color="red" @click="cancel">Annuler</v-btn>
                            <v-btn v-if="user.id_role !== 2" style="float:right" color="green" @click="update">Valider</v-btn>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "AccountView",
    data: () => ({
        status: 0,
        valid: true,
        firstname: "",
        lastname: "",
        dob: "",
        address: "",
        mobile: "",
        genre: "",
        backgroundColor: {
            backgroundColor: "rgb(50, 50, 50)",
            height: "100vh"
        },
        firstnameRules: [
            (v) => !!v || "Le prénom est requis",
            (v) => v.length <= 20 || "Le prénom doit être inférieur à 20 caractères",
        ],
        lastnameRules: [
            (v) => !!v || "Le nom est requis",
            (v) => v.length <= 20 || "Le nom doit être inférieur à 20 caractères",
        ],
        dobRules: [
            (v) => v.length <= 20 || "La date de naissance doit être inférieur à 10 caractères",
            (v) => !v || /^\d{2}\/\d{2}\/\d{4}$/.test(v) || "La date de naissance doit être au format JJ/MM/AAAA",
        ],
        addressRules: [
            (v) => v.length <= 50 || "L'adresse doit être inférieur à 50 caractères"
        ],
        mobileRules: [
            (v) => v.length <= 20 || "Le numéro de téléphone doit être inférieur à 50 caractères",
            (v) => !v || /^\d+$/.test(v) || "Le numéro de téléphone ne doit contenir que des chiffres"
        ],
        genreRules: [
            (v) => v.length <= 20 || "Le genre doit être inférieur à 20 caractères",
            (v) => !v || /^(homme|femme|autre|male|female|other)$/.test(v.toLowerCase()) || "Le genre doit être homme, femme ou autre (male, female or other)"
        ],
    }),
    computed: {
        ...mapGetters('auth', ['user'])
    },
    methods: {
        updateForm() {
            this.firstname = this.user.firstname === null ? "" : this.user.firstname;
            this.lastname = this.user.lastname === null ? "" : this.user.lastname;
            this.dob = this.user.dob === null ? "" : this.user.dob;
            this.address = this.user.address === null ? "" : this.user.address;
            this.mobile = this.user.mobile === null ? "" : this.user.mobile;
            this.genre = this.user.genre === null ? "" : this.user.genre;
            this.status = 1;
        },
        cancel() {
            this.firstname = "";
            this.lastname = "";
            this.dob = "";
            this.address = "";
            this.mobile = "";
            this.genre = "";
            this.status = 0;
        },
        update() {
            if (this.$refs.form.validate()) {
                if (confirm("Voulez-vous vraiment modifier vos informations ?")) {
                    this.$store.dispatch('auth/updateAccount', {
                        firstname: this.firstname,
                        lastname: this.lastname,
                        dob: this.dob === '' ? null : this.dob,
                        address: this.address === '' ? null : this.address,
                        mobile: this.mobile === '' ? null : this.mobile,
                        genre: this.genre === '' ? null : this.genre,
                    }).then(() => {
                        this.cancel();
                    });
                }
            }
        }
    }
}
</script>

<style scoped>
</style>
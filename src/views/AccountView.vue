<template>
        <v-container fluid>
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
            <v-row v-if="user.id_role === 1">
                <v-col cols="12">
                    <v-card style="margin-top: 10px;margin-left:10vh;margin-right:10vh;margin-bottom:5vh;background-color: rgb(255,222,89);">
                        <v-card-title>
                            <h1>Historique de commande(s) de ticket(s) : {{ userTicket.length }}</h1>
                        </v-card-title>
                        <v-card v-for="(e, i) in ticket" :key="i" color="grey" style="margin:1vh;">
                            <v-card-title>
                                <h2>Ticket {{ e.ticket.type_ticket}}</h2>
                            </v-card-title>
                            <v-card-subtitle>
                                Ticket valide du {{ e.date_start_validity }} au {{ e.date_end_validity }}
                            </v-card-subtitle>

                        </v-card>
                        <v-card-actions>
                            <PaginationComponent :data=userTicket :currentPage="currentPage" :perPage="perPage" :colorcss="colorcss" @page-update="updatePage" />
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import PaginationComponent from "../components/PaginationComponent.vue";

export default {
    name: "AccountView",
    components: {
        PaginationComponent
    },
    data: () => ({
        status: 0,
        valid: true,
        firstname: "",
        lastname: "",
        dob: "",
        address: "",
        mobile: "",
        genre: "",
        currentPage: 0,
        perPage: 3,
        colorcss: {
            color: "rgb(50,50,50)"
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
        ...mapGetters('auth', ['user', 'userTicket']),
        ticket () {
            if (this.userTicket) {
                return this.userTicket.slice(
                    this.currentPage * this.perPage,
                    (this.currentPage + 1) * this.perPage
                );
            }
            return [];
        }
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
        },
        updatePage (pageNumber) {
            this.currentPage = pageNumber;
        }
    }
}
</script>

<style scoped>
</style>
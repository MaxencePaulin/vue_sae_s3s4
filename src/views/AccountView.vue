<template>
    <div :style="backgroundColor">
        <v-container>
            <v-row>
                <v-col cols="12" sm="6" md="8" offset-md="2" offset-sm="3" style="margin-top: 50px">
                    <v-card class="elevation-12" color="grey">
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
                            <v-btn color="amber" href="/update">Modifier mes informations</v-btn>
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
        backgroundColor: {
            backgroundColor: "rgb(50, 50, 50)",
            height: "100vh"
        }
    }),
    computed: {
        ...mapGetters('auth', ['user'])
    }
}
</script>

<style scoped>
</style>
<template>
    <v-container>
        <v-card class="mx-auto" max-width="500">
            <v-card-title class="text-center">Ajouter un prestataire</v-card-title>
            <v-card-text class="text-center">Pour ajouter un nouveau prestataire, veuillez cliquer sur le bouton ci-dessous :</v-card-text>
            <v-card-actions class="justify-center">
                <v-btn color="amber" @click="goToAddPrestatairePage()">Ajouter un prestataire</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: "AdminView",
    methods: {
        goToAddPrestatairePage() {
            this.$router.push('/addPrestataire')
        }
    }
}
</script>

<style scoped>
</style>
<template>
    <v-container fluid style="margin-bottom: 10vh; margin-top: 10vh">
        <v-row>
            <v-col cols="12" sm="6" md="8" offset-md="2" offset-sm="3">
                <v-card class="elevation-12">
                    <v-toolbar color="amber" dark flat>
                        <v-toolbar-title style="color: black">Erreur 404</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-alert
                            type="error"
                            border="left"
                            colored-border
                            elevation="2"
                            text
                        >
                            La page que vous recherchez n'existe pas ou les données requises sont inexistantes.
                        </v-alert>
                        <v-btn color="amber" @click="$router.push('/')">Retourner au menu principal</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "ErrorView"
}
</script>

<style scoped>

</style>
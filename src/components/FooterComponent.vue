<template>
    <v-footer padless color="amber" class="police">
        <v-col class="text-center" cols="12">
            <v-btn
                v-for="icon in icons"
                :key="icon"
                class="mx-4 black--text"
                icon
            >
                <v-icon size="24px">{{ icon }}</v-icon>
            </v-btn><br>
            {{ new Date().getFullYear() }} — <strong>NO SLEEP FESTIVAL</strong>

        </v-col>
    </v-footer>
</template>

<script>
export default {
    name: "FooterComponent",
    data: () => ({
        icons: [
            'mdi-facebook',
            'mdi-twitter',
            'mdi-instagram',
        ]
    }),
};
</script>

<style scoped>
</style>

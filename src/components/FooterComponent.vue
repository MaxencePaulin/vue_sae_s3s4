<template>
    <v-footer padless color="amber">
        <v-col class="text-center" cols="12">
            {{ new Date().getFullYear() }} — <strong>NO SLEEP FESTIVAL</strong>
        </v-col>
    </v-footer>
</template>

<script>
export default {
    name: "FooterComponent",
    data: () => ({
        //
    }),
};
</script>

<style scoped></style>

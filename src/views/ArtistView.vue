<template>
    <v-container fluid>
        <v-card>
            <v-card-title>
                <h1>{{ artist.name }}</h1>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-img
                            :src="artist.image"
                            :alt="artist.name"
                            max-width="100%"
                            max-height="100%"
                        ></v-img>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                        <v-card>
                            <v-card-title>
                                <h2>Genre :</h2>
                            </v-card-title>
                            <v-card-text>
                                <p>{{ artist.genre }}</p>
                            </v-card-text>
                            <v-card-title>
                                <h2>Biographie :</h2>
                            </v-card-title>
                            <v-card-text>
                                <p>{{ artist.biography }}</p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: "ArtistView",
    data: () => ({
        //
    }),
    computed: {
        ...mapGetters(['artist']),
    }
}
</script>

<style scoped>

</style>
<template>
    <div >
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Rechercher"
                        single-line
                        hide-details
                        @click:append="artists"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-container>
<!--        <v-container>-->
<!--            <v-row>-->
<!--                <v-col cols="12" sm="6" md="4" v-for="artist in artistFilter" :key="artist.id_artist">-->
<!--                    <v-card>-->
<!--                        <v-card-title>-->
<!--                            <div>-->
<!--                                <v-img-->
<!--                                    :src="artist.image"-->
<!--                                    aspect-ratio="1"-->
<!--                                    contain-->
<!--                                ></v-img>-->
<!--                                <h3 class="headline mb-0">{{ artist.name }}</h3>-->
<!--                                <div>{{ artist.biography }}</div>-->
<!--                            </div>-->
<!--                        </v-card-title>-->
<!--                        <v-card-actions>-->
<!--                            <v-btn color="warning" text @click="goToArtist(artist.id_artist)">Voir l'artiste</v-btn>-->
<!--                        </v-card-actions>-->
<!--                    </v-card>-->
<!--                </v-col>-->
<!--            </v-row>-->
<!--        </v-container>-->

        <h3 v-if="artists.length <=0" class="mt-12" style="text-align: center">Aucun résultat</h3>
        <v-container>
            <v-row>
                <v-col cols="12" sm="6" md="10" offset-md="1" offset-sm="1" v-for="artist in artists" :key="artist.id_artist" :artists="artists" :currentPage="currentPage">
                    <v-card>
                        <v-card-title>
                            <v-icon>mdi-account</v-icon>
                            <span class="headline">{{artist.name}}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-list-item>
                                <v-list-item-avatar size="100">
                                    <v-img :src="artist.image"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title class="headline">{{artist.biography}}</v-list-item-title>
                                    <v-list-item-subtitle>{{ artist.genre }}</v-list-item-subtitle>
                                </v-list-item-content>
                                <v-spacer></v-spacer>
                                <v-list-item-action>
                                    <v-btn color="warning" text @click="goToArtist(artist.id_artist)">Voir l'artiste</v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-card-text>
                    </v-card>
                </v-col>
<!--                <v-col cols="12">-->
<!--                    <v-card>-->
<!--                        <v-card-title>-->
<!--                            <v-icon>mdi-account</v-icon>-->
<!--                            <span class="headline">Artiste</span>-->
<!--                        </v-card-title>-->
<!--                        <v-card-text>-->
<!--                            <v-list-item>-->
<!--                                <v-list-item-avatar>-->
<!--                                    <v-img src="https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg"></v-img>-->
<!--                                </v-list-item-avatar>-->
<!--                                <v-list-item-content>-->
<!--                                    <v-list-item-title class="headline">John Leider</v-list-item-title>-->
<!--                                    <v-list-item-subtitle>Lead Developer</v-list-item-subtitle>-->
<!--                                </v-list-item-content>-->
<!--                            </v-list-item>-->
<!--                        </v-card-text>-->
<!--                    </v-card>-->
<!--                </v-col>-->
            </v-row>
        </v-container>

        <PaginationComponent
            :artists="artistFilter"
            :currentPage="currentPage"
            :perPage="perPage"
            @page-update="updatePage"
        />

    </div>
</template>

<script>
import { mapState } from 'vuex';
import PaginationComponent from "@/components/PaginationComponent.vue";

export default {
    name: "SearchArtist",
    data: () => ({
        search: "",
        currentPage: 0,
        perPage: 10,

    }),
    components: {
        PaginationComponent
    },
    computed: {
        ...mapState(['allArtists']),
        artistFilter() {
            return this.allArtists.filter((artist) => {
                return artist.name.toLowerCase().includes(this.search.toLowerCase())
            })
        },
        artists() {
            return this.artistFilter.slice(
                this.currentPage * this.perPage,
                (this.currentPage + 1) * this.perPage
            );
        }
    },
    methods: {
        updatePage(pageNumber) {
          this.currentPage = pageNumber;
        },
    },
}
</script>

<style scoped>

</style>
<template>
    <div >
        <v-container>
            <v-row>
                <v-col cols="12" sm="8" md="10" offset-md="1" offset-sm="2">
                    <v-card color="grey">
                        <v-card-text>
                            <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                color="rgb(255,222,89)"
                                label="Rechercher un artiste"
                                single-line
                                hide-details
                                @click:append="updatePage(0)"
                                @input="updatePage(0)"
                            ></v-text-field>
                        </v-card-text>
                    </v-card>

                </v-col>
            </v-row>
        </v-container>

        <h3 v-if="artists.length <=0" style="text-align: center; color: rgb(255,222,89)">Aucun résultat</h3>
        <v-container>
            <v-row>
                <v-col cols="12" sm="8" md="10" offset-md="1" offset-sm="2" v-for="artist in artists" :key="artist.id_artist" :artists="artists" :currentPage="currentPage">
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
            </v-row>
        </v-container>

        <PaginationComponent
            :data="artistFilter"
            :currentPage="currentPage"
            :perPage="perPage"
            :colorcss="colorcss"
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
        perPage: 1,
        colorcss: {
            color: "rgb(255,222,89)"
        }
    }),
    components: {
        PaginationComponent
    },
    computed: {
        ...mapState('artist',['allArtists']),
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
        goToArtist(id) {
            this.$router.push({ name: 'artistId', params: { id: id } })
        }
    },
}
</script>

<style scoped>
</style>
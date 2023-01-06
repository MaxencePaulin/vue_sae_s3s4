<template>
  <div >
    <v-container>
      <v-row>
        <v-col cols="12" sm="8" md="10" offset-md="1" offset-sm="2">
          <!-- faire une carte pour un v-text-field -->
          <v-card color="grey">
            <v-card-text>
              <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  color="rgb(255,222,89)"
                  label="Rechercher un Prestataire"
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

    <h3 v-if="prestataires.length <=0" style="text-align: center; color: rgb(255,222,89)">Aucun résultat</h3>
    <v-container>
      <v-row>
        <v-col cols="12" sm="8" md="10" offset-md="1" offset-sm="2" v-for="prestataire in prestataires" :key="prestataire.id_prestataire" :prestataires="prestataires" :currentPage="currentPage">
          <v-card>
            <v-card-title>
              <v-icon>mdi-account</v-icon>
              <span class="headline">{{ prestataire.libelle_prestataire }}</span>
            </v-card-title>
            <v-card-text>
              <v-list-item>
                <v-list-item-avatar size="100">
                  <v-img :src="prestataire.image"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="headline">{{prestataire.typeprestataire.libelle_typeprestataire }}</v-list-item-title>
                  <v-list-item-subtitle>{{ prestataire.libelle_prestataire }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-spacer></v-spacer>
                <v-list-item-action>
                  <v-btn color="warning" text @click="goToPrestataire(prestataire.id_prestataire)">Voir le Prestataire</v-btn>
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
        :data="prestataireFilter"
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
  name: "SearchPrestataire",
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
    ...mapState('prestataire',['allPrestataires']),
    prestataireFilter() {
      return this.allPrestataires.filter((prestataire) => {
        return prestataire.libelle_prestataire.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    prestataires() {
      return this.prestataireFilter.slice(
          this.currentPage * this.perPage,
          (this.currentPage + 1) * this.perPage
      );
    }
  },
  methods: {
    updatePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    goToPrestataire(id) {
      this.$router.push({ name: 'prestataireId', params: { id: id } })
    }
  },
}
</script>

<style scoped>
</style>
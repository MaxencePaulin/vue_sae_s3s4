<template>
  <v-container fluid style="margin-top: 5vh; margin-bottom: 5vh">
    <v-card style="margin-left: 5vh;margin-right: 5vh;">
      <v-card-title>
        <h1>{{ prestataire.libelle_prestataire }}</h1>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-card>
              <v-card-title>
                <h2>Nom  :</h2>
              </v-card-title>
              <v-card-text>
                <p>{{ prestataire.libelle_prestataire }}</p>
              </v-card-text>
              <v-card-title>
                <h2>Type de prestataire :</h2>
              </v-card-title>
              <v-card-text>
                <p>{{ prestataire.typeprestataire.libelle_typeprestataire }}</p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-card>
              <v-card-title>
                <h2>Services :</h2>
              </v-card-title>
              <v-card-text v-for="service in servicePaginate" :key="service.id_service">
                  <ul>
                      <li>{{ service.service.libelle_service }}<v-btn style="float: right" v-if="currentUser?.id_prestataire === prestataire.id_prestataire || currentUser?.id_role === 3" color="black" text @click="confirmDeleteService(service.id_service)">Supprimer service</v-btn></li>
                  </ul>
              </v-card-text>
              <v-card-actions>
                  <pagination-component :data=services :currentPage="currentPageService" :perPage="perPageService" :colorcss="colorcss" @page-update="updatePageService"></pagination-component>
                  <v-spacer></v-spacer>
                  <v-btn v-if="currentUser?.id_prestataire === prestataire.id_prestataire || currentUser?.id_role === 3" color="black" text @click="goToService">Ajouter service</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card style="margin: 5vh; background-color:rgb(255,222,89)">
      <v-card-title>
        <h2>Avis</h2>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="comment in guestBook" :key="comment.id_avis">
            <v-card>
              <v-card-title>
                <h3>{{ comment.user.firstname }}</h3>
              </v-card-title>
              <v-card-text>
                <p>{{ comment.libelle_avis }}</p>
                <v-btn v-if="comment.id_user === currentUser?.id_user || currentUser?.id_role === 3" @click="confirmDelete(comment.id_avis)">
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <pagination-component :data=prestataire.guestBook :currentPage="currentPage" :perPage="perPage" :colorcss="colorcss" @page-update="updatePage"></pagination-component>
        <v-spacer></v-spacer>
        <v-btn  color="black" text @click="goToComment">Ajouter un avis</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import PaginationComponent from "@/components/PaginationComponent.vue";

export default {
  name: 'PrestataireView',
  components: {PaginationComponent},
  data: () => ({
      currentPage: 0,
      perPage: 9,
      colorcss: {
      color: "rgb(50,50,50)"
      },
      currentPageService: 0,
      perPageService: 4,
  }),
  computed: {
    ...mapGetters('prestataire',['prestataire', 'allServices']),
    ...mapGetters('auth',['user']),
    guestBook () {
      if (this.prestataire.guestBook) {
        return this.prestataire.guestBook.slice(
            this.currentPage * this.perPage,
            (this.currentPage + 1) * this.perPage
        );
      }
      return [];
    },
    currentUser () {
      if (this.user) {
        return this.user;
      }
      return null;
    },
    services (){
      return this.allServices.filter(service => service.id_prestataire === this.prestataire.id_prestataire)
    },
      servicePaginate() {
          if (this.services) {
            return this.services.slice(
                  this.currentPageService * this.perPageService,
                  (this.currentPageService + 1) * this.perPageService
              );
          }
          return [];
        },
  },
  methods: {
    ...mapActions('prestataire', ['getPrestataire', 'deleteCommentPrestataire','deleteServicePrestataire']),
    updatePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    goToComment() {
      this.$router.push({name: 'commentPrestataire', params: {id: this.prestataire.id_prestataire}}).catch(() => {});
    },
    goToService() {
      this.$router.push({name: 'addService'}).catch(() => {});
    },
    confirmDelete(idx) {
      if (confirm('Voulez-vous vraiment supprimer cet avis ?')) {
        this.deleteCommentPrestataire({id_avis: idx, id_prestataire: this.prestataire.id_prestataire})
            .then(() => {
              this.$router.go('/prestataire/' + this.prestataire.id_prestataire);
            });
      }
    },
    confirmDeleteService(id_service) {
      if (confirm('Voulez-vous vraiment supprimer ce service ?')) {
        this.deleteServicePrestataire({id_prestataire: this.prestataire.id_prestataire, id_service: id_service})
            .then(() => {
              this.$router.go('/prestataire/' + this.prestataire.id_prestataire);
            });
      }
    },
      updatePageService(pageNumber) {
      this.currentPageService = pageNumber;
    },
  },
}
</script>

<style scoped>

</style>
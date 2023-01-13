<template>
  <div class="theme police" id="top">
      <v-btn
          class="md-5 mr-3 elevation-24"
          dark
          fab
          button
          right
          color="dark"
          fixed
          bottom
          active-class="false"
          @click="$vuetify.goTo('#top', goToOptions)"
          v-scroll="onScroll"
          v-show="showGoToTop"
      >
            <v-icon color="amber">mdi-arrow-up</v-icon>
        </v-btn>
    <div class="img1">
        <v-row
            align="center"
            justify="space-around"
        >
            <v-btn
                v-for="summary in summarys"
                :key="summary"
                class="mx-6 mt-12 black--text amber"
                rounded
                @click="goToLink(summary)"
            >
                {{ summary }}
            </v-btn>
        </v-row>
      <div class="text1">
        <p class="text-over1 police">NO SLEEP FESTIVAL</p>
        <p class="text-over1"> FRANCE 2023</p>
        <p class="text-over2">22.07.23 - 26.07.23 LYON, LE GRAND BOURG</p>
      </div>
    </div>
    <div class="fondOrange">
      <p class="text-over3">UN EXCEPTIONNEL <br> FESTIVAL DE MUSIQUE <br> UNIQUE EN EUROPE !</p>
      <p class="text-over4">Le NoSleep Festival sera de retour en 2023. <br>
          Des choses merveilleuses arrivent à ceux qui viennent au <br>
        Festival !
      </p>
    </div>
    <div id="display-1">
      <div class="img2"></div>
      <div class="img3"></div>
      <div class="img4"></div>
    </div>
    <div class="fondGris" id="Informations sur le festival">
      <div class="flex">
        <div class="img5 basis-70">
          <p class="text-over5">INFORMATION DU FESTIVAL</p>
        </div>
        <div class="pad-1">
          <p class="text2">80 ARTISTES !</p>
          <p class="text3">Découvrez plus de 80 artistes
              de différents pays avec
              différents styles de musique </p>
          <p class="text2">POUR VOTRE PLAISIR</p>
          <p class="text3">Un fast-food et un camping
              à votre disposition pour une
              expérience à 100%</p>
          <p class="text2">MAGASIN SOUVENIR</p>
          <p class="text3">Gardez vos souvenirs grâce à nos boutiques d'accessoires et de vêtements</p>
        </div>
      </div>
    </div>
    <div class="fondBlanc" id="Carte interactive">
        <InteractiveMap />
    </div>
    <div class="fondOrange1" id="Détails de l'événement">
      <div class="text4">
          DÉTAILS DE L'ÉVÉNEMENT
      </div>
        <div>
          <div class="encadre">
            <p class="text5">INSCRIPTION</p>
            <p class="text6">Les inscriptions commencent le 10 janvier
                2023 à l'adresse www.NoSleepFestival.fr/ticket</p>
          </div>
        </div>
    </div>
    <div class="fondGris1" id="Nous contacter">
        <div class="flex">
          <div class="pad-2">
            <p class="text7 align-center">ADRESSE</p>
            <p class="text8 align-center">Le grand bourg 69000 Lyon</p>
            <p class="text7 align-center">ADRESSE POSTALE</p>
            <p class="text8 align-center">info@nosleep-festival.fr</p>
            <p class="text7 align-center">NUMÉRO DE TÉLÉPHONE</p>
            <p class="text8 align-center">01 22 57 48 94</p>
          </div>
          </div>
      <div class="img6">
        </div>
    </div>
  </div>
</template>

<script>
import InteractiveMap from '@/components/InteractiveMap'

export default {
    name: 'HomePageView',
    components: {
        InteractiveMap
    },
    data: () => ({
        summarys: [
            'Informations sur le festival',
            'Carte interactive',
            'Détails de l\'événement',
            'Nous contacter',
        ],
        offsetTop: 0,
        goToOptions: {
            duration: 1000,
            offset: 0,
            easing: 'easeInOutCubic',
        },
    }),
    computed: {
        showGoToTop() {
            return this.offsetTop > 200;
        },
    },
    methods: {
        goToLink(summary) {
            window.location.href = `#${summary}`;
        },
        onScroll (event) {
            this.offsetTop = event.target.scrollingElement.scrollTop;
        }
    }
}

</script>

<style lang="css">

.flex {
  display: flex;
}

.basis-70 {
  flex-basis: 70%;
}

.pad-1 {
  padding: 4rem;
}

.img1 {
  position: relative;
  background-image: url("@/assets/image111.jpg");
  background-size: 100%;
  width: 100vw;
  height: 47vw;
}

.icon {
    position: relative;
    background-image: url('@/assets/logo_v1.png');
    background-size: 10%;
    width: 50vw;
    height: 20vw;
}

.theme {
  background-color: #373436;
  display: flex;
  flex-direction: column;
}

.fondOrange {
  height: 50vh;
  background-color: #FFC300;
  display: inline-block;
}


.text1 {
  display: flex;
  flex-direction: column;
  margin-left: 10%;
  margin-top: 15vw;
  font-size: 3em;
  color: white;
}

.text-over1 {
  color: white;
  font-size: 80px;
  font-weight: bold;
}

.text-over2 {
  color: #FFC300;
  font-size: 30px;
  font-weight: bold;
}

.text-over3 {
  color: #373436;
  font-size: 40px;
  font-weight: bold;
  padding-left: 10vw;
  padding-top: 6vw;
  float: left;
}

.text-over4 {
  color: #373436;
  font-size: 28px;
  padding-top: 7.5vw;
  padding-right: 5vw;
  float: right;
}

.img2 {
  background-image: url("@/assets/image5.jpg");
  width: 33.3vw;
  height: 33vw;
}

.img3 {
  background-image: url("@/assets/image3.jpg");
  width: 33.3vw;
  height: 33vw;
}

.img4 {
  background-image: url("@/assets/image4.jpg");
  width: 33.3vw;
  height: 33vw;
}

#display-1 {
  display: flex;
  flex-direction: row;
}

.fondGris {
  background-color: #373436;
  height: 64vh;
  display: inline-block;
  position: relative;
}

.img5 {
  background-image: url("@/assets/image6.jpg");
  background-size: 100%;
  width: 53vw;
  height: 35vw;
  position: relative;
}

.text-over5 {
  color: #FFC300;
  font-size: 67px;
  font-weight: bold;
  padding-top: 1vw;
  padding-left: 1vw;
  text-align: center;
}

.text2 {
  color: #FFC300;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
}

.text3 {
  color: white;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.fondBlanc {
  background-color: white;
  height: 66vh;
  display: inline-block;
  position: relative;
}
.fondOrange1{
  height: 75vh;
  background-color: #FFC300;
  display: inline-block;
}
.text4{
  color: #373436;
  font-weight: bold;
  text-align: center;
  font-size: 50px;
  padding-top: 7rem;
}
.text5{
  color: #373436;
  font-weight: bold;
  text-align: center;
  font-size: 40px;
  padding-bottom: 1rem;
}
.encadre{
  border: 2px solid #373436;
  text-align: center;
  justify-content: center;
  margin: 6rem;
}

.text6{
  color: #373436;
  font-weight: bold;
  text-align: center;
  font-size: 30px;
}
.fondGris1{
  background-color: #373436;
  height: 72vh;
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.img6 {
  background-image: url("@/assets/.image10jpeg.jpeg");
  background-size: 100%;
  width: 53vw;
  height: 35vw;
  position: relative;
}
.text7{
  color: white;
  font-weight: bold;
  font-size: 45px;
  padding-right: 50px;
}
.text8{
  color: white;
  font-weight: bold;
  font-size: 35px;
  padding-right: 50px;
}
.align-center{
  text-align: center;
}

.pad-2 {
  padding-top: 3rem;
  padding-left: 7rem ;
}


/* CSS de la map interractive */
.map {
    overflow: hidden; 
}

.map__image {
    margin-top: 3vh;
    margin-left: 1vw;
    margin-bottom: 3vh;
    float: left;
}

.map__image svg {
    width: 93%;
    height : 100%;
    margin-left: 2vw;
    margin-bottom: 1vh;
}

.map__image path {
    opacity: 0.6;
}

.map__image .is-active path {
    transform: scale(1.005);
    opacity: 1;
}

.fondBlanc {
  background-color: #373436;
  height: 100%;
}

</style>
<template>
  <v-app class="police">
    <nav-bar />
    <v-main class="background">
      <router-view/>
    </v-main>
    <footer-component />
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    FooterComponent
  },
  data: () => ({
    //
  }),
};
</script>

<style>
.background {
    background: rgb(50,50,50);
}
.police {
    /*font-family: 'Oswald', sans-serif;*/
    /*
    font-family: 'Lato', sans-serif;
        */
    font-family: 'Garamond', serif;

}
</style>

<template>
    <div>
        <v-app-bar absolute app color="amber" dark hide-on-scroll scroll-target="#scrolling-techniques-4" class="police">
            <v-app-bar-nav-icon
                color="rgb(50,50,50)"
                @click="drawer = true"
            ></v-app-bar-nav-icon>
            <v-toolbar-title style="color: black;">
                NO SLEEP FESTIVAL
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <span v-if="authenticated" style="color: black; margin: 20px">Connecté en tant que : {{ user?.login }}</span>
            <v-btn v-if="authenticated" color="rgb(50,50,50)" style="margin-right: 2vh" @click="signOut"><span style="color: #FFC107">Déconnexion</span></v-btn>
            <v-btn v-if="!authenticated" color="rgb(50,50,50)" style="margin-right: 2vh" @click="$router.push('/register').catch(() => {})"><span style="color: #FFC107">S'enregistrer</span></v-btn>
            <v-btn v-if="!authenticated" color="rgb(50,50,50)" style="margin-right: 2vh" @click="$router.push('/login').catch(() => {})"><span style="color: #FFC107">Connexion</span></v-btn>
            <v-btn color="rgb(50,50,50)" @click="switchLanguage('fr')">
                <span style="color: #FFC107">FR</span>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            absolute
            temporary
            color="rgb(50,50,50)"
            width="300"
        >
            <v-list nav dense>
                <v-list-item-group
                    v-model="group"
                    active-class="amber--text text--accent-4"
                >
                    <v-list-item-avatar>
                        <img src="../assets/logo40x40.png" alt="logo?">
                    </v-list-item-avatar>
                    <span style="color:rgb(255, 222, 89)">
                        NO SLEEP FESTIVAL
                    </span>

                    <v-list-item @click="$router.push('/').catch(() => {})">
                        <v-list-item-icon>
                            <v-icon color="amber">mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title style="color: rgb(255, 222, 89)"
                        >Menu Principal
                        </v-list-item-title
                        >
                    </v-list-item>

                    <v-list-item @click="$router.push('/artist').catch(() => {})">
                        <v-list-item-icon>
                            <v-icon color="amber">mdi-account-music</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title style="color: rgb(255, 222, 89)"
                        >Rechercher un artiste
                        </v-list-item-title
                        >
                    </v-list-item>

                    <v-list-item @click="$router.push('/ticket').catch(() => {})">
                        <v-list-item-icon>
                            <v-icon color="amber">mdi-cart-arrow-right</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title style="color: rgb(255, 222, 89)"
                        >Achetez vos billets
                        </v-list-item-title
                        >
                    </v-list-item>

                    <v-list-item @click="$router.push('/planning').catch(() => {})">
                        <v-list-item-icon>
                            <v-icon color="amber">mdi-calendar-range</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title style="color: rgb(255, 222, 89)"
                        >Planning des concerts
                        </v-list-item-title
                        >
                    </v-list-item>

                    <v-list-item @click="$router.push('/prestataire').catch(() => {})">
                      <v-list-item-icon>
                        <v-icon color="amber">mdi-account-music</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title style="color: rgb(255, 222, 89)"
                      >Rechercher un prestataire
                      </v-list-item-title
                      >
                    </v-list-item>

                    <v-list-item @click="$router.push('/feedback')">
                        <v-list-item-icon>
                            <v-icon color="amber">mdi-message-bulleted</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title style="color: rgb(255, 222, 89)"
                        >Donnez votre avis
                        </v-list-item-title
                        >
                    </v-list-item>

                    <span v-if="authenticated">
                        <v-list-item @click="$router.push('/account').catch(() => {})">
                            <v-list-item-icon>
                                <v-icon color="amber">mdi-account</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title style="color: rgb(255, 222, 89)">
                                Mon compte
                            </v-list-item-title>
                        </v-list-item>
                        <span v-if="(user?.id_role === 3)">
                            <v-list-item @click="$router.push('/admin').catch(() => {})">
                                <v-list-item-icon>
                                    <v-icon color="amber">mdi-account-cog</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title style="color: rgb(255, 222, 89)">
                                    Administration
                                </v-list-item-title>
                            </v-list-item>
                        </span>
                    </span>
                </v-list-item-group>
            </v-list>
            <div v-if="authenticated" class="pa-2">
                <v-btn block class="amber" @click="signOut">
                    Se déconnecter
                    <v-icon right color="black">mdi-exit-to-app</v-icon>
                </v-btn>
            </div>
        </v-navigation-drawer>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "NavBar",

    data: () => ({
        drawer: false,
        group: null,
    }),
    computed: {
        ...mapGetters({
            authenticated: "auth/authenticated",
            user: 'auth/user',
        }),
    },
    methods: {
        ...mapActions({
            logout: "auth/signOut",
        }),
        signOut() {
            this.logout().then(() => {
                this.$router.replace({
                    name: "home",
                }).catch(() => {});
            });
        },
        switchLanguage(lang) {
            // à developper plus tard
            console.log(lang);
            // this.$i18n.locale = lang;
        },
    },
};
</script>

<style scoped>
.police {
    font-weight: bold;
}
</style>

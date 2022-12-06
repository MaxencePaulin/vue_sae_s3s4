<template>
    <div>
<!--        <v-app-bar app color="rgb(255,222,89)" dark>-->
        <v-app-bar absolute app color="amber" dark hide-on-scroll scroll-target="#scrolling-techniques-4">
            <v-app-bar-nav-icon
                color="rgb(50,50,50)"
                @click="drawer = true"
            ></v-app-bar-nav-icon>
            <v-toolbar-title style="color: black;">
                NO SLEEP FESTIVAL
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <span v-if="authenticated" style="color: black; margin: 20px">{{ user.login }}</span>
            <v-btn color="rgb(50,50,50)" @click="switchLanguage('fr')">
                FR
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            absolute
            temporary
            color="rgb(50,50,50)"
        >
            <v-list nav dense>
                <v-list-item-group
                    v-model="group"
                    active-class="amber--text text--accent-4"
                >
                    <v-list-item-avatar>
                        <v-icon color="amber">mdi-vuejs</v-icon>
                    </v-list-item-avatar>
                    <v-list-title style="color:rgb(255, 222, 89)">
                        NO SLEEP FESTIVAL
                    </v-list-title>

                    <v-list-item @click="$router.push('/')">
                        <v-list-item-icon>
                            <v-icon color="amber">mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title style="color: rgb(255, 222, 89)"
                        >Menu Principal
                        </v-list-item-title
                        >
                    </v-list-item>

                    <span v-if="!authenticated">
                        <v-list-item @click="$router.push('/login')">
                            <v-list-item-icon>
                                <v-icon color="amber">mdi-account-key</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title style="color: rgb(255, 222, 89)">
                                Se connecter
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item @click="$router.push('/register')">
                            <v-list-item-icon>
                                <v-icon color="amber">mdi-account-plus</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title style="color: rgb(255, 222, 89)">
                                S'inscrire
                            </v-list-item-title>
                        </v-list-item>

                    </span>
                    <span v-else-if="authenticated">
                        <v-list-item @click="$router.push('/account')">
                            <v-list-item-icon>
                                <v-icon color="amber">mdi-account</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title style="color: rgb(255, 222, 89)">
                                Mon compte
                            </v-list-item-title>
                        </v-list-item>
                        <span v-if="(user.id_role === 3)">
                            <v-list-item @click="$router.push('/admin')">
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
                });
            });
        },
        // switchLanguage(lang) {
        //     this.$i18n.locale = lang;
        // },
    },
};
</script>

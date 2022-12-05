<template>
    <div>
        <v-app-bar app color="rgb(255,222,89)" dark>
            <v-app-bar-nav-icon
                color="rgb(50,50,50)"
                @click="drawer = true"
            ></v-app-bar-nav-icon>
            <v-toolbar-title style="color: black"
                >NO SLEEP FESTIVAL</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn color="rgb(50,50,50)" @click="switchLanguage('fr')"
                >FR</v-btn
            >
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
                    <v-list-item href="/">
                        <v-list-item-icon>
                            <v-icon color="amber">mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title style="color: rgb(255, 222, 89)"
                            >Menu Principal</v-list-item-title
                        >
                    </v-list-item>

                    <v-list-item href="/login">
                        <v-list-item-icon>
                            <v-icon color="amber">mdi-account-key</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title style="color: rgb(255, 222, 89)"
                            >Se connecter</v-list-item-title
                        >
                    </v-list-item>

                    <v-list-item href="/register">
                        <v-list-item-icon>
                            <v-icon color="amber">mdi-account-plus</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title style="color: rgb(255, 222, 89)"
                            >S'inscrire</v-list-item-title
                        >
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon color="amber">mdi-account</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title style="color: rgb(255, 222, 89)"
                            >Mon compte</v-list-item-title
                        >
                    </v-list-item>
                </v-list-item-group>
            </v-list>
            <div class="pa-2">
                <v-btn block class="amber">
                    Logout
                    <v-icon right color="black">mdi-exit-to-app</v-icon>
                </v-btn>
            </div>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    name: "NavBar",

    data: () => ({
        drawer: false,
        group: null,
    }),
};
</script>

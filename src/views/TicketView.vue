<template>
    <v-container fluid style="margin-top: 5vh; margin-bottom: 5vh;">
        <v-card style="margin: 5vh;">
            <v-card-title>
                <h2>Achat de billet</h2>
            </v-card-title>
            <v-card-subtitle v-if="currentUser">
                <h3>Connecté sur le compte : {{ user.login }}</h3>
            </v-card-subtitle>
            <v-card-subtitle v-else>
                <h3>Vous n'êtes pas connecté et vous devrez vous connecter pour acheter un billet</h3>
            </v-card-subtitle>
            <v-card style="margin: 5vh;" v-for="(ticket) in allTicket" :key="ticket.id_ticket">
                <v-card-title>
                    <h2>{{ ticket.type_ticket }}</h2>
                </v-card-title>
                <v-card-subtitle>
                    <h3>{{ ticket.price.normal_price }} €</h3>
                </v-card-subtitle>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="black" text @click="buyOneTicket(ticket.id_ticket)">Voir</v-btn>
                </v-card-actions>
            </v-card>
            <v-card-actions>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
    name: "BoughtTicketView",
    data: () => ({
        //
    }),
    computed: {
        ...mapState('ticket', ['allTicket']),
        ...mapGetters('auth', ['user']),
        currentUser() {
            if (this.user) {
                return this.user;
            }
            return null;
        }
    },
    methods: {
        buyOneTicket(id) {
            this.$router.push({ name: 'ticketId', params: { id: id } }).catch(() => {});
        },
    },
}
</script>

<style scoped>

</style>
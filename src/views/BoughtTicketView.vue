<template>
    <v-container fluid style="margin-top: 5vh; margin-bottom: 5vh;">
        <v-card style="margin: 5vh;">
            <v-card-title>
                <h2>Liste des dates disponibles pour le ticket {{ currentTicket.type_ticket }}</h2>
            </v-card-title>
            <v-card-subtitle>
                <h3>Connecté sur le compte : {{ user.login }}</h3>
            </v-card-subtitle>
            <v-card style="margin: 5vh;" v-for="(date, index) in validDate" :key="index">
                <v-card-title>
                    <h2>{{ date.date_start_validity }} jusqu'au {{ date.date_end_validity }}</h2>
                </v-card-title>
                <v-card-subtitle>
                    <h3>{{ currentTicket.price.normal_price }} €</h3>
                </v-card-subtitle>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="black" text @click="buyOneTicket(validDate[index])">Acheter</v-btn>
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
        ...mapState('ticket', ['date_validity_ticket']),
        ...mapGetters('auth', ['user']),
        ...mapGetters('ticket', ['currentTicket']),
        currentUser() {
            if (this.user) {
                return this.user;
            }
            return null;
        },
        validDate() {
            switch (this.$route.params.id) {
                case 2:
                    return this.date_validity_ticket.filter(date => {
                        let date_start_validity = new Date(date.date_start_validity.split('/').reverse().join('-'));
                        let date_end_validity = new Date(date.date_end_validity.split('/').reverse().join('-'));
                        let diff = date_end_validity - date_start_validity;
                        let days = diff / (1000 * 60 * 60 * 24) + 1;
                        return days === 2;
                    });
                case 3:
                    return this.date_validity_ticket.filter(date => {
                        let date_start_validity = new Date(date.date_start_validity.split('/').reverse().join('-'));
                        let date_end_validity = new Date(date.date_end_validity.split('/').reverse().join('-'));
                        let diff = date_end_validity - date_start_validity;
                        let days = diff / (1000 * 60 * 60 * 24) + 1;
                        return days === 3;
                    });
                case 4:
                    return this.date_validity_ticket.filter(date => {
                        let date_start_validity = new Date(date.date_start_validity.split('/').reverse().join('-'));
                        let date_end_validity = new Date(date.date_end_validity.split('/').reverse().join('-'));
                        let diff = date_end_validity - date_start_validity;
                        let days = diff / (1000 * 60 * 60 * 24) + 1;
                        return days === 4;
                    });
                case 5:
                    return this.date_validity_ticket.filter(date => {
                        let date_start_validity = new Date(date.date_start_validity.split('/').reverse().join('-'));
                        let date_end_validity = new Date(date.date_end_validity.split('/').reverse().join('-'));
                        let diff = date_end_validity - date_start_validity;
                        let days = diff / (1000 * 60 * 60 * 24) + 1;
                        return days === 5;
                    });
                default:
                    return this.date_validity_ticket.filter(date => {
                        let date_start_validity = new Date(date.date_start_validity.split('/').reverse().join('-'));
                        let date_end_validity = new Date(date.date_end_validity.split('/').reverse().join('-'));
                        let diff = date_end_validity - date_start_validity;
                        let days = diff / (1000 * 60 * 60 * 24) + 1;
                        return days === 1;
                    });
            }
        }
    },
    methods: {
        buyOneTicket(date) {
            console.log(date);
        },
    },
}
</script>

<style scoped>

</style>
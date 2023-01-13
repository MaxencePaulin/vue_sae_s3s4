<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
          <button name="button" class="button1" v-on:click="showTable1 = true, showTable2 = false, showTable3 = false, showTable4 = false">Jour 1</button>
          <button name="button" class="button1" v-on:click="showTable1 = false, showTable2 = true, showTable3 = false, showTable4 = false">Jour 2</button>
          <button name="button" class="button1" v-on:click="showTable1 = false, showTable2 = false, showTable3 = true, showTable4 = false">Jour 3</button>
          <button name="button" class="button1" v-on:click="showTable1 = false, showTable2 = false, showTable3 = false, showTable4 = true">Jour 4</button>
          <table v-if="showTable1">
            <thead>
            <tr>
              <th>Artiste</th>
              <th>Heure de passage</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(artist, i) in table1Data" :key="i">
              <td>{{ artist.name }}</td>
              <td>{{ artist.time }}</td>
            </tr>
            </tbody>
          </table>
          <table v-if="showTable2">
            <thead>
            <tr>
              <th>Artiste</th>
              <th>Heure de passage</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(artist, i) in table2Data" :key="i">
              <td>{{ artist.name }}</td>
              <td>{{ artist.time }}</td>
            </tr>
            </tbody>
          </table>
          <table v-if="showTable3">
            <thead>
            <tr>
              <th>Artiste</th>
              <th>Heure de passage</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(artist, i) in table3Data" :key="i">
              <td>{{ artist.name }}</td>
              <td>{{ artist.time }}</td>
            </tr>
            </tbody>
          </table>
          <table v-if="showTable4">
            <thead>
            <tr>
              <th>Artiste</th>
              <th>Heure de passage</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(artist, i) in table4Data" :key="i">
              <td>{{ artist.name }}</td>
              <td>{{ artist.time }}</td>
            </tr>
            </tbody>
          </table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: "PlanningView",
    data: () => ({
        showTable1: true,
        showTable2: false,
        showTable3: false,
        showTable4: false,
        // table1Data: [
        //   {name: 'Artiste 1', time: '20h00'},
        //   {name: 'Artiste 2', time: '21h00'},
        //   {name: 'Artiste 3', time: '22h00'}
        // ],
        table2Data: [
          {name: 'Artiste 4', time: '19h00'},
          {name: 'Artiste 5', time: '20h30'},
          {name: 'Artiste 6', time: '22h15'}
        ],
        table3Data: [
          {name: 'Artiste 7', time: '19h00'},
          {name: 'Artiste 8', time: '20h30'},
          {name: 'Artiste 9', time: '22h15'}
        ],
        table4Data: [
          {name: 'Artiste 10', time: '19h00'},
          {name: 'Artiste 11', time: '20h30'},
          {name: 'Artiste 12', time: '22h15'}
        ],
    }),
    computed: {
        ...mapGetters('concert', ['allConcerts']),
        table1Data() {
                let table1Data = [];
                for (let i = 0; i < this.allConcerts.length; i++) {
                    if (this.allConcerts[i].date_concert.startsWith() === '22/07/2023') { // conditions marche pas
                        table1Data.push(this.allConcerts[i].date_concert.slice(11));
                    }
                }
                return table1Data;
            },
    }
}
</script>

<style>
.button1 {
    background-color: #FFC300;
    border: none;
    font-weight: bold;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 20px 10px 250px 20px;
    cursor: pointer;
}

table{
    border-collapse: collapse;
    width: 30%;

}

th, td{
    border: 1px solid black;
}

</style>
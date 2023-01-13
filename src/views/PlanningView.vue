<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
          <div style="display: flex;align-items:center;justify-content: center">
              <v-btn color="amber" class="mx-6 mt-12 mb-12" @click="status = 1">Jour 1</v-btn>
              <v-btn color="amber" class="mx-6 mt-12 mb-12" @click="status = 2">Jour 2</v-btn>
              <v-btn color="amber" class="mx-6 mt-12 mb-12" @click="status = 3">Jour 3</v-btn>
              <v-btn color="amber" class="mx-6 mt-12 mb-12" @click="status = 4">Jour 4</v-btn>
              <v-btn color="amber" class="mx-6 mt-12 mb-12" @click="status = 5">Jour 5</v-btn>
          </div>
        <div class="center">
            <div  v-if="status === 1">
                <h1 style="text-align: center;color:#FFC107;margin-bottom: 5vh">Samedi 22 juillet 2023</h1>
                <v-data-table
                    :headers="headers"
                    :items="table1Data"
                    :sort-by="['time']"
                    :sort-desc="[true]"
                    class="elevation-1"
                    dark
                ></v-data-table>
            </div>
            <div  v-else-if="status === 2">
                <h1 style="text-align: center;color:#FFC107;margin-bottom: 5vh">Dimanche 23 juillet 2023</h1>
                <v-data-table
                    :headers="headers"
                    :items="table2Data"
                    :sort-by="['time']"
                    :sort-desc="[true]"
                    class="elevation-1"
                    dark
                ></v-data-table>
            </div>
            <div  v-else-if="status === 3">
                <h1 style="text-align: center;color:#FFC107;margin-bottom: 5vh">Lundi 24 juillet 2023</h1>
                <v-data-table
                    :headers="headers"
                    :items="table3Data"
                    :sort-by="['time']"
                    :sort-desc="[true]"
                    class="elevation-1"
                    dark
                ></v-data-table>
            </div>
            <div  v-else-if="status === 4">
                <h1 style="text-align: center;color:#FFC107;margin-bottom: 5vh">Mardi 25 juillet 2023</h1>
                <v-data-table
                    :headers="headers"
                    :items="table4Data"
                    :sort-by="['time']"
                    :sort-desc="[true]"
                    class="elevation-1"
                    dark
                ></v-data-table>
            </div>
            <div  v-else-if="status === 5">
                <h1 style="text-align: center;color:#FFC107;margin-bottom: 5vh">Mercredi 26 juillet 2023</h1>
                <v-data-table
                    :headers="headers"
                    :items="table5Data"
                    :sort-by="['time']"
                    :sort-desc="[true]"
                    class="elevation-1"
                    dark
                ></v-data-table>
            </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: "PlanningView",
    data: () => ({
        status: 1,
        headers: [
            {
                text: 'Artistes',
                align: 'start',
                sortable: true,
                value: 'name',
            },
            { text: 'Scene', value: 'scene' },
            { text: 'Heure de passage', value: 'time' },
        ],
    }),
    computed: {
        ...mapGetters('concert', ['allConcerts']),
        table1Data() {
            let table1Data = [];
            for (let i = 0; i < this.allConcerts.length; i++) {
                if (this.allConcerts[i].date_concert.startsWith('22/07/2023')) {
                    table1Data.push({
                        time: this.allConcerts[i].date_concert.slice(11),
                        name: this.allConcerts[i].artist.name,
                        scene: this.allConcerts[i].scene.libelle_scene,
                        id_artist: this.allConcerts[i].artist.id_artist,
                        id_scene: this.allConcerts[i].scene.id_scene,
                    });
                }
            }
            return table1Data;
        },
        table2Data() {
            let table2Data = [];
            for (let i = 0; i < this.allConcerts.length; i++) {
                if (this.allConcerts[i].date_concert.startsWith('23/07/2023')) {
                    table2Data.push({
                        time: this.allConcerts[i].date_concert.slice(11),
                        name: this.allConcerts[i].artist.name,
                        scene: this.allConcerts[i].scene.libelle_scene,
                        id_artist: this.allConcerts[i].artist.id_artist,
                        id_scene: this.allConcerts[i].scene.id_scene,
                    });
                }
            }
            return table2Data;
        },
        table3Data() {
            let table3Data = [];
            for (let i = 0; i < this.allConcerts.length; i++) {
                if (this.allConcerts[i].date_concert.startsWith('24/07/2023')) {
                    table3Data.push({
                        time: this.allConcerts[i].date_concert.slice(11),
                        name: this.allConcerts[i].artist.name,
                        scene: this.allConcerts[i].scene.libelle_scene,
                        id_artist: this.allConcerts[i].artist.id_artist,
                        id_scene: this.allConcerts[i].scene.id_scene,
                    });
                }
            }
            return table3Data;
        },
        table4Data() {
            let table4Data = [];
            for (let i = 0; i < this.allConcerts.length; i++) {
                if (this.allConcerts[i].date_concert.startsWith('25/07/2023')) {
                    table4Data.push({
                        time: this.allConcerts[i].date_concert.slice(11),
                        name: this.allConcerts[i].artist.name,
                        scene: this.allConcerts[i].scene.libelle_scene,
                        id_artist: this.allConcerts[i].artist.id_artist,
                        id_scene: this.allConcerts[i].scene.id_scene,
                    });
                }
            }
            return table4Data;
        },
        table5Data() {
            let table5Data = [];
            for (let i = 0; i < this.allConcerts.length; i++) {
                if (this.allConcerts[i].date_concert.startsWith('26/07/2023')) {
                    table5Data.push({
                        time: this.allConcerts[i].date_concert.slice(11),
                        name: this.allConcerts[i].artist.name,
                        scene: this.allConcerts[i].scene.libelle_scene,
                        id_artist: this.allConcerts[i].artist.id_artist,
                        id_scene: this.allConcerts[i].scene.id_scene,
                    });
                }
            }
            return table5Data;
        },
    }
}
</script>

<style>

.center{
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
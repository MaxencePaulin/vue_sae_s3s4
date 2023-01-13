<template>
  <div>
    <button v-on:click="showTable1 = true, showTable2 = false">Afficher tableau 1</button>
    <button v-on:click="showTable1 = false, showTable2 = true">Afficher tableau 2</button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTable1: true,
      showTable2: false,
      table1Data: [
        { name: 'Artiste 1', time: '20h00' },
        { name: 'Artiste 2', time: '21h00' },
        { name: 'Artiste 3', time: '22h00' }
      ],
      table2Data: [
        { name: 'Artiste 4', time: '19h00' },
        { name: 'Artiste 5', time: '20h30' },
        { name: 'Artiste 6', time: '22h15' }
      ]
    }
  }
}
</script>
<template> 
    <div id="planninTable">
        <table style="border: black solid 2px; border-collapse: collapse; width: 75%; text-align: center;">
            <tr style="background-color: #ffffff;">
              <th style="border: black solid 1px; width: 25%;"></th>
              <th style="border: black solid 1px;">Samedi</th>
              <th style="border: black solid 1px;">Dimanche</th>
              <th style="border: black solid 1px;">Lundi</th>
              <th style="border: black solid 1px;">Mardi</th>
            </tr>
            <tr>
                <td class="artist" style="border: black solid 1px;">Scene</td>
                <td class="artist" style="border: black solid 1px;">Artiste</td>
                <td class="artist" style="border: black solid 1px;">Artiste</td>
                <td class="artist" style="border: black solid 1px;">Artiste</td>
                <td class="artist" style="border: black solid 1px;">Artiste</td>
            </tr>
            <tr>
                <td class="artist" style="border: black solid 1px;">Scene</td>
                <td class="artist" style="border: black solid 1px;">Artiste</td>
                <td class="artist" style="border: black solid 1px;">Artiste</td>
                <td class="artist" style="border: black solid 1px;">Artiste</td>
                <td class="artist" style="border: black solid 1px;">Artiste</td>
            </tr>
            <tr>
                <td class="artist" style="border: black solid 1px;">Scene</td>
                <td class="artist" style="border: black solid 1px;"></td>
                <td class="artist" style="border: black solid 1px;">Artiste</td>
                <td class="artist" style="border: black solid 1px;">Artiste</td>
                <td class="artist" style="border: black solid 1px;">Artiste</td>
            </tr>
            <tr>
                <td class= "artist" style="border: black solid 1px;">Scene</td>
                <td class= "artist" style="border: black solid 1px;">Artiste</td>
                <td class= "artist" style="border: black solid 1px;">Artiste</td>
                <td class= "artist" style="border: black solid 1px;">Artiste</td>
                <td class= "artist" style="border: black solid 1px;">Artiste</td>
            </tr>
        </table>
    </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
    name: "PlanningView",
    computed: {
        ...mapGetters('artist', ['artist']),
    }
}
</script>

<style>
table {
    margin: auto;
    margin-top: 10%;
}
tr {
    height: 50px;
}
.artist {
    color: #ffc107
}

</style>
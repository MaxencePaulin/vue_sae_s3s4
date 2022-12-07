<template>
    <div v-if="totalPages() > 0" class="pagination-wrapper">
        <v-btn
            class="pagination
            btn"
            :disabled="currentPage === 0"
            style="margin-right: 10px"
            @click="updatePage(currentPage - 1)"
        >
            <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <span class="pagination-info">
            {{ currentPage + 1 }} / {{ totalPages() }}
        </span>
        <v-btn
            class="pagination
            btn"
            style="margin-left: 10px"
            :disabled="currentPage >= totalPages() - 1"
            @click="updatePage(currentPage + 1)"
        >
            <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
    name: "PaginationComponent",
    props: ['artists','currentPage', 'perPage'],
    methods: {
        updatePage(pageNumber) {
            this.$emit('page-update', pageNumber);
        },
        totalPages() {
            return Math.ceil(this.artists.length / this.perPage);
        },
    }
}
</script>

<style scoped>
.pagination-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 50px;
}
</style>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <SearchIndex />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <SearchResults></SearchResults>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="text-center">
          <v-pagination
            dark
            v-model="page"
            :length="15"
            :total-visible="7"
            circle
            :disabled="!hasFieldSearchText"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SearchIndex from './Search/SearchIndex';
import SearchResults from './Search/SearchResults';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'BestTable',
  components: {
    SearchIndex,
    SearchResults,
  },
  data: () => ({
    page: 1,
  }),
  computed: {
    ...mapState('search', ['searchText']),
    hasFieldSearchText() {
      return Boolean(this.searchText.length);
    }
  },
  watch: {
    page(value) {
      this.changePage(value - 1);
    },
  },
  created() {},
  methods: {
    ...mapActions('search', ['changePage']),
  },
};
</script>

<style lang="scss">
.table {
  .ais-Hits-item {
    width: 100%;
    margin: 0 0 0.5em;
  }
  .ais-Pagination {
    margin: 50px 0 0;
  }
}
</style>

<template>
  <div class="Index">
    <v-text-field
      v-model="searchInput"
      placeholder="search all of npm"
    ></v-text-field>
    <slot></slot>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'SearchIndex',
  data: () => ({
    searchInput: '',
  }),
  computed: {
    ...mapState('search', ['client']),
  },
  watch: {
    searchInput(value) {
      this.search(value);
    },
  },
  created() {
    this.firstInit();
    this.client.then(() => {
      this.initIndex();
      this.search('');
    });
  },
  destroyed() {
    this.destroyIndex();
    this.destroyClient();
  },
  methods: {
    ...mapActions('search', [
      'initIndex',
      'search',
      'destroyIndex',
      'initClient',
      'destroyClient',
      'firstInit',
    ]),
  },
};
</script>

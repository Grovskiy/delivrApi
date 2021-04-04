<template>
  <div class="search-results">
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Version</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="search-results__item"
            v-for="item in hits"
            :key="item.objectID"
          >
            <td @click="showModal(item)">
              <strong>{{ item.name }}</strong>
              <br />
              <i v-if="item.repository" class="text">{{
                item.repository.user
              }}</i>
              <i v-else class="text">{{ '-' }}</i>
            </td>
            <td>{{ item.version }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-dialog v-model="dialog" width="800" @click:outside="hiddenModal">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          <div class="search-results-item__img">
            <img
              v-if="dialogContent.owner"
              :src="dialogContent.owner.avatar"
              alt=""
            />
          </div>
          {{ dialogContent.name }}
          {{ dialogContent.version }}
        </v-card-title>
        <div class="search-results-item__body">
          <div>{{ dialogContent.description }}</div>
          <a v-if="dialogContent.homepage" :href="dialogContent.homepage">{{
            dialogContent.homepage
          }}</a>
          <br />
          <a v-if="dialogContent.owner" :href="dialogContent.owner.link">{{
            dialogContent.owner.link
          }}</a>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="hiddenModal"> Ok </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SearchResults',
  data: () => ({
    dialog: false,
    dialogContent: {},
  }),
  computed: {
    ...mapGetters('search', ['response']),
    hits() {
      const response = this.response();
      return response && response.hits;
    },
  },
  methods: {
    showModal(content) {
      this.dialog = true;
      this.setDialogContent(content);
    },
    hiddenModal() {
      this.dialog = false;
      this.setDialogContent({});
    },
    setDialogContent(content) {
      this.dialogContent = content;
    },
  },
};
</script>

<style lang="scss" scoped>
.search-results {
  &__item {
    cursor: pointer;
  }
}
.search-results-item {
  &__img {
    width: 80px;
    height: 80px;
    margin-right: 20px;
    img {
      width: 100%;
    }
  }
  &__body {
    padding: 20px 25px;
  }
}
</style>

<template>
  <v-footer class="footer" dark padless>
    <v-card class="flex" flat tile>
      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Grovskiy</strong>
        <a
          v-for="item in contacts"
          :key="item.link"
          :href="item.link"
          class="mx-1 footer__link"
          target="_blank"
        >
          <v-icon size="24px">
            {{ item.icon }}
          </v-icon>
        </a>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'TheFooter',
  data: () => ({
    contacts: [
      { link: 'https://github.com/Grovskiy', icon: 'mdi-github' },
      { link: 'https://t.me/grovskiy', icon: 'mdi-telegram' },
    ],
  }),
};
</script>

<style scoped lang="scss">
.footer {
  &__link {
    text-decoration: none;
  }
}
</style>

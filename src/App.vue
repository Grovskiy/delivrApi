<template>
  <v-app>
    <v-main>
      <BestTable />
    </v-main>
    <TheFooter />
  </v-app>
</template>

<script>
import BestTable from '@/components/BestTable';
import TheFooter from '@/components/TheFooter';

export default {
  name: 'App',
  components: {
    BestTable,
    TheFooter,
  },
};
</script>

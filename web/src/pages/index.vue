<template>
  <div class="mt-4 text-2xl">
    <div
      class="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto mt-4 gap-10"
    >
      <TheCard v-for="card in cards" :key="card.name" :card="card" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useFetch,
  useStore,
} from '@nuxtjs/composition-api';
import TheCard from '@/components/UI/Card.vue';
import { Card } from '@/types/card';

export default defineComponent<Card[]>({
  components: { TheCard },
  setup() {
    const store = useStore();
    const cards = ref<Card[]>();
    useFetch(async () => {
      cards.value = await store.dispatch('getUsers');
    });
    return { cards };
  },
});
</script>

<style>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  /* font-size: 100px; */
  color: #35495e;
  /* letter-spacing: 1px; */
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

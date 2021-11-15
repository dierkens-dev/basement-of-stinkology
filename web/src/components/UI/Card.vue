<template>
  <div
    class="border-2 border-black rounded-lg grid grid-cols-2 gap-4 m-auto w-full"
  >
    <div class="text-sm align-text-bottom mt-2">{{ card.name }}</div>
    <div class="row-span-3 rounded-full bg-blue-500 h-40 w-40 m-2"></div>
    <div class="text-3xl">{{ card.gamertag }}</div>
    <div class="">{{ card.description }}</div>
    <AppButton class="m-2.5 w-24 border-black text-lg border-4"
      >Profile</AppButton
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import AppButton from '@/components/UI/AppButton.vue';
import { Card } from '@/store/card';

export default defineComponent<Card>({
  name: 'TheCard',
  components: { AppButton },
  props: {
    card: {
      type: Object,
      default: () => ({
        name: 'First Lastname',
        description: 'Lorem ipsum dolor sit amet...',
        gamertag: 'Gamertag',
        avatar: '',
      }),
    },
  },
  setup() {
    return {};
  },
});
</script>

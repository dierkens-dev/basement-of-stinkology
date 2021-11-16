<template>
  <div class="border-2 border-black rounded-lg grid grid-cols-2 mx-4">
    <div class="text-sm mt-4 ml-4">{{ card.name }}</div>
    <div
      class="row-span-3 rounded-full bg-blue-500 h-20 w-20 lg:h-40 lg:w-40 ml-8 mt-2 lg:ml-4"
    ></div>
    <div class="text-3xl ml-4">{{ card.gamertag }}</div>
    <div class="ml-4">{{ card.description }}</div>
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

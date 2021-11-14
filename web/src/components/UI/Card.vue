<template>
  <div class="border-2 border-black rounded-lg grid grid-cols-2 gap-4 w-96 m-3">
    <div class="text-sm align-text-bottom mt-2">{{ name }}</div>
    <div class="row-span-3 rounded-full bg-blue-500 h-40 w-40 m-2"></div>
    <div class="text-3xl">{{ gamertag }}</div>
    <div class="">{{ description }}</div>
    <AppButton class="m-2.5 w-24 border-black text-lg border-4"
      >Profile</AppButton
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import AppButton from '@/components/UI/AppButton.vue';

export default defineComponent({
  name: 'TheCard',
  components: { AppButton },
  setup() {
    const name: String = 'First Lastname';
    const description: String = 'Lorem ipsum dolor sit amet...';
    const gamertag: String = 'Gamertag';
    return { name, description, gamertag };
  },
});
</script>

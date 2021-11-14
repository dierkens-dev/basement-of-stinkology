<template>
  <div>
    <p>Avatar</p>
    <p>{{ gamertag }}</p>
    <p>{{ name }}</p>
    <p>{{ description }}</p>
    <app-button class="block mt-5 p-3">Button</app-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import AppButton from './AppButton.vue';

export default defineComponent({
  name: 'TheCard',
  components: { AppButton },
  setup() {
    const name: String = 'Name';
    const description: String = 'Description';
    const gamertag: String = 'Gamertag';
    return { name, description, gamertag };
  },
});
</script>

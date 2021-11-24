<template>
  <div
    class="rounded-full h-24 w-24 flex items-center justify-center bg-blue-500"
  >
    <img :src="require(`../../assets/${iconImage}`)" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'TheAchievement',
  props: {
    iconImage: {
      type: String,
      default: 'drink.png',
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>

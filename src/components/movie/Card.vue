<script lang="ts" setup>
import type { Serialize } from "nitropack";
import type { Movie } from "~/services/prisma.server";

defineProps({
  movie: {
    type: Object as PropType<Partial<Serialize<Movie>>>,
    required: true,
  },
  isNew: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    class="shadow-xl relative basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 indicator"
  >
    <span
      v-if="isNew"
      class="indicator-item badge badge-primary badge-lg transform-none"
      >new</span
    >
    <NuxtImg
      v-if="movie.poster"
      :src="movie.poster"
      width="250px"
      height="375px"
      class="object-contain shadow-xl w-full"
    />
    <slot />
  </div>
</template>

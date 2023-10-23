<script lang="ts" setup>
const { hash } = useRoute();
const { data: watchListMovie } = useFetch(`/api/users/me/watch-list`);
</script>

<template>
  <div>
    <NuxtPage />

    <NuxtLink
      to="/users/me/watch-list/add-movie"
      class="btn btn-circle btn-primary fixed right-3 bottom-3"
    >
      <v-icon name="px-plus" />
      <span class="sr-only">Add Movie</span>
    </NuxtLink>

    <div class="container p-3 mx-auto my-3">
      <div v-if="watchListMovie" class="flex flex-wrap gap-3 justify-center">
        <div
          v-for="{ movie } in watchListMovie"
          :id="movie.id"
          :key="movie.id"
          class="shadow-xl relative basis-full sm:basis-1/3 md:basis-1/4 lg:basis-1/5 indicator"
        >
          <span
            v-if="hash.replace('#', '') === movie.id"
            class="indicator-item badge badge-primary"
            >new</span
          >
          <NuxtImg
            :src="movie.poster"
            width="250px"
            height="375px"
            class="object-contain w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

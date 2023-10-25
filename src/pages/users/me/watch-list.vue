<script lang="ts" setup>
const { hash } = useRoute();
const { data: watchListMovie } = useFetch(`/api/users/me/watch-list`);
</script>

<template>
  <div>
    <NuxtPage />

    <NuxtLink
      to="/users/me/watch-list/add-movie"
      class="btn btn-circle btn-primary fixed right-3 bottom-3 z-10"
    >
      <v-icon name="px-plus" />
      <span class="sr-only">Add Movie</span>
    </NuxtLink>

    <div class="container p-3 mx-auto my-3 w-screen sm:w-auto">
      <div v-if="watchListMovie" class="flex flex-wrap gap-3 justify-center">
        <MovieCard
          v-for="{ movie } in watchListMovie"
          :id="movie.id"
          :key="movie.id"
          :movie="movie"
          :is-new="hash.replace('#', '') === movie.id"
        />
      </div>
    </div>
  </div>
</template>

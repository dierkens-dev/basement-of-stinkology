<script lang="ts" setup>
useHead({
  title: () => "Default Watch List - Basement of Stinkology",
});

const { hash } = useRoute();

// Fetch the default watch list
const { data: watchListMovies } = useFetch(`/api/users/me/watch-list/default`, {
  key: "/users/me/watch-list/default",
});

const { data } = useAuth();
const user = data.value?.user;
</script>

<template>
  <div>
    <NuxtPage />

    <div class="container p-3 mx-auto mt-3 mb-14 w-screen sm:w-auto">
      <h1 class="text-3xl font-bold">Default Watch List</h1>
      <p class="text-base-content/70 mb-4">
        Movies from your original watch list (before event-specific lists were
        introduced)
      </p>
      <div class="divider"></div>

      <div
        v-if="watchListMovies && watchListMovies.length > 0"
        class="flex flex-wrap gap-3 justify-center"
      >
        <MovieCard
          v-for="{ movie, id } in watchListMovies"
          :id="movie.id"
          :key="movie.id"
          :movie="movie"
          :is-new="hash.replace('#', '') === movie.id"
          tabindex="0"
          class="group"
        />
      </div>

      <div v-else-if="watchListMovies" class="text-center py-12">
        <div class="text-6xl mb-4">🎬</div>
        <h3 class="text-xl font-semibold mb-2">
          No movies in your default watch list
        </h3>
        <p class="text-base-content/70">
          Your original watch list items will appear here. These are movies that
          were added before event-specific watch lists were introduced.
        </p>
      </div>

      <div v-else class="flex justify-center py-12">
        <div class="loading loading-bars loading-lg"></div>
      </div>
    </div>
  </div>
</template>

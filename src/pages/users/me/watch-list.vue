<script lang="ts" setup>
import { isEditor } from "~/services/prisma.client";

useHead({
  title: () => "Watch List - Basement of Stinkology",
});

const { hash } = useRoute();
const { data: watchListMovies } = useFetch(`/api/users/me/watch-list`, {
  key: "/users/me/watch-list",
});

// Fetch the active event details
const { data: activeEvent } = useFetch("/api/events/active");

const { data } = useAuth();
const user = data.value?.user;
</script>

<template>
  <div>
    <NuxtPage />

    <NuxtLink
      v-if="isEditor(user)"
      to="/users/me/watch-list/add-movie"
      class="btn btn-circle btn-primary fixed right-3 bottom-3 z-10"
    >
      <v-icon name="px-plus" />
      <span class="sr-only">Add Movie</span>
    </NuxtLink>

    <div class="container p-3 mx-auto mt-3 mb-14 w-screen sm:w-auto">
      <h1 class="text-3xl font-bold">
        {{ activeEvent?.data?.name || "Current Event" }} Watch List
      </h1>
      <p class="text-base-content/70 mb-4" v-if="activeEvent?.data">
        Movies you want to watch for {{ activeEvent.data.name }}
        <span v-if="activeEvent.data.year">({{ activeEvent.data.year }})</span>
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
        >
          <div
            v-if="isEditor(user)"
            class="absolute bg-base-100 text-base bg-opacity-90 bottom-0 w-full p-2 shadow-inner font-mono hidden group-hover:flex group-focus-within:flex justify-end"
          >
            <NuxtLink
              :to="{
                path: '/users/me/watch-list/remove-movie',
                query: {
                  id,
                },
              }"
              class="btn btn-circle btn-error btn-sm"
            >
              <span class="sr-only"
                >Remove {{ movie.title }} from your watch list.</span
              >
              <v-icon name="px-trash" />
            </NuxtLink>
          </div>
        </MovieCard>
      </div>

      <div v-else-if="watchListMovies" class="text-center py-12">
        <div class="text-6xl mb-4">🎬</div>
        <h3 class="text-xl font-semibold mb-2">No movies in your watch list</h3>
        <p class="text-base-content/70">
          Movies you want to watch for
          {{ activeEvent?.data?.name || "this event" }} will appear here.
        </p>
      </div>

      <div v-else class="flex justify-center py-12">
        <div class="loading loading-bars loading-lg"></div>
      </div>
    </div>
  </div>
</template>

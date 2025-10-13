<script lang="ts" setup>
import { isEditor } from "~/services/prisma.client";

const { params } = useRoute();
const slug = params.slug as string;

useHead({
  title: () => `Watch List - ${slug} - Basement of Stinkology`,
});

const { hash } = useRoute();

// Fetch the event details
const { data: event } = await useFetch(`/api/events/${slug}`);

// Fetch the watch list for this specific event
const { data: watchListMovies } = useFetch(`/api/events/${slug}/watch-list`, {
  key: `/events/${slug}/watch-list`,
});

const { data } = useAuth();
const user = data.value?.user;
</script>

<template>
  <div>
    <NuxtPage />

    <div class="container p-3 mx-auto mt-3 mb-14 w-screen sm:w-auto">
      <div class="flex items-center gap-3 mb-4">
        <NuxtLink
          to="/events"
          class="btn btn-ghost btn-sm"
          aria-label="Back to events"
        >
          <v-icon name="px-arrow-left" />
        </NuxtLink>
        <div>
          <h1 class="text-3xl font-bold">{{ event?.data?.name }} Watch List</h1>
          <p class="text-sm opacity-70" v-if="event?.data?.year">
            {{ event.data.year }}
          </p>
        </div>
      </div>

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
        <h3 class="text-xl font-semibold mb-2">No movies in this watch list</h3>
        <p class="text-base-content/70">
          No movies were added to the watch list for this event.
        </p>
      </div>

      <div v-else class="flex justify-center py-12">
        <div class="loading loading-bars loading-lg"></div>
      </div>
    </div>
  </div>
</template>

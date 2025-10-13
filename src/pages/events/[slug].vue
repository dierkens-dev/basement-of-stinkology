<script lang="ts" setup>
import { isAdmin, isEditor } from "~/services/prisma.client";

const { params, hash } = useRoute();

const slug = params.slug;

useHead({
  title: () => `${slug} - Events - Basement of Stinkology`,
});

const { data: event } = useFetch(`/api/events/${slug}`, {
  key: `events/${slug}`,
});
const { data: movies } = useFetch(`/api/events/${slug}/movies`, {
  key: `${slug}/movies`,
});
const { data: watchListMovies } = useFetch(`/api/events/${slug}/watch-list`, {
  key: `${slug}/watch-list`,
});

const { data } = useAuth();
const user = data.value?.user;
</script>

<template>
  <div>
    <NuxtPage />

    <div
      v-if="isEditor(user) && !event?.data?.isLocked"
      class="fixed right-3 bottom-3 z-10 flex gap-3"
    >
      <NuxtLink
        v-if="isAdmin(user) && !event?.data?.activeEvent"
        class="btn btn-circle btn-success"
        :to="`/events/${slug}/set-event-active`"
      >
        <v-icon name="px-forward" />
        <span class="sr-only">Set Event Active</span>
      </NuxtLink>

      <NuxtLink
        v-if="isAdmin(user)"
        class="btn btn-circle btn-accent"
        :to="`/events/${slug}/lock-event`"
      >
        <v-icon name="px-lock" />
        <span class="sr-only">Lock Event</span>
      </NuxtLink>

      <NuxtLink
        class="btn btn-circle btn-secondary"
        :to="`/events/${slug}/upload-backdrop`"
      >
        <v-icon name="px-image" />
        <span class="sr-only">Upload Backdrop Image</span>
      </NuxtLink>

      <NuxtLink
        class="btn btn-circle btn-primary"
        :to="`/events/${slug}/log-movie`"
      >
        <v-icon name="px-plus" />
        <span class="sr-only">Log Movie</span>
      </NuxtLink>
    </div>

    <div
      v-else-if="isAdmin(user) && event?.data?.isLocked"
      class="fixed right-3 bottom-3 z-10 flex gap-3"
    >
      <NuxtLink
        class="btn btn-circle btn-accent"
        :to="`/events/${slug}/unlock-event`"
      >
        <v-icon name="px-lock" />
        <span class="sr-only">Unlock Event</span>
      </NuxtLink>
    </div>

    <div
      v-if="event?.data"
      class="hero min-h-[calc(100vh-62px)]"
      :style="`background-image: url(${event.data.backdropUrl});`"
    >
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content">
        <div>
          <h1 class="mb-5 text-5xl font-bold">{{ event.data.name }}</h1>
          <h2 v-if="event.data.year">
            {{ event.data.year }}
          </h2>
        </div>
      </div>
    </div>

    <div class="container p-3 mx-auto my-3 w-screen sm:w-auto">
      <!-- Movies Watched Section -->
      <div class="mb-12">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold mb-2">Movies Watched</h2>
          <p class="text-base-content/70">
            Movies that were actually viewed during this event
          </p>
        </div>

        <div
          v-if="movies?.data && movies.data.movieViewing.length > 0"
          class="flex flex-wrap gap-3 justify-center"
        >
          <MovieCard
            v-for="{ movie, viewingTime, id } in movies.data.movieViewing"
            :id="movie.id"
            :key="movie.id"
            tabindex="0"
            :movie="movie"
            :is-new="hash.replace('#', '') === movie.id"
            class="group"
          >
            <div
              class="absolute bg-base-100 text-base bg-opacity-90 bottom-0 w-full p-2 shadow-inner font-mono flex justify-between items-center"
            >
              <span class="py-2">
                <v-icon scale="1.5" name="px-eye" />
                {{
                  new Date(viewingTime).toLocaleString(undefined, {
                    weekday: "short",
                    hour: "numeric",
                    minute: "numeric",
                  })
                }}
              </span>

              <span
                v-if="isEditor(user) && !event?.data?.isLocked"
                class="gap-2 hidden group-hover:flex group-focus-within:flex"
              >
                <NuxtLink
                  :to="{
                    path: `/events/${slug}/edit-movie`,
                    query: {
                      id,
                    },
                  }"
                  class="btn btn-circle btn-primary btn-sm"
                >
                  <span class="sr-only">Edit {{ movie.title }}.</span>
                  <v-icon name="px-edit" />
                </NuxtLink>

                <NuxtLink
                  :to="{
                    path: `/events/${slug}/remove-movie`,
                    query: {
                      id,
                    },
                  }"
                  class="btn btn-circle btn-error btn-sm"
                >
                  <span class="sr-only">Remove {{ movie.title }}.</span>
                  <v-icon name="px-trash" />
                </NuxtLink>
              </span>
            </div>
          </MovieCard>
        </div>

        <div v-else-if="movies?.data" class="text-center py-12">
          <div class="text-6xl mb-4">🎬</div>
          <h3 class="text-xl font-semibold mb-2">No movies watched yet</h3>
          <p class="text-base-content/70">
            Movies watched during this event will appear here
          </p>
        </div>
      </div>

      <!-- Watch List Section -->
      <div v-if="isEditor(user)">
        <div class="divider"></div>
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold mb-2">Your Watch List</h2>
          <p class="text-base-content/70">
            Movies you wanted to watch for this event
          </p>
        </div>

        <div
          v-if="watchListMovies && watchListMovies.length > 0"
          class="flex flex-wrap gap-3 justify-center"
        >
          <MovieCard
            v-for="{ movie, id } in watchListMovies"
            :id="movie.id"
            :key="movie.id"
            :movie="movie"
            tabindex="0"
            class="group"
          />
        </div>

        <div v-else-if="watchListMovies" class="text-center py-12">
          <div class="text-6xl mb-4">📝</div>
          <h3 class="text-xl font-semibold mb-2">
            No movies in your watch list
          </h3>
          <p class="text-base-content/70">
            Movies you planned to watch for this event will appear here
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

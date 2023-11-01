<script lang="ts" setup>
import { RoleLevel } from "~/services/prisma";

const { params, hash } = useRoute();

const slug = params.slug;

const { data: event } = useFetch(`/api/events/${slug}`, {
  key: `events/${slug}`,
});
const { data: movies } = useFetch(`/api/events/${slug}/movies`, {
  key: `${slug}/movies`,
});

const { data } = useAuth();
const user = data.value?.user;
const isEditor =
  user && user.emailVerified && RoleLevel[user.role] >= RoleLevel["EDITOR"];
</script>

<template>
  <div>
    <NuxtPage />

    <div class="fixed right-10 bottom-3 z-10 flex gap-3">
      <NuxtLink
        v-if="isEditor"
        class="btn btn-circle btn-secondary"
        :to="`/events/${slug}/upload-backdrop`"
      >
        <v-icon name="px-image" />
        <span class="sr-only">Upload Backdrop Image</span>
      </NuxtLink>

      <NuxtLink
        v-if="isEditor"
        class="btn btn-circle btn-primary"
        :to="`/events/${slug}/log-movie`"
      >
        <v-icon name="px-plus" />
        <span class="sr-only">Log Movie</span>
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
          <h2 v-if="event.data.date">
            {{
              new Date(event.data.date).toLocaleString(undefined, {
                year: "numeric",
              })
            }}
          </h2>
        </div>
      </div>
    </div>

    <div class="container p-3 mx-auto my-3 w-screen sm:w-auto">
      <div v-if="movies?.data" class="flex flex-wrap gap-3 justify-center">
        <MovieCard
          v-for="{ movie, viewDateTime } in movies.data.MovieViews"
          :id="movie.id"
          :key="movie.id"
          :movie="movie"
          :is-new="hash.replace('#', '') === movie.id"
        >
          <div
            class="absolute bg-base-100 text-base bg-opacity-90 bottom-0 w-full p-2 shadow-inner font-mono"
          >
            <v-icon scale="1.5" name="px-eye" />
            {{
              new Date(viewDateTime).toLocaleString(undefined, {
                weekday: "short",
                hour: "numeric",
                minute: "numeric",
              })
            }}
          </div>
        </MovieCard>
      </div>
    </div>
  </div>
</template>

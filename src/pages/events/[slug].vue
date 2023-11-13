<script lang="ts" setup>
import { isEditor } from "~/services/prisma.client";

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

const { data } = useAuth();
const user = data.value?.user;
</script>

<template>
  <div>
    <NuxtPage />

    <div v-if="isEditor(user)" class="fixed right-3 bottom-3 z-10 flex gap-3">
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
          v-for="{ movie, viewDateTime, id } in movies.data.MovieViews"
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
                new Date(viewDateTime).toLocaleString(undefined, {
                  weekday: "short",
                  hour: "numeric",
                  minute: "numeric",
                })
              }}
            </span>

            <span
              v-if="isEditor(user)"
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
    </div>
  </div>
</template>

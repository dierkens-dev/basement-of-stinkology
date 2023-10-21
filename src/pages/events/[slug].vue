<script lang="ts" setup>
const { params } = useRoute();

const slug = params.slug;
const { data: event } = useFetch(`/api/events/${slug}`);
const { data: movies } = useFetch(`/api/events/${slug}/movies`);
</script>

<template>
  <div>
    <NuxtPage />

    <NuxtLink
      class="btn btn-circle btn-primary fixed right-3 bottom-3"
      :to="`/events/${slug}/log-movie`"
    >
      <v-icon name="px-plus" />
      <span class="sr-only">Log Movie</span>
    </NuxtLink>
    <div
      class="hero min-h-[calc(100vh-62px)]"
      style="
        background-image: url(https://www.themoviedb.org/t/p/original/fV93xMMLvbRBIbj5pplYyRwNH88.jpg);
      "
    >
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content">
        <div>
          <h1 class="mb-5 text-5xl font-bold">{{ event.data.name }}</h1>
          <h2>
            {{
              new Date(event.data.date).toLocaleString(undefined, {
                year: "numeric",
              })
            }}
          </h2>
        </div>
      </div>
    </div>

    <div class="container mx-auto my-3">
      <div class="flex flex-wrap gap-3 justify-center">
        <div
          v-for="{ movie, viewDateTime } in movies.data.MovieViews"
          :key="movie.id"
          class="shadow-xl relative"
        >
          <NuxtImg
            :src="movie.poster"
            width="250px"
            height="375px"
            class="object-contain"
          />
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
        </div>
      </div>
    </div>
  </div>
</template>
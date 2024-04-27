<script lang="ts" setup>
import { isEditor } from "~/services/prisma.client";

useHead({
  title: () => "What to Watch - Movies - Basement of Stinkology",
});

const { data, refresh } = useFetch(`/api/watch-lists/movies`);
const { query } = useRoute();
const { push } = useRouter();
const auth = useAuth();
const currentUser = auth.data.value?.user;

const showWatched = ref(
  typeof query.showWatched === "string" && query.showWatched === "true",
);

watch(showWatched, (value) => {
  push({
    query: {
      ...query,
      showWatched: String(value),
    },
  });
});

const isSubmitting = ref<number | null>(null);
async function handleAddMovieClick(moviedbId: number) {
  isSubmitting.value = moviedbId;

  try {
    await $fetch("/api/users/me/watch-list", {
      method: "POST",
      body: {
        moviedbId,
      },
    });

    await refresh();
  } finally {
    isSubmitting.value = null;
  }
}
</script>

<template>
  <div>
    <NuxtPage />

    <NuxtLink
      v-if="isEditor(currentUser)"
      to="/movies/what-to-watch/add-movie"
      class="btn btn-circle btn-primary fixed right-3 bottom-3 z-10"
    >
      <v-icon name="px-plus" />
      <span class="sr-only">Add Movie</span>
    </NuxtLink>
    <div class="container p-3 mx-auto my-3 w-screen sm:w-auto">
      <div class="flex justify-between">
        <h1 class="text-3xl font-bold">What to watch</h1>
        <div class="form-control">
          <label class="label cursor-pointer gap-2">
            <span class="label-text">Show Watched</span>
            <input v-model="showWatched" type="checkbox" class="toggle" />
          </label>
        </div>
      </div>
      <div class="divider"></div>
      <div v-if="data" class="flex flex-wrap gap-3 justify-center">
        <div
          v-for="{ movie, users } in data.results"
          :key="movie.id"
          class="card card-side bg-base-100 shadow-xl flex-col grow xl:max-w-[50%] sm:flex-row basis-full xl:basis-5/12"
          :class="{
            'grayscale relative indicator opacity-50':
              movie._count.MovieViews > 0,
            hidden: !showWatched && movie._count.MovieViews > 0,
          }"
        >
          <span
            v-if="movie._count.MovieViews > 0"
            class="badge badge-primary indicator-item indicator-center indicator-middle px-8 h-12 text-xl gap-2"
            ><v-icon name="px-eye" scale="2.0" />Watched</span
          >
          <figure class="w-full sm:w-40 shrink-0">
            <NuxtImg
              class="object-cover hidden sm:block"
              :src="movie.poster"
              alt="Movie"
            />
            <NuxtImg
              class="object-cover sm:hidden"
              :src="movie.backdrop"
              alt="Movie"
            />
          </figure>
          <div class="card-body">
            <h2 class="text-xl font-bold">
              <span>
                {{ movie.title }}
              </span>
              <span v-if="typeof movie.releaseDate === 'string'">
                ({{
                  new Date(movie.releaseDate).toLocaleString(undefined, {
                    year: "numeric",
                  })
                }})
              </span>
            </h2>
            <p class="text-sm flex flex-wrap gap-2 items-center">
              <span v-if="typeof movie.releaseDate === 'string'">
                {{
                  new Date(movie.releaseDate).toLocaleString(undefined, {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })
                }}
              </span>

              <span
                v-for="genre in movie.genres"
                :key="genre as string"
                class="badge badge-outline badge-sm rounded-full"
                >{{ genre }}</span
              >

              <span>
                <span
                  v-if="
                    typeof movie.runtime === 'number' && movie.runtime >= 60
                  "
                >
                  {{ Math.floor(movie.runtime / 60) }}h
                </span>
                <span v-if="typeof movie.runtime === 'number'">
                  {{ movie.runtime % 60 }}m
                </span>
              </span>
            </p>

            <p class="italic">{{ movie.tagline }}</p>

            <div class="flex items-center gap-3 flex-wrap">
              <div
                v-if="typeof movie.voteAverage === 'number'"
                :class="{
                  'radial-progress text-xs': true,
                  'text-success': movie.voteAverage > 6,
                  'text-warning':
                    movie.voteAverage > 3 && movie.voteAverage <= 6,
                  'text-error': movie.voteAverage <= 3,
                }"
                :style="`--value: ${movie.voteAverage * 10}; --size: 3rem`"
              >
                {{ Math.floor(movie.voteAverage * 10) }}%
              </div>

              <div class="flex -space-x-1">
                <div
                  v-for="user in users"
                  :key="user.id"
                  :title="user.email"
                  class="relative tooltip"
                  :data-tip="user.nickname || user.name || user.email"
                >
                  <div v-if="user.avatar">
                    <div
                      class="w-10 h-10 bg-base-100 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden"
                    >
                      <img
                        class="object-cover w-full h-full"
                        :src="user.avatar"
                      />
                    </div>
                  </div>
                  <div v-else class="avatar placeholder">
                    <div
                      class="bg-neutral text-neutral-content rounded-full w-10 h-10 ring ring-primary ring-offset-base-100 ring-offset-2"
                    >
                      <span class="text-xl uppercase">{{ user.email[0] }}</span>
                    </div>
                  </div>
                </div>

                <SubmitButton
                  v-if="
                    currentUser &&
                    users.findIndex((user) => user.id === currentUser?.id) ===
                      -1
                  "
                  :is-loading="isSubmitting === movie.themoviedbId"
                  :disabled="isSubmitting === movie.themoviedbId"
                  class="btn btn-circle btn-primary relative text-neutral-content rounded-full w-10 h-10 min-h-fit ring ring-primary ring-offset-base-100 ring-offset-2"
                  @click="handleAddMovieClick(movie.themoviedbId)"
                >
                  <v-icon name="px-user-plus" scale="1" />
                </SubmitButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="loading loading-bars loading-lg"></div>
    </div>
  </div>
</template>

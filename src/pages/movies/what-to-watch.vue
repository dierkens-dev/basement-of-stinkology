<script lang="ts" setup>
const { data } = useFetch(`/api/watch-lists/movies`);
</script>

<template>
  <div>
    <div class="container p-3 mx-auto my-3 w-screen sm:w-auto">
      <div v-if="data" class="flex flex-col gap-3 justify-center">
        <div
          v-for="{ movie, users } in data.results"
          :key="movie.id"
          class="card card-side bg-base-100 shadow-xl flex-col sm:flex-row"
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

            <div class="flex items-center gap-3">
              <div
                v-if="typeof movie.voteAverage === 'number'"
                class="radial-progress text-xs"
                :style="`--value: ${movie.voteAverage * 10}; --size: 3rem`"
              >
                {{ Math.floor(movie.voteAverage * 10) }}%
              </div>

              <div class="flex -space-x-4">
                <div v-for="user in users" :key="user.id" :title="user.email">
                  <div v-if="user.avatar">
                    <div
                      class="w-10 bg-base-100 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                    >
                      <img :src="user.avatar" />
                    </div>
                  </div>
                  <div v-else class="avatar placeholder">
                    <div
                      class="bg-neutral text-neutral-content rounded-full w-10 ring ring-primary ring-offset-base-100 ring-offset-2"
                    >
                      <span class="text-xl uppercase">{{ user.email[0] }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="loading loading-bars loading-lg"></div>
    </div>
  </div>
</template>

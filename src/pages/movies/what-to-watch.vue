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
          class="card card-side bg-base-100 shadow-xl"
        >
          <figure class="w-24 sm:w-40 shrink-0">
            <NuxtImg class="object-cover" :src="movie.poster" alt="Movie" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">{{ movie.title }}</h2>
            <p>{{ movie.tagline }}</p>

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
      <div v-else class="loading loading-bars loading-lg"></div>
    </div>
  </div>
</template>

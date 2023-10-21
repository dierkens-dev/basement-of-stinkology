<script lang="ts" setup>
const { params } = useRoute();

const slug = params.slug;

const search = ref("");

const { data } = useFetch(`/api/movies/search`, {
  query: {
    search,
  },
});

function handleSearchUpdateValue(value: string) {
  search.value = value;
}
</script>

<template>
  <dialog class="modal modal-open">
    <div class="modal-box">
      <TextField
        name="search"
        label="Find Movie"
        :value="search"
        @update:value="handleSearchUpdateValue"
      />

      <ul
        v-if="data?.results?.length"
        class="menu px-1 bg-base-200 h-52 rounded-box overflow-y-auto flex-nowrap gap-1"
      >
        <li v-for="movie in data.results" :key="movie.id">
          <button class="flex justify-between w-full items-center p-1">
            <div class="w-[52px] h-[48px] border border-primary shadow-sm">
              <NuxtImg
                v-if="movie.poster_path"
                :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`"
                class="object-cover w-full"
              />
            </div>

            <span class="basis-full min-w-0 flex flex-col">
              <span
                class="overflow-hidden whitespace-nowrap overflow-ellipsis"
                >{{ movie.title }}</span
              >
              <span
                class="overflow-hidden whitespace-nowrap overflow-ellipsis text-xs"
                >{{ movie.overview }}</span
              >
            </span>

            <span class="w-[38px] font-mono text-sm">
              <span v-if="movie.release_date">{{
                new Date(movie.release_date).toLocaleDateString(undefined, {
                  year: "numeric",
                })
              }}</span>
            </span>
          </button>
        </li>
      </ul>
    </div>

    <div class="modal-backdrop bg-black bg-opacity-30">
      <NuxtLink :to="`/events/${slug}`">Close Modal</NuxtLink>
    </div>
  </dialog>
</template>

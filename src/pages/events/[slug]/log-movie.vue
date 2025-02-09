<script lang="ts" setup>
import { escapeDialog } from "~/utils/escapeDialog";

const { params } = useRoute();

const slug = params.slug;

const search = ref("");
const selectedMovie = ref<Movie | null>(null);

const { data } = await useFetch(`/api/movies/search`, {
  query: {
    search,
  },
  watch: [search],
});

function handleSearchUpdateValue(value: string) {
  search.value = value;
}

interface Movie {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: Array<number>;
  id?: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

function handleMovieClick(movie: Movie) {
  selectedMovie.value = movie;
}

const isSubmitting = ref(false);

const input = ref();
useFocus(input, { initialValue: true });

async function handleLogMovieClick() {
  if (!selectedMovie.value) {
    return;
  }

  isSubmitting.value = true;

  try {
    const movie = await $fetch("/api/movies/log", {
      method: "POST",
      body: {
        moviedbId: selectedMovie.value.id,
        eventSlug: slug,
      },
    });

    await navigateTo(
      {
        path: `/events/${slug}`,
        hash: `#${movie.result.movie.id}`,
      },
      {
        // Workaround for now to reload the page and scroll to added movie.
        external: true,
      },
    );
    await refreshNuxtData(`${slug}/movies`);
  } finally {
    isSubmitting.value = false;
  }
}
const { path } = useRoute();
</script>

<template>
  <dialog
    class="modal modal-open modal-top sm:modal-middle"
    open
    @keydown.esc="escapeDialog(path)"
  >
    <div class="modal-box">
      <TextField
        :auto-focus="true"
        name="search"
        label="Find Movie"
        :value="search"
        @update:value="handleSearchUpdateValue"
      />

      <ul
        v-if="data?.results?.length"
        class="menu px-1 bg-base-200 max-h-52 rounded-box overflow-y-auto flex-nowrap gap-1"
      >
        <li v-for="movie in data.results" :key="movie.id">
          <button
            class="flex justify-between w-full items-center p-2"
            @click="() => handleMovieClick(movie)"
          >
            <div class="w-[44px] h-[60px] shadow-sm overflow-hidden">
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

      <div
        v-if="selectedMovie"
        class="flex justify-between w-full items-center p-2 gap-2 border-dashed border-4 shadow-lg mt-4"
      >
        <div class="w-[44px] h-[60px] shadow-sm overflow-hidden">
          <NuxtImg
            v-if="selectedMovie.poster_path"
            :src="`https://image.tmdb.org/t/p/original${selectedMovie.poster_path}`"
            class="object-cover w-full"
          />
        </div>

        <span class="basis-full min-w-0 flex flex-col">
          <span class="overflow-hidden whitespace-nowrap overflow-ellipsis">{{
            selectedMovie.title
          }}</span>
          <span
            class="overflow-hidden whitespace-nowrap overflow-ellipsis text-xs"
            >{{ selectedMovie.overview }}</span
          >
        </span>

        <span class="w-[38px] font-mono text-sm">
          <span v-if="selectedMovie.release_date">{{
            new Date(selectedMovie.release_date).toLocaleDateString(undefined, {
              year: "numeric",
            })
          }}</span>
        </span>
      </div>

      <div class="modal-action">
        <SubmitButton
          :is-loading="isSubmitting"
          :disabled="isSubmitting"
          @click="handleLogMovieClick"
        >
          Log Movie
        </SubmitButton>
      </div>
    </div>

    <div class="modal-backdrop bg-black bg-opacity-30">
      <NuxtLink :to="`/events/${slug}`">Close Modal</NuxtLink>
    </div>
  </dialog>
</template>

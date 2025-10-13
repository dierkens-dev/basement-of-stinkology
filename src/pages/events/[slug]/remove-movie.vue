<script lang="ts" setup>
import { escapeDialog } from "~/utils/escapeDialog";

const { $toast } = useNuxtApp();

const { query, params } = useRoute();

const slug = params.slug;

const { data: movieViewing } = await useFetch(
  `/api/movie-viewings/${query.id}`,
);

const isSubmitting = ref(false);
async function handleConfirm() {
  try {
    isSubmitting.value = true;
    await $fetch(`/api/movie-viewings/${query.id}`, {
      method: "DELETE",
    });

    await $toast.show({
      title: `Remove successful`,
      message: `"${movieViewing.value?.movie.title}" has been successfully removed`,
    });

    await navigateTo({
      path: `/events/${slug}`,
    });

    await refreshNuxtData(`${slug}/movies`);
  } finally {
    isSubmitting.value = false;
  }
}

const confirm = ref();
useFocus(confirm, { initialValue: true });
const { path } = useRoute();
</script>

<template>
  <dialog
    class="modal modal-open modal-top sm:modal-middle"
    open
    @keydown.esc="escapeDialog(path)"
  >
    <div v-if="movieViewing" class="modal-box prose">
      <h2>Remove Movie</h2>
      <p>
        You are about to remove <strong>{{ movieViewing.movie.title }}.</strong>
      </p>
      <div class="modal-action">
        <NuxtLink :to="`/events/${slug}`" class="btn btn-secondary"
          >Cancel</NuxtLink
        >
        <SubmitButton
          ref="confirm"
          :is-loading="isSubmitting"
          :disabled="isSubmitting"
          @click="handleConfirm"
        >
          Confirm
        </SubmitButton>
      </div>
    </div>

    <div class="modal-backdrop bg-black bg-opacity-30">
      <NuxtLink to="/admin/users">Close Modal</NuxtLink>
    </div>
  </dialog>
</template>

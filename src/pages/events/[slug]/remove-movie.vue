<script lang="ts" setup>
const { $toast } = useNuxtApp();

const { query, params } = useRoute();

const slug = params.slug;

const { data: movieView } = await useFetch(`/api/movie-views/${query.id}`);

const isSubmitting = ref(false);
async function handleConfirm() {
  try {
    isSubmitting.value = true;
    await $fetch(`/api/movie-views/${query.id}`, {
      method: "DELETE",
    });

    await navigateTo({
      path: `/events/${slug}`,
    });

    await refreshNuxtData(`${slug}/movies`);

    await $toast.show({
      title: `Remove successful`,
      message: `"${movieView.value?.movie.title}" has been successfully removed`,
    });
  } finally {
    isSubmitting.value = false;
  }
}

const confirm = ref();
useFocus(confirm, { initialValue: true });
</script>

<template>
  <dialog class="modal modal-open modal-top sm:modal-middle" open>
    <div v-if="movieView" class="modal-box prose">
      <h2>Remove Movie</h2>
      <p>
        You are about to remove <strong>{{ movieView.movie.title }}.</strong>
      </p>
      <div class="modal-action">
        <NuxtLink to="/admin/users" class="btn btn-secondary">Cancel</NuxtLink>
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

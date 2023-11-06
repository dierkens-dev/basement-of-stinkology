<script lang="ts" setup>
const { query } = useRoute();

const id = query.id;

const { data: watchListMovie } = await useFetch(
  `/api/users/me/watch-list/movies/${id}`,
);

const isSubmitting = ref(false);
async function handleConfirm() {
  try {
    isSubmitting.value = true;
    await $fetch(`/api/users/me/watch-list/movies/${id}`, {
      method: "DELETE",
    });

    await navigateTo({
      path: "/users/me/watch-list",
    });

    await refreshNuxtData("/users/me/watch-list");
  } finally {
    isSubmitting.value = false;
  }
}

const confirm = ref();
useFocus(confirm, { initialValue: true });
</script>

<template>
  <dialog class="modal modal-open modal-top sm:modal-middle" open>
    <div v-if="watchListMovie" class="modal-box prose">
      <h2>Remove Movie</h2>
      <p>
        You are about to remove
        <strong>{{ watchListMovie.movie.title }}</strong> from your watch list.
      </p>
      <div class="modal-action">
        <NuxtLink to="/users/me/watch-list" class="btn btn-secondary"
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

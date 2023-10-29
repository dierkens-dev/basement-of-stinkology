<script lang="ts" setup>
const { query } = useRoute();

const id = query.id;

const { data: user } = await useFetch(`/api/users/${id}`);

const isSubmitting = ref(false);
async function handleConfirm() {
  try {
    isSubmitting.value = true;
    await $fetch(`/api/admin/users/${id}`, {
      method: "DELETE",
    });

    await navigateTo(
      {
        path: "/admin/users",
      },
      {
        // Workaround for now to reload the page and scroll to added movie.
        external: true,
      },
    );
  } finally {
    isSubmitting.value = false;
  }
}

const confirm = ref();
useFocus(confirm, { initialValue: true });
</script>

<template>
  <dialog class="modal modal-open modal-top" open>
    <div class="modal-box">
      <p v-if="user">Are you sure you would like to delete {{ user.email }}?</p>
      <p v-else>Are you sure you would like to delete the selected user?</p>
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
      <NuxtLink :to="`/admin/user`">Close Modal</NuxtLink>
    </div>
  </dialog>
</template>

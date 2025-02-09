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

    await navigateTo({
      path: "/admin/users",
    });

    await refreshNuxtData("admin-users");
  } finally {
    isSubmitting.value = false;
  }
}

const confirm = ref();
useFocus(confirm, { initialValue: true });
</script>

<template>
  <dialog class="modal modal-open modal-top sm:modal-middle" open>
    <div v-if="user" class="modal-box prose">
      <h2>Delete User</h2>
      <p>
        You are about to delete <strong>{{ user.email }}.</strong>
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

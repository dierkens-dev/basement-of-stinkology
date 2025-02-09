<script lang="ts" setup>
const { query } = useRoute();

const id = query.id;

const { data: user } = await useFetch(`/api/users/${id}`);

const { $toast } = useNuxtApp();
const isSubmitting = ref(false);

async function handleConfirm() {
  try {
    isSubmitting.value = true;
    await $fetch(`/api/admin/users/${id}/send-verification-email`, {
      method: "POST",
    });

    await navigateTo({
      path: "/admin/users",
    });

    await $toast.show({
      title: "Verification Email Sent",
      message: `Verification email has successfully been sent for ${user.value?.email}`,
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
    <div v-if="user" class="modal-box prose">
      <h2>Send Verification Email</h2>
      <p>
        You are about send
        <strong>{{ user.email }} a verification email.</strong>
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

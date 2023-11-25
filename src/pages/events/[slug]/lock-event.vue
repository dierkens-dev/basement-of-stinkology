<script lang="ts" setup>
const { params } = useRoute();
const slug = params.slug;

const { data: event } = await useFetch(`/api/events/${slug}`);

const isSubmitting = ref(false);
const handleConfirm = async () => {
  isSubmitting.value = true;
  await $fetch(`/api/events/${slug}/lock`, {
    method: "POST",
  });

  await navigateTo({
    path: `/events/${slug}`,
  });

  await refreshNuxtData(`events/${slug}`);

  isSubmitting.value = false;
};
</script>

<template>
  <dialog class="modal modal-open modal-top sm:modal-middle" open>
    <div v-if="event?.data" class="modal-box prose">
      <h2>Lock Event</h2>

      <p>
        You are about to lock the event <strong>{{ event.data.name }}.</strong>
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
    <div v-else class="loading loading-bars loading-lg"></div>

    <div class="modal-backdrop bg-black bg-opacity-30">
      <NuxtLink :to="`/events/${slug}`">Close Modal</NuxtLink>
    </div>
  </dialog>
</template>

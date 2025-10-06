<script lang="ts" setup>
import { escapeDialog } from "~/utils/escapeDialog";

const { params } = useRoute();
const slug = params.slug;

const { data: event } = await useFetch(`/api/events/${slug}`);

const isSubmitting = ref(false);
const handleConfirm = async () => {
  isSubmitting.value = true;
  await $fetch(`/api/events/${slug}/active`, {
    method: "POST",
  });

  await navigateTo({
    path: `/events/${slug}`,
  });

  await refreshNuxtData(`events/${slug}`);

  isSubmitting.value = false;
};
const { path } = useRoute();
</script>

<template>
  <dialog
    class="modal modal-open modal-top sm:modal-middle"
    open
    @keydown.esc="escapeDialog(path)"
  >
    <div v-if="event?.data" class="modal-box prose">
      <h2>Set Event Active</h2>

      <p>
        You are about to make the event
        <strong>{{ event.data.name }}</strong> the active event.
      </p>

      <p>
        This will make it the default event for new movie viewings, watch lists,
        and other features. Only one event can be active at a time.
      </p>
      <div class="modal-action">
        <NuxtLink :to="`/events/${event.data.slug}`" class="btn btn-secondary"
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
    <div v-else class="loading loading-bars loading-lg"></div>

    <div class="modal-backdrop bg-black bg-opacity-30">
      <NuxtLink :to="`/events/${slug}`">Close Modal</NuxtLink>
    </div>
  </dialog>
</template>

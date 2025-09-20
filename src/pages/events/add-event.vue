<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { type EventsPostErrors, eventsPostBodySchema } from "~/features/events";
import { FetchError } from "ofetch";
import { componentBindsConfig } from "~/features/forms";
import { useForm } from "vee-validate";
import { escapeDialog } from "~/utils/escapeDialog";
const { path } = useRoute();
useHead({
  title: () => `Add Event - Basement of Stinkology`,
});

const validationSchema = toTypedSchema(eventsPostBodySchema);

const { defineComponentBinds, handleSubmit, isSubmitting, setErrors } = useForm(
  {
    validationSchema,
  },
);

const name = defineComponentBinds("name", componentBindsConfig);
const slug = defineComponentBinds("slug", componentBindsConfig);
const date = defineComponentBinds("date", componentBindsConfig);

const formErrors = ref<null | EventsPostErrors["formErrors"]>(null);

const onSubmit = handleSubmit(async (values) => {
  formErrors.value = [];

  try {
    await $fetch(`/api/events`, {
      method: "POST",
      body: values,
    });

    await navigateTo({
      path: `/events`,
    });

    await refreshNuxtData("/events");
  } catch (error) {
    if (error instanceof FetchError) {
      const errors = readFetchError<EventsPostErrors>(error);

      formErrors.value = errors?.formErrors || null;
      setErrors(errors?.fieldErrors || {});

      return;
    }

    throw error;
  }
});
</script>

<template>
  <dialog
    class="modal modal-open modal-top sm:modal-middle"
    open
    @keydown.esc="escapeDialog(path)"
  >
    <div class="modal-box prose">
      <h2>Add Event</h2>

      <form autocomplete="off" novalidate @submit="onSubmit">
        <TextField v-bind="name" label="Name" name="name" auto-focus />

        <TextField v-bind="slug" label="slug" name="slug" />

        <TextField
          v-bind="date"
          label="Date"
          name="date"
          type="datetime-local"
        />

        <P
          v-for="error in formErrors"
          :key="error"
          class="alert alert-error shadow-lg mb-3"
          >{{ error }}</P
        >

        <div class="modal-action">
          <SubmitButton :is-loading="isSubmitting" :disabled="isSubmitting">
            Save
          </SubmitButton>
        </div>
      </form>
    </div>

    <div class="modal-backdrop bg-black bg-opacity-30">
      <NuxtLink :to="`/events/`">Close Modal</NuxtLink>
    </div>
  </dialog>
</template>

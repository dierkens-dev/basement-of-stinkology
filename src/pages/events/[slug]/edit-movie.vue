<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { FetchError } from "ofetch";
import { useForm } from "vee-validate";
import {
  type EventMoviePatchErrors,
  eventMoviePatchBodySchema,
} from "~/features/movies";
import { escapeDialog } from "~/utils/escapeDialog";
const { query, params } = useRoute();
const { $toast } = useNuxtApp();

const slug = params.slug;

const { data: movieViewing } = await useFetch(
  `/api/movie-viewings/${query.id}`,
);

const validationSchema = toTypedSchema(eventMoviePatchBodySchema);

function getDateTimeLocal(value: string) {
  try {
    const date = new Date(value);

    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, -1);
  } catch (error) {
    return value;
  }
}

const {
  defineComponentBinds,
  handleSubmit,
  isSubmitting,
  setErrors,
  setValues,
} = useForm({
  validationSchema,
  // Already loaded
  initialValues: {
    viewingTime: movieViewing.value?.viewingTime ?? undefined,
  },
});

// First time loading
watch(movieViewing, async (values) => {
  setValues({
    viewingTime: values?.viewingTime ?? undefined,
  });
});

const viewingTime = defineComponentBinds("viewingTime", {
  model: "value",
  mapProps: ({ errors, value }) => {
    return {
      errors,
      value: value && value.endsWith("Z") ? getDateTimeLocal(value) : value,
    };
  },
});

const formErrors = ref<null | EventMoviePatchErrors["formErrors"]>(null);

const onSubmit = handleSubmit(async (values) => {
  formErrors.value = [];

  try {
    await $fetch(`/api/movie-viewings/${query.id}`, {
      method: "PATCH",
      body: {
        viewingTime:
          typeof values.viewingTime === "string"
            ? new Date(values.viewingTime).toISOString()
            : values.viewingTime,
      },
    });

    await $toast.show({
      title: `Edit successful`,
      message: `"${movieViewing.value?.movie.title}" has been successfully updated`,
    });

    await navigateTo(
      {
        path: `/events/${slug}`,
        hash: `#${movieViewing.value?.movie.id}`,
      },
      {
        // Workaround for now to reload the page and scroll to added movie.
        external: true,
      },
    );

    await refreshNuxtData("users/me");
  } catch (error) {
    if (error instanceof FetchError) {
      const errors = readFetchError<EventMoviePatchErrors>(error);

      formErrors.value = errors?.formErrors || null;
      setErrors(errors?.fieldErrors || {});

      return;
    }

    throw error;
  }
});
const { path } = useRoute();
</script>

<template>
  <dialog
    class="modal modal-open modal-top sm:modal-middle"
    open
    @keydown.esc="escapeDialog(path)"
  >
    <div v-if="movieViewing" class="modal-box prose">
      <h2>Edit {{ movieViewing.movie.title }} View</h2>

      <form autocomplete="off" novalidate @submit="onSubmit">
        <TextField
          v-bind="viewingTime"
          label="Watch Time"
          name="viewingTime"
          type="datetime-local"
          auto-focus
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
    <div v-else class="modal-box">
      <div class="loading loading-bars loading-lg"></div>
    </div>

    <div class="modal-backdrop bg-black bg-opacity-30">
      <NuxtLink :to="`/events/${slug}`">Close Modal</NuxtLink>
    </div>
  </dialog>
</template>

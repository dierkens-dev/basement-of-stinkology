<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { FetchError } from "ofetch";
import { useForm } from "vee-validate";
import {
  EventMoviePatchErrors,
  eventMoviePatchBodySchema,
} from "~/server/api/movie-views/-[id].patch.schema";
import { escapeDialog } from "~/utils/escapeDialog";
const { query, params } = useRoute();

const slug = params.slug;

const { data: movieView } = await useFetch(`/api/movie-views/${query.id}`);

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
    viewDateTime: movieView.value?.viewDateTime ?? undefined,
  },
});

// First time loading
watch(movieView, async (values) => {
  setValues({
    viewDateTime: values?.viewDateTime ?? undefined,
  });
});

const viewDateTime = defineComponentBinds("viewDateTime", {
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
    await $fetch(`/api/movie-views/${query.id}`, {
      method: "PATCH",
      body: {
        viewDateTime:
          typeof values.viewDateTime === "string"
            ? new Date(values.viewDateTime).toISOString()
            : values.viewDateTime,
      },
    });

    await navigateTo(
      {
        path: `/events/${slug}`,
        hash: `#${movieView.value?.movie.id}`,
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
    <div v-if="movieView" class="modal-box prose">
      <h2>Edit {{ movieView.movie.title }} View</h2>

      <form autocomplete="off" novalidate @submit="onSubmit">
        <TextField
          v-bind="viewDateTime"
          label="Watch Time"
          name="viewDateTime"
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

<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { FetchError } from "ofetch";
import { useForm } from "vee-validate";
import { z } from "zod";

const { params } = useRoute();
const slug = params.slug;

const validationSchema = toTypedSchema(
  z.object({
    file: z.instanceof(File),
  }),
);

const { handleSubmit, isSubmitting, setFieldValue, errors } = useForm({
  validationSchema,
});

const formErrors = ref<null>(null);

const handleChange = (payload: Event) => {
  const target = payload.target as HTMLInputElement;
  const files = target.files ?? [];
  setFieldValue("file", files[0]);
};
const handleBlur = (payload: Event) => console.log({ payload });

const onSubmit = handleSubmit(async (values) => {
  console.log(values);

  formErrors.value = null;

  try {
    const formData = new FormData();

    formData.set("file", values.file);

    await $fetch(`/api/events/${slug}/backdrop`, {
      method: "POST",
      body: formData,
    });

    // await navigateTo({
    //   path: `/api/events/${slug}`,
    // });

    // await refreshNuxtData(`events/${slug}`);
  } catch (error) {
    if (error instanceof FetchError) {
      // TODO
      console.error(error);

      return;
    }

    throw error;
  }
});
</script>

<template>
  <dialog class="modal modal-open modal-top sm:modal-middle" open>
    <div class="modal-box prose">
      <h2>Upload Backdrop</h2>

      <form autocomplete="off" novalidate @submit="onSubmit">
        <input
          type="file"
          class="file-input"
          @change="handleChange"
          @blur="handleBlur"
        />

        <div v-if="errors.file" class="text-sm text-error py-2">
          {{ errors.file }}
        </div>

        <P
          v-for="error in formErrors"
          :key="error"
          class="alert alert-error shadow-lg mb-3"
          >{{ error }}</P
        >

        <div class="modal-action">
          <SubmitButton :is-loading="isSubmitting" :disabled="isSubmitting">
            Upload
          </SubmitButton>
        </div>
      </form>
    </div>

    <div class="modal-backdrop bg-black bg-opacity-30">
      <NuxtLink :to="`/events/${slug}`">Close Modal</NuxtLink>
    </div>
  </dialog>
</template>

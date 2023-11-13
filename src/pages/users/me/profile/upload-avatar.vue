<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { FetchError } from "ofetch";
import { useForm } from "vee-validate";
import { z } from "zod";

useHead({
  title: () => "Upload Avatar - Profile - Basement of Stinkology",
});

const validationSchema = toTypedSchema(
  z.object({
    file: z.instanceof(File, { message: "Please select an avatar image." }),
  }),
);

const {
  handleSubmit,
  isSubmitting,
  setFieldValue,
  errors,
  submitCount,
  setErrors,
} = useForm({
  validationSchema,
});

const handleChange = (payload: Event) => {
  const target = payload.target as HTMLInputElement;
  const files = target.files ?? [];
  setFieldValue("file", files[0]);
};

const onSubmit = handleSubmit(async (values) => {
  try {
    const formData = new FormData();

    formData.set("file", values.file);

    await $fetch(`/api/users/me/avatar`, {
      method: "POST",
      body: formData,
    });

    await navigateTo({
      path: `/users/me/profile`,
    });

    refreshNuxtData("users/me");
  } catch (error) {
    if (error instanceof FetchError) {
      const errors = readFetchError<{ file: string }>(error);

      console.log({ error });

      if (errors) {
        setErrors(errors);
      }
      return;
    }

    throw error;
  }
});
</script>

<template>
  <dialog class="modal modal-open modal-top sm:modal-middle" open>
    <div class="modal-box prose">
      <h2>Upload Avatar</h2>

      <form autocomplete="off" novalidate @submit="onSubmit">
        <input
          type="file"
          class="file-input"
          accept="image/gif, image/jpeg, image/png, image/webp"
          @change="handleChange"
        />

        <div
          v-if="errors.file && submitCount > 0"
          class="text-sm text-error py-2"
        >
          {{ errors.file }}
        </div>

        <div class="modal-action">
          <SubmitButton :is-loading="isSubmitting" :disabled="isSubmitting">
            Upload
          </SubmitButton>
        </div>
      </form>
    </div>

    <div class="modal-backdrop bg-black bg-opacity-30">
      <NuxtLink :to="`/users/me/profile`">Close Modal</NuxtLink>
    </div>
  </dialog>
</template>

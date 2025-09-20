<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { FetchError } from "ofetch";
import { useForm } from "vee-validate";
import { componentBindsConfig } from "~/features/forms";
import { UsersMePatchErrors, usersMePatchBodySchema } from "~/features/me";
import { escapeDialog } from "~/utils/escapeDialog";

useHead({
  title: () => "Edit - Profile - Basement of Stinkology",
});

const { data: user } = await useFetch(`/api/users/me`);

const validationSchema = toTypedSchema(usersMePatchBodySchema);

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
    nickname: user.value?.nickname ?? undefined,
    name: user.value?.name ?? undefined,
  },
});

// First time loading
watch(user, async (values) => {
  setValues({
    name: values?.name ?? undefined,
    nickname: values?.nickname ?? undefined,
  });
});

const nickname = defineComponentBinds("nickname", componentBindsConfig);
const name = defineComponentBinds("name", componentBindsConfig);

const formErrors = ref<null | UsersMePatchErrors["formErrors"]>(null);

const onSubmit = handleSubmit(async (values) => {
  formErrors.value = [];

  try {
    await $fetch(`/api/users/me`, {
      method: "PATCH",
      body: values,
    });

    await navigateTo({
      path: "/users/me/profile",
    });

    await refreshNuxtData("users/me");
  } catch (error) {
    if (error instanceof FetchError) {
      const errors = readFetchError<UsersMePatchErrors>(error);

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
    <div v-if="user" class="modal-box prose">
      <h2>Edit {{ user?.email }}</h2>

      <form autocomplete="off" novalidate @submit="onSubmit">
        <TextField
          v-bind="name"
          label="Name"
          name="name"
          type="text"
          auto-focus
        />

        <TextField
          v-bind="nickname"
          label="Nickname"
          name="nickname"
          type="text"
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
      <NuxtLink to="/users/me/profile">Close Modal</NuxtLink>
    </div>
  </dialog>
</template>

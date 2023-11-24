<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { FetchError } from "ofetch";
import { useForm } from "vee-validate";
import { componentBindsConfig } from "~/features/forms";
import {
  AdminUsersPostErrors,
  adminUsersPostBodySchema,
} from "~/server/api/admin/users/-[id].post.schema";

const validationSchema = toTypedSchema(adminUsersPostBodySchema);

const { defineComponentBinds, handleSubmit, isSubmitting, setErrors } = useForm(
  {
    validationSchema,
  },
);

const email = defineComponentBinds("email", componentBindsConfig);

const formErrors = ref<null | AdminUsersPostErrors["formErrors"]>(null);

const onSubmit = handleSubmit(async (values) => {
  formErrors.value = [];

  try {
    await $fetch(`/api/admin/users`, {
      method: "POST",
      body: values,
    });

    await navigateTo({
      path: "/admin/users",
    });

    await refreshNuxtData("admin-users");
  } catch (error) {
    if (error instanceof FetchError) {
      const errors = readFetchError<AdminUsersPostErrors>(error);

      formErrors.value = errors?.formErrors || null;
      setErrors(errors?.fieldErrors || {});

      return;
    }

    throw error;
  }
});
</script>

<template>
  <dialog class="modal modal-open modal-top sm:modal-middle" open>
    <div class="modal-box prose">
      <h2>Invite User</h2>

      <form autocomplete="off" novalidate @submit="onSubmit">
        <TextField
          v-bind="email"
          label="Email"
          name="email"
          type="text"
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
            Invite
          </SubmitButton>
        </div>
      </form>
    </div>

    <div class="modal-backdrop bg-black bg-opacity-30">
      <NuxtLink to="/admin/users">Close Modal</NuxtLink>
    </div>
  </dialog>
</template>

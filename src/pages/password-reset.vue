<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
  },
});

import { componentBindsConfig } from "~/features/forms";
import { FetchError } from "ofetch";
import {
  PasswordResetPostErrors,
  passwordResetPostSchema,
} from "~/server/api/-password-reset.post.schema";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { readFetchError } from "~/utils/read-fetch-error.util";

const { handleSubmit, isSubmitting, values, defineComponentBinds, setErrors } =
  useForm({
    validationSchema: toTypedSchema(passwordResetPostSchema),
  });

const email = defineComponentBinds("email", componentBindsConfig);

const isEmailSent = ref(false);
const formErrors = ref<null | PasswordResetPostErrors["formErrors"]>(null);

const onSubmit = handleSubmit(async () => {
  formErrors.value = [];

  try {
    await $fetch("/api/password-reset", {
      method: "POST",
      body: values,
    });

    isEmailSent.value = true;
  } catch (error) {
    if (error instanceof FetchError) {
      const errors = readFetchError<PasswordResetPostErrors>(error);

      formErrors.value = errors?.formErrors || null;
      setErrors(errors?.fieldErrors || {});

      return;
    }

    throw error;
  }
});
</script>

<template>
  <AuthCard v-if="isEmailSent">
    <AuthCardBody>
      <P class="alert alert-info shadow-lg mb-3">
        Please check your email for a reset password link.
      </P>

      <div class="flex justify-end gap-1">
        <NuxtLink class="link hover:link-primary" to="/sign-in">
          Sign In
        </NuxtLink>
        or
        <NuxtLink class="link hover:link-primary" to="/sign-up">
          Sign Up
        </NuxtLink>
      </div>
    </AuthCardBody>
  </AuthCard>
  <AuthCard v-else>
    <AuthCardBody>
      <form novalidate @submit="onSubmit">
        <AuthCardTitle>Reset Password</AuthCardTitle>

        <TextField v-bind="email" label="Email" name="email" type="email" />

        <P
          v-for="error in formErrors"
          :key="error"
          class="alert alert-error shadow-lg mb-3"
          >{{ error }}</P
        >

        <AuthCardActions>
          <SubmitButton :is-loading="isSubmitting" :disabled="isSubmitting">
            <span>Reset Password</span>
          </SubmitButton>

          <AuthCardLinks>
            <NuxtLink class="link hover:link-primary" to="/sign-in">
              Sign In
            </NuxtLink>
            or
            <NuxtLink class="link hover:link-primary" to="/sign-up">
              Sign Up
            </NuxtLink>
          </AuthCardLinks>
        </AuthCardActions>
      </form>
    </AuthCardBody>
  </AuthCard>
</template>

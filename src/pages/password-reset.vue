<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
  },
});

import { emailSchema, componentBindsConfig } from "~/features/forms";
import { FetchError } from "ofetch";
import { PasswordResetErrors } from "~/server/api/password-reset";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

const validationSchema = toTypedSchema(
  z.object({
    email: emailSchema,
  }),
);

const { handleSubmit, isSubmitting, values, defineComponentBinds, setErrors } =
  useForm({
    validationSchema,
  });

const email = defineComponentBinds("email", componentBindsConfig);

const isEmailSent = ref(false);
const formErrors = ref<null | PasswordResetErrors["formErrors"]>(null);

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
      const data: FetchError<PasswordResetErrors>["data"] = error.data;

      formErrors.value = data?.formErrors || null;

      setErrors(data?.fieldErrors || {});

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

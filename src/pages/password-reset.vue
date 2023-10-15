<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
  },
});

import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { AuthCard } from "~/features/auth/components/AuthCard";
import { AuthCardActions } from "~/features/auth/components/AuthCardActions";
import { AuthCardBody } from "~/features/auth/components/AuthCardBody";
import { AuthCardLinks } from "~/features/auth/components/AuthCardLinks";
import { AuthCardTitle } from "~/features/auth/components/AuthCardTitle";

const validationSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email("Must be a valid email."),
  }),
);

const {
  handleSubmit,
  errors,
  isSubmitting,
  setFieldValue,
  values,
  submitCount,
} = useForm({
  validationSchema,
});

const isEmailSent = ref(false);

const onSubmit = handleSubmit(async () => {
  // TODO: This has to live on the server
  // await sendPasswordResetEmail(auth, values.email);
});

function handleOnInput(field: keyof typeof values, event: Event) {
  setFieldValue(
    field,
    (event.currentTarget as HTMLInputElement).value,
    submitCount.value > 0,
  );
}
</script>

<template>
  <AuthCard v-if="isEmailSent">
    <AuthCardBody>
      <P class="alert alert-info shadow-lg mb-3">
        Please check your email for a reset password link.
      </P>

      <div class="flex justify-end gap-1">
        <Link class="link hover:link-primary" to="/sign-in"> Sign In </Link>
        or
        <Link class="link hover:link-primary" to="/sign-up"> Sign Up </Link>
      </div>
    </AuthCardBody>
  </AuthCard>
  <AuthCard v-else>
    <AuthCardBody>
      <form novalidate @submit="onSubmit">
        <AuthCardTitle>Reset Password</AuthCardTitle>

        <TextField
          :error="submitCount > 0 ? errors.email : undefined"
          :on-input="(event) => handleOnInput('email', event)"
          :value="values.email"
          label="Email"
          name="email"
          type="email"
        />

        <AuthCardActions>
          <SubmitButton :is-loading="isSubmitting" :disabled="isSubmitting">
            <span v-if="isSubmitting">Sending Reset Email...</span>
            <span v-else>Reset Password</span>
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

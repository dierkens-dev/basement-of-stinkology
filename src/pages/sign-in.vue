<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
  },
});

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const validationSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email("Must be a valid email."),
    password: z.string().min(1, "Password is required."),
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

const { signIn, data: user } = useAuth();
const { query } = useRoute();

const onSubmit = handleSubmit(async (values) => {
  await signIn("credentials", {
    ...values,
    callbackUrl:
      typeof query.callbackUrl === "string" ? query.callbackUrl : "/",
  });
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
  <AuthCard>
    <AuthCardBody>
      <form novalidate @submit="onSubmit">
        <AuthCardTitle>Sign In</AuthCardTitle>

        <TextField
          :error="submitCount > 0 ? errors.email : undefined"
          :on-input="(event) => handleOnInput('email', event)"
          :value="values.email"
          label="Email"
          name="email"
          type="email"
        />

        <TextField
          :error="submitCount > 0 ? errors.password : undefined"
          :on-input="(event) => handleOnInput('password', event)"
          :value="values.password"
          label="Password"
          name="password"
          type="password"
        />

        <P
          v-if="query.error === 'CredentialsSignin'"
          class="alert alert-error shadow-lg mb-3"
          >Incorrect sign in credentials.</P
        >

        <AuthCardActions>
          <SubmitButton :is-loading="isSubmitting" :disabled="isSubmitting">
            Sign In
          </SubmitButton>

          <AuthCardLinks>
            <NuxtLink class="link hover:link-primary" to="/sign-up">
              Sign Up
            </NuxtLink>
            or
            <NuxtLink class="link hover:link-primary" to="/password-reset">
              Reset Password
            </NuxtLink>
          </AuthCardLinks>
        </AuthCardActions>
      </form>
    </AuthCardBody>
  </AuthCard>
</template>

<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
  },
});

import { PublicPathState, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const validationSchema = toTypedSchema(
  z.object({
    email: z
      .string({ required_error: "Email is required." })
      .email("Must be a valid email."),
    password: z.string({ required_error: "Password is required." }),
  }),
);

const { defineComponentBinds, handleSubmit, isSubmitting } = useForm({
  validationSchema,
});

const defineComponentBindsOptions = {
  model: "value",
  mapProps: ({ errors }: PublicPathState) => ({ errors }),
};

const email = defineComponentBinds("email", defineComponentBindsOptions);
const password = defineComponentBinds("password", defineComponentBindsOptions);

const { signIn } = useAuth();
const { query } = useRoute();

const onSubmit = handleSubmit(async (values) => {
  await signIn("credentials", {
    ...values,
    callbackUrl:
      typeof query.callbackUrl === "string" ? query.callbackUrl : "/",
  });
});
</script>

<template>
  <AuthCard>
    <AuthCardBody>
      <form novalidate @submit="onSubmit">
        <AuthCardTitle>Sign In</AuthCardTitle>

        <TextField v-bind="email" label="Email" name="email" type="email" />

        <TextField
          v-bind="password"
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

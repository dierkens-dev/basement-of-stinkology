<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
  },
});

import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import {
  componentBindsConfig,
  emailSchema,
  passwordSchema,
} from "~/features/forms";

const validationSchema = toTypedSchema(
  z.object({
    email: emailSchema,
    password: passwordSchema,
  }),
);

const { query } = useRoute();

const { defineComponentBinds, handleSubmit, isSubmitting } = useForm({
  validationSchema,
  initialValues: {
    email: typeof query.email === "string" ? query.email : undefined,
  },
});

const email = defineComponentBinds("email", componentBindsConfig);
const password = defineComponentBinds("password", componentBindsConfig);

const { signIn } = useAuth();

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
      <form autocomplete="off" novalidate @submit="onSubmit">
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

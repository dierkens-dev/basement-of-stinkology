<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { FetchError } from "ofetch";
import { PublicPathState, useForm } from "vee-validate";
import { z } from "zod";
import { emailSchema, passwordSchema } from "~/features/forms";
import { SignUpErrors } from "~/server/api/auth/sign-up.post";
import { readFetchError } from "~/utils/read-fetch-error.util";

useSeoMeta({
  title: "Sign Up - Basement of Stinkology",
});

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
  },
});

const validationSchema = toTypedSchema(
  z.object({
    email: emailSchema,
    password: passwordSchema,
  }),
);

const { defineComponentBinds, handleSubmit, isSubmitting, setErrors } = useForm(
  {
    validationSchema,
  },
);

const defineComponentBindsOptions = {
  model: "value",
  mapProps: ({ errors }: PublicPathState) => ({ errors }),
};

const email = defineComponentBinds("email", defineComponentBindsOptions);
const password = defineComponentBinds("password", defineComponentBindsOptions);

const formErrors = ref<null | SignUpErrors["formErrors"]>(null);

const { $toast } = useNuxtApp();

const onSubmit = handleSubmit(async (values) => {
  formErrors.value = [];

  try {
    await $fetch("/api/auth/sign-up", {
      method: "POST",
      body: values,
    });

    await navigateTo("/sign-in");

    await $toast.show({
      title: `User '${values.email}' created.`,
      message: "Please check your email for a verification link.",
    });
  } catch (error) {
    if (error instanceof FetchError) {
      const errors = readFetchError<SignUpErrors>(error);

      formErrors.value = errors?.formErrors || null;
      setErrors(errors?.fieldErrors || {});

      return;
    }

    throw error;
  }
});
</script>

<template>
  <AuthCard>
    <AuthCardBody>
      <form autocomplete="off" novalidate @submit="onSubmit">
        <AuthCardTitle>Sign Up</AuthCardTitle>

        <TextField v-bind="email" label="Email" name="email" type="email" />

        <TextField
          v-bind="password"
          label="Password"
          name="password"
          type="password"
        />

        <P
          v-for="error in formErrors"
          :key="error"
          class="alert alert-error shadow-lg mb-3"
          >{{ error }}</P
        >

        <AuthCardActions>
          <SubmitButton :is-loading="isSubmitting" :disabled="isSubmitting"
            >Sign Up</SubmitButton
          >

          <AuthCardLinks>
            <NuxtLink class="link hover:link-primary" to="/sign-in">
              Sign In
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

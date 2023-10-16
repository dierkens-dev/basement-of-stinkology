<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { FetchError } from "ofetch";
import { PublicPathState, useForm } from "vee-validate";
import { z } from "zod";
import { SignUpErrors } from "~/server/api/sign-up.post";

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
  },
});

const validationSchema = toTypedSchema(
  z.object({
    email: z
      .string({ required_error: "Email is required." })
      .min(1, "Email is required.")
      .email("Must be a valid email."),
    password: z
      .string({ required_error: "Password is required." })
      .min(1, "Email is required."),
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

const { signIn } = useAuth();
const { query } = useRoute();

const onSubmit = handleSubmit(async (values) => {
  formErrors.value = [];

  try {
    await $fetch("/api/sign-up", {
      method: "POST",
      body: values,
    });

    await signIn("credentials", {
      ...values,
      callbackUrl:
        typeof query.callbackUrl === "string" ? query.callbackUrl : "/",
    });
  } catch (error) {
    if (error instanceof FetchError) {
      const data: FetchError<SignUpErrors>["data"] = error.data;
      formErrors.value = data?.formErrors || null;

      setErrors(data?.fieldErrors || {});

      return;
    }

    throw error;
  }
});
</script>

<template>
  <AuthCard>
    <AuthCardBody>
      <form novalidate @submit="onSubmit">
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

<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
  },
});

import { toTypedSchema } from "@vee-validate/zod";
import { FetchError } from "ofetch";
import { useForm } from "vee-validate";
import * as z from "zod";
import {
  codeSchema,
  componentBindsConfig,
  passwordSchema,
} from "~/features/forms";
import { PasswordUpdateErrors } from "~/server/api/auth/password-update.post";
import { readFetchError } from "~/utils/read-fetch-error.util";

useSeoMeta({
  title: "Password Update - Basement of Stinkology",
});

const { query } = useRoute();
const { push } = useRouter();

const validationSchema = toTypedSchema(
  z.object({
    code: codeSchema,
    password: passwordSchema,
  }),
);

const { handleSubmit, setErrors, isSubmitting, values, defineComponentBinds } =
  useForm({
    validationSchema,
    initialValues: {
      code: typeof query.oobCode === "string" ? query.oobCode : undefined,
    },
  });

const code = defineComponentBinds("code", componentBindsConfig);
const password = defineComponentBinds("password", componentBindsConfig);

const formErrors = ref<null | PasswordUpdateErrors["formErrors"]>(null);

const onSubmit = handleSubmit(async () => {
  formErrors.value = [];

  try {
    await $fetch("/api/auth/password-update", {
      method: "POST",
      body: values,
    });

    push("/sign-in");
  } catch (error) {
    if (error instanceof FetchError) {
      const errors = readFetchError<PasswordUpdateErrors>(error);

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
        <AuthCardTitle>Update Password</AuthCardTitle>

        <TextField v-bind="code" name="code" type="hidden" />
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

        <input type="hidden" name="code" :value="{ code }" />

        <AuthCardActions>
          <SubmitButton :is-loading="isSubmitting" :disabled="isSubmitting">
            <span v-if="isSubmitting">Updating Password...</span>
            <span v-else>Update Password</span>
          </SubmitButton>
        </AuthCardActions>
      </form>
    </AuthCardBody>
  </AuthCard>
</template>

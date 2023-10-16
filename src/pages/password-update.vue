<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
  },
});

import { toTypedSchema } from "@vee-validate/zod";
import { FirebaseError } from "firebase/app";
import { useForm } from "vee-validate";
import * as z from "zod";

const { query } = useRoute();

const code = query.oobCode;

const validationSchema = toTypedSchema(
  z.object({
    code: z.string().min(1, { message: "Reset code is required." }),
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

const errorMessage = ref<string | null>(
  code ? null : "Reset code is required.",
);

const onSubmit = handleSubmit(async (values) => {
  try {
    // TODO: This has to live on the server
    // await confirmPasswordReset(auth, values.code, values.password);
  } catch (error) {
    if (error instanceof FirebaseError) {
      errorMessage.value = getErrorMessage(error.code);
    }
  }
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
        <AuthCardTitle>Update Password</AuthCardTitle>

        <TextField
          :error="submitCount > 0 ? errors.password : undefined"
          :on-input="(event) => handleOnInput('password', event)"
          :value="values.password"
          label="Password"
          name="password"
          type="password"
        />

        <P v-if="errorMessage" class-name="alert alert-error shadow-lg mb-3">
          {{ errorMessage }}
        </P>

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

<script setup lang="ts">
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
  isFieldTouched,
} = useForm({
  validationSchema,
});

const { signIn } = useAuth();
const route = useRoute();

const onSubmit = handleSubmit((values) => {
  signIn("credentials", {
    ...values,
    callbackUrl:
      typeof route.query.redirectTo === "string" ? route.query.redirectTo : "/",
  });
});

function handleOnInput(field: keyof typeof values, event: Event) {
  setFieldValue(
    field,
    (event.currentTarget as HTMLInputElement).value,
    isFieldTouched(field),
  );
}
</script>

<template>
  <AuthCard>
    <AuthCardBody>
      <form novalidate @submit="onSubmit">
        <AuthCardTitle>Sign In</AuthCardTitle>

        <TextField
          :error="isFieldTouched('email') ? errors.email : undefined"
          :on-input="(event) => handleOnInput('email', event)"
          :value="values.email"
          label="Email"
          name="email"
          type="email"
        />

        <TextField
          :error="isFieldTouched('password') ? errors.password : undefined"
          :on-input="(event) => handleOnInput('password', event)"
          :value="values.password"
          label="Password"
          name="password"
          type="password"
        />

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

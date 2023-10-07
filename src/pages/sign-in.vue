<script setup>
import { useField, useForm } from "vee-validate";
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

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: email } = useField("email");
const { value: password } = useField("password");

const { signIn } = useAuth();

const onSubmit = handleSubmit((values) => {
  signIn("credentials", { ...values, callbackUrl: "/" });
});
</script>

<template>
  <AuthCard>
    <AuthCardBody>
      <form @submit="onSubmit">
        <AuthCardTitle>Sign In</AuthCardTitle>

        <TextField
          v-model="email"
          name="email"
          type="email"
          label="Email"
          :error="errors.email"
        />

        <TextField
          v-model="password"
          name="password"
          type="password"
          label="Password"
          :error="errors.password"
        />

        <AuthCardActions>
          <SubmitButton> Sign In </SubmitButton>

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

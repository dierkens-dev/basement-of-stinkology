<script setup lang="ts">
import { SignUpErrors } from "server/api/sign-up.post";

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
  },
});

const { query } = useRoute();

const { fieldErrors, formErrors }: SignUpErrors =
  typeof query.error === "string"
    ? JSON.parse(query.error)
    : { fieldErrors: {}, formErrors: [] };
</script>

<template>
  <AuthCard>
    <AuthCardBody>
      <form novalidate method="post" action="/api/sign-up">
        <AuthCardTitle>Sign Up</AuthCardTitle>

        <TextField
          :error="fieldErrors.email ? fieldErrors.email[0] : undefined"
          name="email"
          type="email"
          label="Email"
          :value="$route.query.email"
        />

        <TextField
          :error="fieldErrors.password ? fieldErrors.password[0] : undefined"
          name="password"
          type="password"
          label="Password"
          :value="$route.query.password"
        />

        <P
          v-for="error in formErrors"
          :key="error"
          class="alert alert-error shadow-lg mb-3"
          >{{ error }}</P
        >

        <AuthCardActions>
          <SubmitButton>Sign Up</SubmitButton>

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

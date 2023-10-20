<script setup lang="ts">
definePageMeta({
  auth: false,
});

const { status } = useAuth();
</script>

<template>
  <AuthCard>
    <AuthCardBody>
      <div class="alert alert-success shadow-lg mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>You're email has been verified.</span>
      </div>

      <div v-if="status === 'unauthenticated'" class="flex justify-end gap-1">
        <NuxtLink class="link hover:link-primary" to="/sign-in">
          Sign In
        </NuxtLink>
      </div>
    </AuthCardBody>
  </AuthCard>
</template>

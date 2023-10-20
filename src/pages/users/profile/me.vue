<script setup lang="ts">
const { data } = useAuth();
const user = data.value?.user;
</script>

<template>
  <div class="prose m-auto">
    <h1>Profile</h1>
    <pre>{{ JSON.stringify(user, null, 2) }}</pre>
  </div>
</template>

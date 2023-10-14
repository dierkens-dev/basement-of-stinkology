<script lang="ts" setup>
const { data, error } = useFetch("/api/events");
</script>

<template>
  <div class="container mx-auto">
    <pre>{{ JSON.stringify({ data }, null, 2) }}</pre>

    <pre>{{ JSON.stringify({ error }, null, 2) }}</pre>
  </div>
</template>

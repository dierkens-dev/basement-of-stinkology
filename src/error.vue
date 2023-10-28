<script setup lang="ts">
const error = useError();
</script>

<template>
  <NuxtLayout>
    <div class="h-full flex justify-center items-center">
      <div v-if="error" class="flex gap-3 prose items-center justify-center">
        <h1 v-if="'statusCode' in error" class="my-8">
          {{ error.statusCode }}
        </h1>
        <div class="divider divider-horizontal"></div>
        <h2 v-if="'statusMessage' in error" class="my-8">
          {{ error.statusMessage }}
        </h2>
      </div>
    </div>
  </NuxtLayout>
</template>

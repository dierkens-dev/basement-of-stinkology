<script lang="ts" setup>
const { data } = useFetch("/api/events");
</script>

<template>
  <div class="container mx-auto">
    <div v-if="data" class="prose">
      <div v-for="event in data.data" :key="event.id">
        <NuxtLink :to="`/events/${event.slug}`">
          <h2>{{ event.name }}</h2>
          <p v-if="event.date">{{ new Date(event.date).toLocaleString() }}</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { params } = useRoute();

const slug = params.slug;
const { data: event } = useFetch(`/api/events/${slug}`);
const { data: movies } = useFetch(`/api/events/${slug}/movies`);
</script>

<template>
  <div>
    <pre>{{ event }}</pre>
    <pre>{{ movies }}</pre>
  </div>
</template>

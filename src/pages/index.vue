<script lang="ts" setup>
const { data } = useFetch("/api/events");
</script>

<template>
  <div class="container mx-auto">
    <div v-if="data" class="mx-auto max-w-xl">
      <div v-for="event in data.data" :key="event.id" class="card shadow">
        <div class="card-body">
          <NuxtLink :to="`/events/${event.slug}`">
            <h2 class="card-title items-baseline">
              <span
                class="flex items-center self-stretch shrink-0 grow-1 text-primary text-lg"
                ><v-icon scale="1.5" name="px-link"
              /></span>
              <span>
                {{ event.name }}
                <span v-if="event.date" class="text-sm">{{
                  new Date(event.date).toLocaleString(undefined, {
                    year: "numeric",
                  })
                }}</span>
              </span>
            </h2>
          </NuxtLink>
          <div class="stats">
            <div class="stat">
              <div class="stat-value text-primary">
                {{ event._count.MovieViews }}
              </div>
              <div class="stat-title">Movies Watched</div>
            </div>

            <div class="stat">
              <div class="stat-value text-primary">
                {{ Math.round(event._sum.runtime / 60) }}
              </div>
              <div class="stat-title">Hours Watched</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

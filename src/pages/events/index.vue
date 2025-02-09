<script setup lang="ts">
import { isEditor } from "~/services/prisma.client";

useHead({
  title: () => `Events - Basement of Stinkology`,
});

const { data: events } = useFetch(`/api/events`);
const { data } = useAuth();
const user = data.value?.user;
</script>

<template>
  <div>
    <NuxtPage />

    <div v-if="isEditor(user)" class="fixed right-3 bottom-3 z-10 flex gap-3">
      <NuxtLink class="btn btn-circle btn-primary" to="/events/add-event">
        <v-icon name="px-plus" />
        <span class="sr-only">Add Event</span>
      </NuxtLink>
    </div>

    <div
      v-for="event in events?.data"
      :key="event.id"
      class="card card-bordered shadow"
    >
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
            <span v-if="event.isLocked"
              ><v-icon scale="1.15" name="px-lock"
            /></span>
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
</template>

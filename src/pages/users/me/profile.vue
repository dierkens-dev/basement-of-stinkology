<script setup lang="ts">
useSeoMeta({
  title: "Profile - Basement of Stinkology",
});

const { data: user } = await useFetch("/api/users/me", {
  key: "users/me",
});
</script>

<template>
  <div class="flex h-full justify-center items-center">
    <div v-if="user" class="card w-96 bg-base-100 bordered shadow-xl">
      <NuxtLink
        to="/users/me/profile/edit"
        class="btn btn-circle btn-primary absolute top-3 right-3"
      >
        <v-icon name="px-edit" />
      </NuxtLink>

      <figure class="px-10 pt-10">
        <div class="relative">
          <div v-if="user.avatar" class="avatar">
            <div
              class="rounded-full w-24 ring ring-primary ring-offset-base-100 ring-offset-2"
            >
              <img :src="user.avatar" :alt="`Avatar for ${user.email}`" />
            </div>
          </div>
          <div v-else class="avatar placeholder p-2">
            <div
              class="bg-neutral text-neutral-content rounded-full w-24 ring ring-primary ring-offset-base-100 ring-offset-2"
            >
              <span class="text-6xl uppercase">{{ user.email[0] }}</span>
            </div>
          </div>

          <NuxtLink
            to="/users/me/profile/upload-avatar"
            class="btn btn-circle btn-primary btn-sm absolute bottom-0 right-0"
          >
            <v-icon name="px-upload" />
          </NuxtLink>
        </div>
      </figure>
      <div class="card-body items-center text-center prose">
        <h2 class="m-0">{{ user.name }}</h2>
        <h3 v-if="user.nickname" class="m-0">
          {{ user.nickname }}
        </h3>
        <div class="flex items-center gap-1">
          <v-icon class="text-primary" name="px-mail" />
          <a :href="`mailto:${user.email}`">{{ user.email }}</a>
          <v-icon
            v-if="user.emailVerified"
            class="text-success"
            name="px-check"
          />
          <v-icon v-else class="text-warning" name="px-alert" />
        </div>
        <div class="flex items-center gap-1">
          <v-icon class="text-primary" name="px-user" />
          <span class="capitalize">{{ user.role.toLowerCase() }}</span>
        </div>
      </div>
    </div>
    <div v-else class="loading loading-bars loading-lg"></div>

    <NuxtPage />
  </div>
</template>

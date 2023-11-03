<script setup lang="ts">
const { data } = useAuth();
const user = data.value?.user;

invariant(user, "Something went wrong");
</script>

<template>
  <div class="flex h-full justify-center items-center">
    <div class="card w-96 bg-base-100 border-base-200 shadow-xl">
      <button class="btn btn-circle btn-ghost btn-sm absolute top-0 right-0">
        <v-icon name="px-edit" />
      </button>

      <figure class="px-10 pt-10">
        <div v-if="user.avatar" class="avatar">
          <div class="w-24 rounded-full">
            <img :src="user.avatar" :alt="`Avatar for ${user.email}`" />
          </div>
        </div>
        <div v-else class="avatar placeholder p-2">
          <div
            class="bg-neutral text-neutral-content rounded-full w-24 ring ring-primary ring-offset-base-100 ring-offset-2"
          >
            <span class="text-6xl uppercase">{{ user.email[0] }}</span>
          </div>
          <button
            class="btn btn-circle btn-ghost btn-sm absolute bottom-0 right-0"
          >
            <v-icon name="px-upload" />
          </button>
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
  </div>
</template>

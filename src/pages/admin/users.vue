<script setup lang="ts">
const { data, pending, error } = useFetch("/api/admin/users");
</script>
<template>
  <div class="flex h-full justify-center container mx-auto">
    <div v-if="pending && !data" class="loading loading-bars loading-lg"></div>

    <div v-if="data" class="overflow-x-auto w-full">
      <table class="table table-zebra">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Verified</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in data" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <v-icon
                v-if="user.emailVerified"
                name="px-check"
                class="text-success"
              />
              <span class="sr-only">{{ user.emailVerified }}</span>
            </td>
            <td>{{ user.role }}</td>
            <td>
              <NuxtLink
                :to="{
                  path: '/admin/users/delete',
                  query: {
                    id: user.id,
                  },
                }"
                class="btn btn-circle btn-sm"
              >
                <v-icon name="px-trash" class="text-error" />
                <span class="sr-only">Delete {{ user.email }}</span>
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="error" class="alert alert-error">
      {{ error.message }}
    </div>

    <NuxtPage />
  </div>
</template>

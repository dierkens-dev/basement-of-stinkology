<script setup lang="ts">
const { data, pending, error } = useFetch("/api/admin/users", {
  key: "admin-users",
});

const { data: session } = useAuth();
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
              <span v-if="user.emailVerified" class="rounded-full p-2">
                <v-icon name="px-check" class="text-success" />
              </span>
              <NuxtLink
                v-else
                :to="{
                  path: '/admin/users/send-verification-email',
                  query: {
                    id: user.id,
                  },
                }"
                class="btn btn-circle btn-sm btn-ghost"
              >
                <v-icon name="px-mail-arrow-right" class="text-secondary" />
                <span class="sr-only">Resend verify email</span>
              </NuxtLink>
              <span class="sr-only">{{ user.emailVerified }}</span>
            </td>
            <td>{{ user.role }}</td>
            <td class="flex gap-1">
              <NuxtLink
                :to="{
                  path: '/admin/users/edit',
                  query: {
                    id: user.id,
                  },
                }"
                class="btn btn-circle btn-sm"
              >
                <v-icon name="px-edit" class="text-primary" />
                <span class="sr-only">Edit {{ user.email }}</span>
              </NuxtLink>

              <NuxtLink
                v-if="session?.user.id !== user.id"
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
              <span v-else class="btn btn-circle btn-sm btn-disabled">
                <v-icon name="px-trash" class="text-neutral" />
              </span>
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

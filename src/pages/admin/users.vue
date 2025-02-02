<script setup lang="ts">
useHead({
  title: () => `Users - Admin - Basement of Stinkology`,
});

const { data, pending, error } = useFetch("/api/admin/users", {
  key: "admin-users",
});

const { data: session } = useAuth();
</script>
<template>
  <div>
    <div class="fixed right-3 bottom-3 z-10 flex gap-3">
      <NuxtLink
        class="btn btn-circle btn-primary"
        :to="`/admin/users/invite-user`"
      >
        <v-icon name="px-plus" />
        <span class="sr-only">Invite User Movie</span>
      </NuxtLink>
    </div>

    <div class="flex h-full justify-center container mx-auto">
      <div
        v-if="pending && !data"
        class="loading loading-bars loading-lg"
      ></div>

      <div v-if="data" class="overflow-x-auto w-full mt-5">
        <table class="table table-zebra">
          <thead>
            <tr>
              <th class="w-8"></th>
              <th>Name</th>
              <th>Email</th>
              <th>Verified</th>
              <th>Registered</th>
              <th>Role</th>
              <th class="flex justify-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in data" :key="user.id">
              <td class="flex gap-3 items-center">
                <div v-if="user.avatar">
                  <div
                    class="w-6 bg-base-100 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden"
                  >
                    <img :src="user.avatar" />
                  </div>
                </div>
                <div v-else class="avatar placeholder">
                  <div
                    class="bg-neutral text-neutral-content rounded-full w-6 ring ring-primary ring-offset-base-100 ring-offset-2"
                  >
                    <span class="text-lg uppercase">{{ user.email[0] }}</span>
                  </div>
                </div>
              </td>
              <td>
                {{ user.name }}
              </td>
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
              <td>
                <span v-if="user.isRegistered" class="rounded-full p-2">
                  <v-icon name="px-check" class="text-success" />
                </span>
              </td>
              <td>{{ user.role }}</td>
              <td class="flex gap-1 justify-end">
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
  </div>
</template>

<script setup lang="ts">
const { data, pending, error } = useFetch("/api/admin/users");
</script>
<template>
  <div class="flex h-full items-center justify-center container mx-auto">
    <div v-if="pending && !data" class="loading loading-bars loading-lg"></div>

    <div v-if="data" class="overflow-x-auto w-full">
      <table class="table table-zebra">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Verified</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in data" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.emailVerified }}</td>
            <td>{{ user.role }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="error" class="alert alert-error">
      {{ error.message }}
    </div>
  </div>
</template>

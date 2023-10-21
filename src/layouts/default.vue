<script setup lang="ts">
const { data } = useAuth();
const { fullPath } = useRoute();

const user = data.value?.user;
</script>

<template>
  <div class="drawer">
    <input id="main-nav-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <div class="h-full flex flex-col">
        <div v-if="user" class="navbar bg-base-100">
          <div class="navbar-start">
            <div class="flex-none lg:hidden">
              <label
                for="main-nav-drawer"
                aria-label="open sidebar"
                class="btn btn-square btn-ghost"
              >
                <v-icon name="px-menu" />
                <span class="sr-only">Main Menu</span>
              </label>
            </div>

            <NuxtLink
              to="/"
              class="btn btn-ghost normal-case text-xl hidden lg:block"
              >Basement of Stinkology</NuxtLink
            >
          </div>

          <div class="navbar-end gap-2">
            <div class="hidden lg:flex">
              <ul class="menu menu-horizontal px-1">
                <li><NuxtLink to="/users/profile/me">Profile</NuxtLink></li>
              </ul>
            </div>
            <a
              :href="`/api/auth/signout?callbackUrl=${encodeURIComponent(
                fullPath,
              )}`"
              class="btn btn-ghost"
              >Sign Out</a
            >
          </div>
        </div>
        <slot />
      </div>
    </div>

    <div class="drawer-side">
      <label
        for="main-nav-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>

      <ul class="menu p-4 w-80 min-h-full bg-base-200">
        <li>
          <NuxtLink to="/" class="btn btn-ghost normal-case text-xl"
            >Basement of Stinkology</NuxtLink
          >
        </li>

        <li><NuxtLink to="/users/profile/me">Profile</NuxtLink></li>
      </ul>
    </div>
  </div>
</template>

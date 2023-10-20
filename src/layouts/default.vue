<script setup lang="ts">
const { data } = useAuth();
const { fullPath } = useRoute();

const user = data.value?.user;
</script>

<template>
  <div class="h-full flex flex-col">
    <div v-if="user" class="navbar bg-base-100">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><a>Item 1</a></li>
            <li>
              <a>Parent</a>
              <ul class="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </li>

            <li><NuxtLink to="/users/profile/me">Profile</NuxtLink></li>
          </ul>
        </div>
        <NuxtLink to="/" class="btn btn-ghost normal-case text-xl"
          >Basement of Stinkology</NuxtLink
        >
      </div>

      <div class="navbar-end gap-2">
        <div class="hidden lg:flex">
          <ul class="menu menu-horizontal px-1">
            <li><a>Item 1</a></li>
            <li tabindex="0">
              <details>
                <summary>Parent</summary>
                <ul class="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </details>
            </li>
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
</template>

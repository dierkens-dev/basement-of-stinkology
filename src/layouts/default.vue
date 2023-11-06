<script setup lang="ts">
import { RoleLevel } from "~/services/prisma";

const { data } = useAuth();
const { fullPath } = useRoute();

const user = data.value?.user;
</script>

<template>
  <div class="drawer h-full">
    <input id="main-nav-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col min-h-full">
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
            class="btn btn-ghost normal-case text-xl hidden lg:flex"
            >Basement of Stinkology</NuxtLink
          >
        </div>

        <div class="navbar-end gap-2">
          <div class="hidden lg:flex">
            <ul class="menu menu-horizontal px-1">
              <li>
                <NuxtLink to="/movies/what-to-watch">What to Watch</NuxtLink>
              </li>
              <li><NuxtLink to="/users/me/watch-list">Watch List</NuxtLink></li>
              <li><NuxtLink to="/users/me/profile">Profile</NuxtLink></li>
              <li v-if="user && RoleLevel[user.role] >= RoleLevel['ADMIN']">
                <NuxtLink to="/admin/users">Users</NuxtLink>
              </li>
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

      <div
        v-if="user && !user.emailVerified"
        class="alert alert-warning w-full flex justify-center"
      >
        <span class="flex items-center justify-start gap-3">
          <v-icon name="px-alert" scale="1.5" />
          <span class="text-start">
            Site is in readonly mode. Check your email for a verification link.
          </span>
        </span>
      </div>
      <slot />
    </div>

    <div class="drawer-side lg:hidden">
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

        <li><NuxtLink to="/movies/what-to-watch">What to Watch</NuxtLink></li>
        <li><NuxtLink to="/users/me/watch-list">Watch List</NuxtLink></li>
        <li><NuxtLink to="/users/me/profile">Profile</NuxtLink></li>
        <li v-if="user && RoleLevel[user.role] >= RoleLevel['ADMIN']">
          <NuxtLink to="/admin/users">Users</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

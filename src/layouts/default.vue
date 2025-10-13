<script setup lang="ts">
import { isAdmin, isEditor } from "~/services/prisma.client";

const { data } = useAuth();
const route = useRoute();

const user = data.value?.user;
const { data: activeEvent } = await useFetch("/api/events/active");
const refresh = async (event: any) => {
  try {
    const { data, pending, error } = await useFetch(`/api/admin/sync/sync`, {
      method: "GET",
    });
    console.log("data", data);
  } catch (error) {
    console.log("error", error);
  }
};
</script>

<template>
  <div class="drawer h-full">
    <input id="main-nav-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col min-h-full">
      <div v-if="user" class="navbar shadow bg-base-100 fixed z-10">
        <div class="navbar-start">
          <div class="flex-none lg:hidden">
            <label
              for="main-nav-drawer"
              aria-label="open sidebar"
              class="btn btn-square btn-ghost"
              data-cy="main-nav-drawer"
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
            <ul class="menu menu-horizontal px-1 items-center gap-2">
              <li v-if="isEditor(user)">
                <details class="dropdown">
                  <summary class="m-1 btn-ghost cursor-pointer">
                    Watch Lists
                  </summary>
                  <ul
                    class="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow !mt-0"
                  >
                    <li>
                      <NuxtLink
                        to="/users/me/watch-list"
                        class="flex items-center"
                      >
                        {{ activeEvent?.data?.name }}
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink
                        to="/users/me/default-watch-list"
                        class="flex items-center"
                      >
                        Default
                      </NuxtLink>
                    </li>
                  </ul>
                </details>
              </li>

              <li>
                <NuxtLink to="/movies/what-to-watch">What to Watch</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/events">Events</NuxtLink>
              </li>

              <div class="dropdown dropdown-end">
                <label
                  tabindex="0"
                  class="btn btn-outline btn-circle btn-primary focus-within:border-2"
                >
                  <div v-if="user.avatar" class="avatar">
                    <div class="rounded-full w-10 overflow-hidden">
                      <img
                        class="rounded-full"
                        :src="user.avatar"
                        :alt="`Avatar for ${user.email}`"
                      />
                    </div>
                  </div>
                  <div
                    v-else
                    class="bg-neutral text-neutral-content rounded-full w-10 h-10 flex justify-center items-center"
                  >
                    <span class="text-xl uppercase">{{ user.email[0] }}</span>
                  </div>
                </label>
                <ul
                  class="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box"
                >
                  <li class="menu-title">
                    <span class="font-bold">{{ user.email }}</span>
                    <span class="divider my-1"></span>
                  </li>
                  <li><NuxtLink to="/users/me/profile">Profile</NuxtLink></li>
                  <li v-if="isAdmin(user)">
                    <NuxtLink to="/admin/users">Users</NuxtLink>
                    <button @click="refresh">
                      <span>Refresh Movie Json</span>
                    </button>
                  </li>
                  <li>
                    <a
                      :href="`/api/auth/signout?callbackUrl=${encodeURIComponent(
                        route.fullPath,
                      )}`"
                      data-cy="sign-out"
                      >Sign Out</a
                    >
                  </li>
                </ul>
              </div>
            </ul>
          </div>
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
      <div class="pt-16">
        <slot />
      </div>
    </div>

    <div class="drawer-side lg:hidden mt-16">
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

        <li class="menu-title">
          <span class="divider my-1"></span>
        </li>

        <li>
          <NuxtLink to="/events">Events</NuxtLink>
        </li>

        <li><NuxtLink to="/movies/what-to-watch">What to Watch</NuxtLink></li>
        <li v-if="isEditor(user)">
          <NuxtLink to="/users/me/watch-list" class="flex items-center">
            <span>{{ activeEvent?.data?.name || "Current Event" }}</span>
            <span class="divider divider-horizontal mx-1"></span>
            <span class="text-sm opacity-70">Current</span>
          </NuxtLink>
        </li>
        <li v-if="isEditor(user)">
          <NuxtLink to="/users/me/default-watch-list" class="flex items-center">
            <span>Default</span>
            <span class="divider divider-horizontal mx-1"></span>
            <span class="text-sm opacity-70">Legacy</span>
          </NuxtLink>
        </li>

        <li v-if="user" class="menu-title">
          <span class="divider my-1"></span>
        </li>

        <li v-if="user" class="menu-title">
          <span class="font-bold">{{ user.email }}</span>
        </li>

        <li v-if="user" class="menu-title">
          <span class="divider my-1"></span>
        </li>

        <li v-if="user"><NuxtLink to="/users/me/profile">Profile</NuxtLink></li>
        <li v-if="isAdmin(user)">
          <NuxtLink to="/admin/users">Users</NuxtLink>
        </li>
        <li v-if="user">
          <a
            :href="`/api/auth/signout?callbackUrl=${encodeURIComponent(
              route.fullPath,
            )}`"
            data-cy="sign-out-mobile"
            >Sign Out</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<template>
  <div v-if="isLoggedInUser">
    <profile-form :user="user" />
  </div>
  <div v-else class="text-center mx-auto">
    <img
      class="rounded-full h-20 w-20 lg:h-40 lg:w-40 mx-auto"
      :src="require(`../../assets/${user.avatar}`)"
    />
    <div class="grid grid-cols-3">
      <div v-for="(stat, index) in stats" :key="index">
        {{ stat.count }}
        <div>{{ stat.name }}</div>
      </div>
    </div>
    <div class="text-base m-4">
      {{ user.firstName + ' ' + user.lastName }}
    </div>
    <div class="text-3xl m-4">{{ user.gamertag }}</div>
    <div class="text-base m-4">{{ user.slogan }}</div>
    <div class="grid grid-cols-5">
      <Achievement
        v-for="(achievement, index) in achievements"
        :key="index"
        class="mx-auto mt-4"
        :iconString="'fa-solid fa-user-secret'"
        :iconSize="'2xl'"
        :titleString="'Head of Security'"
        :bgColor="'bg-yellow-200'"
      >
      </Achievement>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import ProfileForm from '~/components/UI/ProfileForm.vue';
import Achievement from '~/components/UI/Achievement.vue';

export default defineComponent({
  components: { ProfileForm, Achievement },
  async asyncData({ params, store }) {
    const userId = params.index;
    const isLoggedInUser = store.getters.isAuthenticated && userId === '1';
    const user = await store.dispatch('getUser', userId);
    const stats = [
      { name: 'Headshots', count: 165 },
      { name: 'Kills', count: 200 },
      { name: 'Deaths', count: 90 },
    ];
    const achievements = [
      'Centurion',
      'Crotchmaster',
      'Couch Potato',
      'Rip Van-Winkle',
      'God-Like',
    ];
    return { user, stats, isLoggedInUser, achievements };
  },
});
</script>

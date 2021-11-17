<template>
  <div class="text-center mx-auto">
    <img
      class="rounded-full h-20 w-20 lg:h-40 lg:w-40 mx-auto"
      :src="require(`../../assets/${user.avatar}`)"
    />
    <div class="grid grid-cols-3">
      <div>
        32
        <div>Headshots</div>
      </div>
      <div>
        150
        <div>Kills</div>
      </div>
      <div>
        54
        <div>Deaths</div>
      </div>
    </div>
    <div class="text-base m-4">{{ user.firstName + ' ' + user.lastName }}</div>
    <div class="text-3xl m-4">{{ user.gamertag }}</div>
    <div class="text-base m-4">{{ user.slogan }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  async asyncData({ params, store }) {
    const userId = params.index;
    const user = await store.dispatch('getUser', { userId });
    return { user };
  },
});
</script>

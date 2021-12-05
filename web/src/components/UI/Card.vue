<template>
  <div class="border-2 border-black rounded-lg grid grid-cols-2 mx-4 text-left">
    <div class="text-sm mt-4 ml-4">
      {{ card.firstName + ' ' + card.lastName }}
    </div>

    <img
      class="row-span-3 rounded-full h-20 w-20 lg:h-40 lg:w-40 ml-8 mt-2 lg:ml-4"
      :src="require(`../../assets/${card.avatar}`)"
    />

    <div class="text-3xl ml-4">{{ card.gamertag }}</div>
    <div class="text-base ml-4 h-12 mt-2">{{ card.slogan }}</div>
    <nuxt-link :to="`/user-profile/${card.id}`">
      <AppButton class="m-2.5 w-36 border-black text-lg border-4"
        >Profile</AppButton
      >
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import AppButton from '@/components/UI/AppButton.vue';
import { Card } from '~/types/card';

export default defineComponent<Card>({
  name: 'TheCard',
  components: { AppButton },
  props: {
    card: {
      type: Object,
      default: () => ({
        avatar: 'drink.png',
        email: 'test@email.com',
        firstName: 'First',
        gamertag: 'Gamertag',
        id: '1',
        lastName: 'LastName',
        password: 'abc1234',
        slogan: 'Lorem ipsum dolor sitamet...',
        username: 'something',
      }),
    },
  },
  setup() {
    return {};
  },
});
</script>

<template>
  <div class="p-5">
    <form
      class="border-white w-96 m-auto p-2 box-border shadow rounded"
      @submit.prevent="onSubmit"
    >
      <AppControlInput type="file">
        <img class="mx-auto" :src="require(`../../assets/drink.png`)" />Avatar
      </AppControlInput>
      <AppControlInput :value="firstName" aria-label="First Name"
        >First Name</AppControlInput
      >
      <AppControlInput :value="lastName" aria-label="Last Name"
        >Last Name</AppControlInput
      >
      <AppControlInput :value="email" aria-label="Email" type="email"
        >Email</AppControlInput
      >
      <AppControlInput :value="currentPassword" type="password"
        >Current Password</AppControlInput
      >
      <AppControlInput :value="newPassword" type="password"
        >New Password</AppControlInput
      >
      <AppControlInput :value="gamertag" aria-label="Gamertag"
        >Gamertag</AppControlInput
      >
      <AppControlInput
        :value="slogan"
        aria-label="Slogan"
        :control-type="'textarea'"
        :rows="3"
        >Slogan</AppControlInput
      >
      <AppButton>Submit</AppButton>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useStore } from '@nuxtjs/composition-api';
import AppControlInput from '@/components/UI/AppControlInput.vue';
import AppButton from '@/components/UI/AppButton.vue';

export default defineComponent({
  name: 'ProfileForm',
  components: { AppControlInput, AppButton },
  props: {
    isLogin: Boolean,
    firstName: {
      type: String,
      default: () => {
        ('');
      },
    },
    lastName: {
      type: String,
      default: () => {
        ('');
      },
    },
    email: {
      type: String,
      default: () => {
        ('');
      },
    },
    gamertag: {
      type: String,
      default: () => {
        ('');
      },
    },
    slogan: {
      type: String,
      default: () => {
        ('');
      },
    },
    avatar: {
      type: String,
      default: () => {
        ('');
      },
    },
  },
  setup(props) {
    const newPassword = ref('');
    const currentPassword = ref('');
    const store = useStore();
    const onSubmit = (): void => {
      store.dispatch('updateUser', {
        email: props.email,
        password: newPassword.value,
        firstName: props.firstName,
        lastName: props.lastName,
        gamertag: props.gamertag,
        slogan: props.slogan,
        avatar: props.avatar,
      });
    };
    return {
      props,
      newPassword,
      currentPassword,
      onSubmit,
    };
  },
});
</script>

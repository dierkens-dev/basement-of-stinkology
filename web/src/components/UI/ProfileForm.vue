<template>
  <div class="p-5">
    <div class="border-white w-80 m-auto p-2 box-border shadow rounded">
      <form @submit.prevent="onSubmit">
        <AppControlInput type="image"> Avatar </AppControlInput>
        <AppControlInput v-model="fname" aria-label="First Name" type="text"
          >First Name</AppControlInput
        >
        <AppControlInput v-model="lname" aria-label="Last Name" type="text"
          >Last Name</AppControlInput
        >
        <AppControlInput v-model="email" aria-label="Email" type="email"
          >Email</AppControlInput
        >
        <AppControlInput v-model="currentPassword" type="password" size="30"
          >Current Password</AppControlInput
        >
        <AppControlInput v-model="newPassword" type="password" size="30"
          >New Password</AppControlInput
        >
        <AppControlInput v-model="gamertag" aria-label="Gamertag" type="text"
          >Gamertag</AppControlInput
        >
        <AppControlInput v-model="slogan" aria-label="Slogan" type="text"
          >Slogan</AppControlInput
        >
        <AppButton>Submit</AppButton>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useStore } from '@nuxtjs/composition-api';
import AppControlInput from '@/components/UI/AppControlInput.vue';
import AppButton from '@/components/UI/AppButton.vue';

export default defineComponent({
  name: 'ProfileForm',
  components: { AppControlInput, AppButton },
  setup() {
    const isLogin = ref(true);
    const fname = ref('');
    const lname = ref('');
    const email = ref('');
    const gamertag = ref('');
    const slogan = ref('');
    const newPassword = ref('');
    const currentPassword = ref('');
    const store = useStore();
    const onSubmit = (): void => {
      store.dispatch('updateUser', {
        email: email.value,
        password: newPassword.value,
        fname: fname.value,
        lname: lname.value,
        gamertag: gamertag.value,
        slogan: slogan.value,
      });
    };
    return {
      fname,
      lname,
      isLogin,
      email,
      currentPassword,
      newPassword,
      gamertag,
      slogan,
      onSubmit,
    };
  },
});
</script>

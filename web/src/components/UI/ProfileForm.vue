<template>
  <div class="p-5">
    <form
      class="border-white w-96 m-auto p-2 box-border shadow rounded"
      @submit.prevent="onSubmit"
    >
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </p>
      <AppControlInput type="file">
        <img class="mx-auto" :src="require(`../../assets/${user.avatar}`)" />Avatar
      </AppControlInput>
      <AppControlInput :value="user.firstName" aria-label="First Name"
        >First Name</AppControlInput
      >
      <AppControlInput :value="user.lastName" aria-label="Last Name"
        >Last Name</AppControlInput
      >
      <AppControlInput :value="user.email" aria-label="Email" type="email"
        >Email</AppControlInput
      >
      <AppControlInput :value="currentPassword" type="password"
        >Current Password</AppControlInput
      >
      <AppControlInput :value="newPassword" type="password"
        >New Password</AppControlInput
      >
      <AppControlInput :value="user.gamertag" aria-label="Gamertag"
        >Gamertag</AppControlInput
      >
      <AppControlInput
        :value="user.slogan"
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
    user: {
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
    email: {
      type: String,
      default: () => {
        ('');
      },
    }
  },
  setup(props) {
    const newPassword = ref('');
    const currentPassword = ref('');
    const store = useStore();
    const errors: String[] = ["This is an Error!"];
    const onSubmit = (): void => {
      if(false){

      }else {store.dispatch('updateUser', {
        password: newPassword.value,
        user: props.user,
      });}

    };
    return {
      props,
      newPassword,
      currentPassword,
      errors,
      onSubmit,
    };
  },
});
</script>

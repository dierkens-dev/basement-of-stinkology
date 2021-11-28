<template>
  <div class="p-5">
    <form
      class="border-white w-96 m-auto p-2 box-border shadow rounded"
      @submit.prevent="checkForm"
    >
      <span v-if="errors.value && errors.value.length">
        <b>Please correct the following error(s):</b>

        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </span>
      <AppControlInput type="file">
        <img
          class="mx-auto"
          :src="require(`../../assets/${user.avatar}`)"
        />Avatar
      </AppControlInput>
      <AppControlInput
        v-model="firstName"
        aria-label="First Name"
        :value="user.firstName"
        >First Name</AppControlInput
      >
      <AppControlInput
        v-model="lastName"
        :value="user.lastName"
        aria-label="Last Name"
        >Last Name</AppControlInput
      >
      <AppControlInput
        v-model="emailAddress"
        :value="user.email"
        aria-label="Email"
        type="email"
        >Email</AppControlInput
      >
      <AppControlInput v-model="currentPassword" type="password"
        >Current Password</AppControlInput
      >
      <AppControlInput v-model="newPassword" type="password"
        >New Password</AppControlInput
      >
      <AppControlInput
        v-model="gamertag"
        :value="user.gamertag"
        aria-label="Gamertag"
        >Gamertag</AppControlInput
      >
      <AppControlInput
        v-model="slogan"
        :value="user.slogan"
        aria-label="Slogan"
        :control-type="'textarea'"
        :rows="3"
        >Slogan</AppControlInput
      >
      <AppButton type="submit">Submit</AppButton>
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
        avatar: '',
        email: '',
        firstName: '',
        gamertag: '',
        id: '',
        lastName: '',
        password: '',
        slogan: '',
        username: '',
      }),
    },
    email: {
      type: String,
      default: () => {
        ('');
      },
    },
  },
  setup(props) {
    const newPassword = ref('');
    const currentPassword = ref('');
    const lastName = ref(props.user.lastName);
    const firstName = ref(props.user.firstName);
    const emailAddress = ref(props.user.email);
    const gamertag = ref(props.user.gamertag);
    const slogan = ref(props.user.slogan);
    const store = useStore();
    const errors = ref(['']);
    const checkForm = (): void => {
      if (newPassword.value !== '' && currentPassword.value === '') {
        errors.value.push('Current password cannot be empty!');
      }
      if (errors.value.length === 0) {
        store.dispatch('updateUser', {
          password: newPassword,
          user: null,
        });
      }
    };
    return {
      lastName,
      firstName,
      emailAddress,
      gamertag,
      slogan,
      newPassword,
      currentPassword,
      errors,
      checkForm,
    };
  },
});
</script>

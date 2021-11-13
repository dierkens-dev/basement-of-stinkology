<template>
  <div class="text-center" style="text-align: -webkit-center">
    <h1 class="text-xl font-extrabold mt-1">Add a movie</h1>
    <form @submit.prevent="onSubmit">
      <AppControlInput v-model="search.name" class="block" type="text"
        >Name</AppControlInput
      >
      <div>
        <AppButton type="submit">Search</AppButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api';
import axios from 'axios';
import AppButton from '~/components/UI/AppButton.vue';
import AppControlInput from '~/components/UI/AppControlInput.vue';

export default defineComponent({
  components: { AppControlInput, AppButton },
  setup() {
    const search = reactive({ name: '' });
    let results = ref([{}]);
    const onSubmit = async () => {
      console.log('search', search.name);
      await axios
        .get(
          'https://api.themoviedb.org/3/search/movie?api_key=382ef6aac0697a76ae66f86ef093a377&language=en-US&query=Kentucky+Fried&page=1&include_adult=false',
        )
        .then((result: any) => {
          results = result.data.results;
        })
        .catch((e) => console.log('error', e));
    };

    return { onSubmit, results, search };
  },
});
</script>

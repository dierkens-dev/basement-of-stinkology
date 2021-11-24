<template>
  <div :class="className" :title="titleString">
    <font-awesome-icon :icon="iconString" :size="iconSize" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* add icons to the library */
library.add(faUserSecret);

export default defineComponent({
  components: { FontAwesomeIcon },
  name: 'TheAchievement',
  props: {
    iconString: {
      type: String,
      default: 'fa-solid fa-user-secret',
    },
    bgColor: {
      type: String,
      default: 'bg-blue-500',
    },
    iconSize: {
      type: String,
      default: '2xl',
    },
    titleString: {
      type: String,
      default: 'Head of Security',
    },
  },
  setup(props) {
    const className: String =
      'rounded-full h-24 w-24 flex items-center justify-center ' +
      props.bgColor;
    return { className };
  },
});
</script>

<style scoped></style>

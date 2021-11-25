<template>
  <div :class="className" :title="titleString">
    <font-awesome-icon :icon="iconString" :size="iconSize" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBullseye,
  faShield,
  faCouch,
  faBookBible,
  faBed,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faBullseye);
library.add(faShield);
library.add(faCouch);
library.add(faBookBible);
library.add(faBed);

export default defineComponent({
  name: 'TheAchievement',
  components: { FontAwesomeIcon },
  props: {
    iconString: {
      type: String,
      default: '',
    },
    bgColor: {
      type: String,
      default: 'bg-yellow-700',
    },
    iconSize: {
      type: String,
      default: '2xl',
    },
    titleString: {
      type: String,
      default: '',
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

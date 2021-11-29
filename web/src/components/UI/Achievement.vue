<template>
  <div>
    <div
      v-if="color === 'gold'"
      class="
        mx-auto
        mt-4
        rounded-full
        h-24
        w-24
        flex
        items-center
        justify-center
        bg-gold
      "
      :title="titleString"
    >
      <font-awesome-icon :icon="iconString" :size="iconSize" />
    </div>
    <div
      v-if="color === 'silver'"
      class="
        mx-auto
        mt-4
        rounded-full
        h-24
        w-24
        flex
        items-center
        justify-center
        bg-silver
      "
      :title="titleString"
    >
      <font-awesome-icon :icon="iconString" :size="iconSize" />
    </div>
    <div
      v-if="color === 'bronze'"
      class="
        mx-auto
        mt-4
        rounded-full
        h-24
        w-24
        flex
        items-center
        justify-center
        bg-bronze
      "
      :title="titleString"
    >
      <font-awesome-icon :icon="iconString" :size="iconSize" />
    </div>
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
    color: {
      type: String,
      default: '',
    },
    iconSize: {
      type: String,
      default: '',
    },
    titleString: {
      type: String,
      default: '',
    },
  },
});
</script>

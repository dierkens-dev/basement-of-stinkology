<template>
  <div class="m-2.5">
    <label class="block font-bold"><slot /></label>
    <input
      v-if="controlType === 'input'"
      class="box-border p-2 border-black border-2 rounded-md w-full"
      v-bind="$attrs"
      :value="value"
      :maxlength="maxlength"
      @input="$emit('input', $event.target.value)"
    />
    <textarea
      v-if="controlType === 'textarea'"
      class="box-border p-2 border-black border-2 rounded-md w-full"
      :rows="rows"
      :value="value"
      :maxlength="maxlength"
      @input="$emit('input', $event.target.value)"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'AppControlInput',
  props: {
    controlType: {
      type: String,
      default: 'input',
    },
    value: {
      type: String,
      default: '',
    },
    rows: {
      type: Number,
      default: 10,
    },
    maxlength: {
      type: Number,
      default: 100,
    },
  },
  setup(props) {
    return { props };
  },
});
</script>

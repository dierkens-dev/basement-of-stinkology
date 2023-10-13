<script setup lang="ts">
export interface ToastOptions {
  title?: string;
  message: string;
}

const props = defineProps<ToastOptions>();

const { close } = useNinjaToasterState();

const { percent } = useNinjaToasterProgress();
</script>

<template>
  <div class="shadow-lg flex flex-col">
    <div class="alert">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-info shrink-0 w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>

      <div>
        <h3 v-if="props.title" class="font-bold">{{ props.title }}</h3>
        <div class="text-xs">{{ props.message }}</div>
      </div>

      <button class="btn btn-sm" @click="close()">Dismiss</button>
    </div>

    <progress
      :value="percent"
      className="progress progress-info col-span-3 relative"
    ></progress>
  </div>
</template>

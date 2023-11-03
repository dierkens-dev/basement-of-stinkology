<script setup lang="ts">
const { data } = useAuth();
const user = data.value?.user;

invariant(user, "Something went wrong");
</script>

<template>
  <div class="flex h-full justify-center items-center">
    <div class="card w-96 bg-base-100 border-base-200 shadow-xl">
      <figure class="px-10 pt-10">
        <img
          v-if="user.avatar"
          src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
          class="rounded-xl"
        />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions">
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

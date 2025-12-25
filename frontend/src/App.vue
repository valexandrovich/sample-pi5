<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col items-center  h-screen bg-gray-100">
    <div class="flex flex-row gap-4">
      <RouterLink to="/" class="text-blue-500">Home</RouterLink>
      <RouterLink to="/about" class="text-blue-500">About</RouterLink>
    </div>
    <RouterView class="mt-4" />
  </div>
</template>

<style scoped>

</style>

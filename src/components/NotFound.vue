<template>
  <div
    class="min-h-screen bg-white flex items-center justify-center px-4 flex-col"
  >
    <div class="bg-gray-500 p-6 text-center rounded-md mb-8">
      <h1 class="text-6xl font-bold text-white mb-2">404</h1>
      <h2 class="text-2xl text-white font-semibold">Page Not Found</h2>
    </div>

    <div>
      <router-link
        to="/"
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
      >
        Go to Home Page
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-md">
      <div class="container mx-auto px-6 py-3">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-blue-600">Mood Trackers</h1>

          <div class="space-x-4">
            <router-link to="/" class="text-blue-500 hover:text-blue-700"
              >Home</router-link
            >
          </div>
        </div>
      </div>
    </nav>

    <div class="container mx-auto px-6 py-8">
      <router-view />
    </div>
  </div>
</template>

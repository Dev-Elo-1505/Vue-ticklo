<template>
  <footer class="bg-gray-900 text-gray-300 py-6 mt-8">
    <div class="mx-auto w-full max-w-[1440px] px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="text-sm">© {{ currentYear }} Ticklo — Simple ticketing made easy.</div>
      <nav class="flex items-center gap-4 text-sm">
        <router-link to="/" class="hover:text-white">Home</router-link>
        <router-link to="/dashboard" class="hover:text-white">Dashboard</router-link>
        <router-link to="/tickets" class="hover:text-white">Tickets</router-link>
        <router-link to="/auth/login" class="hover:text-white">Login</router-link>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
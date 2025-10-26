<template>
  <div class="min-h-screen flex flex-col">
    <!-- Background decoration -->
    <div
      aria-hidden="true"
      class="fixed -top-16 -left-16 w-56 h-56 rounded-full pointer-events-none blur-3xl opacity-30 md:opacity-40"
      style="background: var(--color-primary, #5bb0fe); z-index: 0"
    />
    <div
      aria-hidden="true"
      class="fixed -bottom-20 -right-20 w-72 h-72 rounded-full pointer-events-none blur-2xl opacity-20 md:opacity-30"
      style="background: rgba(91,176,254,0.18); z-index: 0"
    />
    
    <main class="flex-1 relative z-10">
      <div class="mx-auto w-full">
        <router-view />
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from './components/Footer.vue'
</script>
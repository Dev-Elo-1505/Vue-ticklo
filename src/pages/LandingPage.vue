<template>
  <div class="font-inter">
    <Hero />
    <div class="mx-auto max-w-[1440px]">
      <Features />
        <Stats />
    </div>
  </div>
</template>

<script setup lang="ts">
import Hero from "../components/Hero.vue";
import Features from "../components/Features.vue";
import Stats from "../components/Stats.vue";
</script>

<template>
  <section class="p-4 min-h-screen md:px-12 md:py-6">
    <div class="text-md rounded-full px-3 py-1 backdrop-blur-md border border-white/30 text-primary text-center shadow-sm w-32 bg-primaryLight mx-auto">
      Our Features
    </div>
    <div class="text-center mt-4 text-2xl font-semibold w-3/4 md:w-80 mx-auto">
      <p>makes it easy to create and track tickets</p>
    </div>
    <div class="mt-4">
      <FeatureCard 
        v-for="feature in features" 
        :key="feature.id"
        :feature="feature"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import FeatureCard from './FeatureCard.vue'
 import { features } from '../lib/features';
</script>
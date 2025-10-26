<template>
    <nav class="relative z-10 flex justify-between items-center font-inter max-w-[1440px] mx-auto p-4 md:px-12 md:py-6">
      <router-link to="/" class="text-xl font-bold md:text-2xl">
        Ticklo
      </router-link>
      <div class="flex gap-2">
        <ButtonLink
          title="Login"
          location="/auth/login"
          customClass="bg-transparent text-white"
        />
        <ButtonLink title="Get Started" location="/auth/signup" />
      </div>
    </nav>
</template>

<script setup lang="ts">
import ButtonLink from './ButtonLink.vue';
</script>
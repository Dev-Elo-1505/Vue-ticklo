<template>
  <nav class="flex justify-between items-center font-inter">
    <router-link to="/" class="text-xl font-bold md:text-2xl text-primary">
      {{ title }}
    </router-link>

    <Button
      title="Log out"
      custom-class="bg-red-500 rounded-md w-20 md:w-32"
      :disabled="isLoading"
      @click="handleLogout"
    />
  </nav>
</template>

<script setup lang="ts">
import Button from './Button.vue'

interface Props {
  title?: string
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Ticklo',
  isLoading: false
})

const emit = defineEmits<{
  logout: []
}>()

const handleLogout = () => {
  emit('logout')
}
</script>
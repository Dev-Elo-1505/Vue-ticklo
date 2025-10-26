<template>
  <router-link
    :to="location"
    :class="buttonClasses"
  >
    {{ title }}
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ButtonType } from '../types'
import { cn } from '../lib/utils'


interface Props {
  title: string
  type?: ButtonType
  customClass?: string
  location: string
}

const props = withDefaults(defineProps<Props>(), {
  type: undefined,
  customClass: ''
})

const buttonClasses = computed(() => 
  cn(
    `bg-white text-primary p-2 rounded-full text-sm md:text-md hover:opacity-90 active:scale-95 ${props.customClass}`
  )
)
</script>
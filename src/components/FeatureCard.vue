

<template>
  <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 mb-6 shadow flex flex-col md:flex-row items-center md:justify-between gap-4">
    <div class="w-20 h-20 md:w-32 md:h-32 shrink-0">
      <div
        class="w-full h-full"
        aria-hidden="true"
        v-html="processedSvg"
      />
    </div>
    <div class="text-center md:text-left md:w-1/2">
      <span class="bg-primary text-white font-semibold md:text-xl">{{ feature.title }}</span>
      <p class="text-gray-primary text-sm mt-2 md:text-md">{{ feature.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Feature } from '../types'

interface Props {
  feature: Feature
}

const props = defineProps<Props>()

const processedSvg = computed(() => {
  const raw = (props.feature.image ?? '').replace(
    /#6c63ff/gi,
    'var(--color-primary)'
  )
  
  
  return raw.replace(/<svg([^>]*)>/i, (_match, attrs) => {
    const cleaned = attrs.replace(/\s(width|height)="[^"]*"/gi, '')
    return `<svg${cleaned} style="width:100%;height:100%;max-width:100%;display:block">`
  })
})
</script>
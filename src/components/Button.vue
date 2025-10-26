<template>
  <button
    :class="buttonClasses"
    :type="type"
    :disabled="disabled"
    @click="handleClick"
    ref="buttonRef"
  >
    {{ title }}
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '../lib/utils'
import type { ButtonType } from '../types'

interface Props {
  title: string
  type?: ButtonType
  customClass?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  customClass: '',
  disabled: false
})

const emit = defineEmits<{
  click: []
}>()

const buttonRef = ref<HTMLButtonElement | null>(null)

const buttonClasses = computed(() =>
  cn(
    `bg-primary text-white w-full p-2 rounded-full text-sm md:text-md hover:opacity-90 active:scale-95 cursor-pointer ${props.customClass}`
  )
)

const handleClick = () => {
  emit('click')
}

// Expose ref if parent needs access
defineExpose({
  buttonRef
})
</script>
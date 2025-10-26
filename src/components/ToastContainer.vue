<template>
  <div class="fixed right-4 top-4 z-50 flex flex-col gap-3">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="[
        'max-w-sm w-full p-3 rounded-md shadow-md text-white',
        toastClass(toast.type)
      ]"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ToastType } from '../composables/useToast'

interface Props {
  toasts: Array<{ id: string; message: string; type: ToastType }>
}

defineProps<Props>()

const toastClass = (type: ToastType) => {
  switch (type) {
    case 'error':
      return 'bg-red-500'
    case 'success':
      return 'bg-green-500'
    default:
      return 'bg-blue-500'
  }
}
</script>
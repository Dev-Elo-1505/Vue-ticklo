<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/50" @click="handleCancel" />

      <div
        role="dialog"
        aria-modal="true"
        class="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-full mx-4 p-6"
      >
        <h3 v-if="title" class="text-lg font-semibold mb-2">{{ title }}</h3>
        
        <div v-if="description" class="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {{ description }}
        </div>
        
        <slot />

        <div class="mt-4 flex gap-3">
          <Button
            :title="cancelText"
            :custom-class="`px-4 py-2 rounded-md ${cancelButtonClass}`"
            @click="handleCancel"
            ref="cancelButtonRef"
          />

          <Button
            :title="confirmText"
            :custom-class="`px-4 py-2 rounded-md hover:opacity-95 disabled:opacity-50 ${confirmButtonClass}`"
            :disabled="loading"
            @click="handleConfirm"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import Button from './Button.vue'

interface Props {
  isOpen: boolean
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  loading?: boolean
  cancelButtonClass?: string
  confirmButtonClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  loading: false,
  cancelButtonClass: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  confirmButtonClass: 'bg-red-500 text-white'
})

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const cancelButtonRef = ref<InstanceType<typeof Button> | null>(null)

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    handleCancel()
  }
}


watch(() => props.isOpen, async (newValue) => {
  if (newValue) {
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    
    // Focus cancel button for accessibility
    await nextTick()
    cancelButtonRef.value?.buttonRef?.focus()
  } else {
    document.removeEventListener('keydown', onKeyDown)
    document.body.style.overflow = ''
  }
})


onUnmounted(() => {
  document.removeEventListener('keydown', onKeyDown)
  document.body.style.overflow = ''
})
</script>
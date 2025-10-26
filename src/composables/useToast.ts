import { ref, readonly, provide, inject, type InjectionKey } from 'vue'

export type ToastType = 'info' | 'success' | 'error'

export interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContext {
  showToast: (message: string, type?: ToastType) => void
}


const ToastSymbol: InjectionKey<ToastContext> = Symbol('toast')


export function provideToast() {
  const toasts = ref<Toast[]>([])

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).slice(2)
    toasts.value.push({ id, message, type })
    
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id)
    }, 3000)
  }

  provide(ToastSymbol, { showToast })

  return {
    toasts: readonly(toasts),
    showToast
  }
}


export function useToast() {
  const toast = inject(ToastSymbol)
  
  if (!toast) {
    throw new Error('useToast must be used inside a component with provideToast')
  }
  
  return toast
}
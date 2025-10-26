import { ref, onMounted, onUnmounted } from 'vue'
import { getSession } from '../utils/auth'

export function useAuth() {
  const isAuthenticated = ref(!!getSession())

  const onAuthChange = () => {
    isAuthenticated.value = !!getSession()
  }

  onMounted(() => {
    window.addEventListener('ticketapp_auth_changed', onAuthChange)
  })

  onUnmounted(() => {
    window.removeEventListener('ticketapp_auth_changed', onAuthChange)
  })

  return {
    isAuthenticated
  }
}
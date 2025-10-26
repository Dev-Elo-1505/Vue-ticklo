<template>
  <div class="p-5 md:px-12 md:py-6 font-inter mx-auto max-w-[1440px]">
    <AppNavbar :is-loading="loading" @logout="showConfirm = true" />
    
    <main class="mt-6 flex flex-col items-center justify-center">
      <!-- Empty State -->
      <template v-if="tickets.length === 0">
        <div>
          <div
            aria-hidden="true"
            class="w-full h-full"
            v-html="processedNewTicketSvg"
          />
        </div>
        <div class="mt-4 text-center">
          <h3 class="font-light text-sm mb-2">
            Get's Started by Creating a New Ticket
          </h3>
          <Button
            title="Create Ticket"
            @click="showCreateTicket = true"
          />
        </div>
      </template>

      <!-- Tickets List -->
      <div v-if="tickets.length > 0" class="w-full">
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h2 class="text-lg font-semibold md:mb-4">Recent Tickets</h2>
          <div class="flex flex-col md:flex-row md:items-center md:gap-2">
            <ButtonLink
              title="Go to Dashboard"
              location="/dashboard"
              custom-class="bg-primary text-white text-center w-full md:w-32 mb-2 mt-2"
            />
            <Button
              title="Create Ticket"
              custom-class="w-full md:w-32"
              @click="showCreateTicket = true"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="tk in tickets"
            :key="tk.id"
            class="border shadow border-white/20 rounded-md p-4 bg-white/5 flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between">
                <h3 class="font-semibold">{{ tk.title }}</h3>
                <div class="flex items-center gap-2">
                  <span
                    :class="[
                      'px-2 py-1 rounded-full flex items-center justify-center text-xs font-semibold capitalize',
                      getStatusClass(tk.status)
                    ]"
                  >
                    {{ tk.status.replace('_', ' ') }}
                  </span>
                </div>
              </div>
              <p v-if="tk.description" class="mt-2 text-sm text-gray-400 truncate">
                {{ tk.description }}
              </p>
            </div>
            <div class="flex items-center justify-end gap-2 mt-4">
              <Button
                title="Edit"
                custom-class="rounded-md w-20"
                @click="requestEdit(tk)"
              />
              <Button
                title="Delete"
                custom-class="rounded-md bg-red-500 w-20"
                @click="requestDelete(tk)"
              />
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Logout Confirmation Modal -->
    <Modal
      :is-open="showConfirm"
      title="Confirm logout"
      description="Are you sure you want to log out?"
      confirm-text="Log out"
      cancel-text="Cancel"
      :loading="loading"
      @confirm="handleLogout"
      @cancel="showConfirm = false"
    />

    <!-- Delete Confirmation Modal -->
    <Modal
      :is-open="showDeleteConfirm"
      title="Confirm delete"
      description="Are you sure you want to delete this ticket?"
      confirm-text="Delete"
      cancel-text="Cancel"
      :loading="loading"
      @confirm="handleDeleteConfirm"
      @cancel="showDeleteConfirm = false"
    />

    <!-- Create/Edit Ticket Modal -->
    <CreateTicket
      :on-open="showCreateTicket"
      :initial-data="editingTicket"
      :submit-text="editingTicket ? 'Update' : 'Create'"
      @cancel="handleCreateCancel"
      @create="handleSaveTicket"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppNavbar from '../components/AppNavbar.vue'
import Button from '../components/Button.vue'
import ButtonLink from '../components/ButtonLink.vue'
import Modal from '../components/Modal.vue'
import CreateTicket from '../components/CreateTicket.vue'
import { logout } from '../utils/auth'
import { createTicket, getTickets, updateTicket, deleteTicket } from '../utils/tickets'
import type { Ticket } from '../types'
import { useToast } from '../composables/useToast'
import newTicketImg from '../assets/newTicket.svg?raw'

const router = useRouter()
const { showToast } = useToast()

const tickets = ref<Ticket[]>([])
const loading = ref(false)
const showConfirm = ref(false)
const showCreateTicket = ref(false)
const editingTicket = ref<Ticket | null>(null)
const deletingTicket = ref<Ticket | null>(null)
const showDeleteConfirm = ref(false)

// Process SVG for empty state
const processedNewTicketSvg = computed(() => {
  const raw = newTicketImg ?? ''
  const withPrimary = raw.replace(
    /#6c63ff/gi,
    'var(--color-primary,#5bb0fe)'
  )
  return withPrimary.replace(/<svg([^>]*)>/i, (_m, attrs) => {
    const cleaned = attrs.replace(/\s(width|height)="[^"]*"/gi, '')
    return `<svg${cleaned} style="width:100%;height:auto;display:block;">`
  })
})

// Get status badge class
const getStatusClass = (status: string) => {
  switch (status) {
    case 'open':
      return 'bg-green-300/50 text-green-900'
    case 'in_progress':
      return 'bg-amber-300/50 text-amber-900'
    case 'closed':
      return 'bg-gray-300/50 text-gray-900'
    default:
      return 'bg-gray-300/50 text-gray-900'
  }
}

// Load tickets on mount
const loadTickets = async () => {
  loading.value = true
  try {
    const data = await getTickets()
    tickets.value = data
  } finally {
    loading.value = false
  }
}

// Handle save ticket (create or update)
const handleSaveTicket = async (data: Ticket) => {
  try {
    loading.value = true
    if (editingTicket.value) {
      const updated = await updateTicket(editingTicket.value.id!, {
        title: data.title,
        description: data.description,
        status: data.status,
      })
      tickets.value = tickets.value.map(t => (t.id === updated.id ? updated : t))
      editingTicket.value = null
      showToast('Ticket updated', 'success')
    } else {
      const created = await createTicket({
        title: data.title,
        description: data.description,
        status: data.status,
      })
      tickets.value = [created, ...tickets.value]
      showToast('Ticket created', 'success')
    }
    showCreateTicket.value = false
  } catch (error: any) {
    showToast(error?.message ?? 'Failed to save ticket', 'error')
  } finally {
    loading.value = false
  }
}

// Request edit ticket
const requestEdit = (t: Ticket) => {
  editingTicket.value = t
  showCreateTicket.value = true
}

// Request delete ticket
const requestDelete = (t: Ticket) => {
  deletingTicket.value = t
  showDeleteConfirm.value = true
}

// Handle delete confirmation
const handleDeleteConfirm = async () => {
  if (!deletingTicket.value) return
  try {
    loading.value = true
    await deleteTicket(deletingTicket.value.id!)
    tickets.value = tickets.value.filter(tk => tk.id !== deletingTicket.value!.id)
    showToast('Ticket deleted', 'success')
  } catch (err: any) {
    showToast(err?.message ?? 'Delete failed', 'error')
  } finally {
    loading.value = false
    showDeleteConfirm.value = false
    deletingTicket.value = null
  }
}

// Handle cancel create/edit
const handleCreateCancel = () => {
  showCreateTicket.value = false
  editingTicket.value = null
}

// Handle logout
const handleLogout = async () => {
  try {
    loading.value = true
    await Promise.resolve(logout())
    showToast('You have been logged out', 'success')
    router.push('/')
  } catch (error: any) {
    showToast(error?.message ?? 'Logout failed', 'error')
  } finally {
    loading.value = false
    showConfirm.value = false
  }
}

onMounted(() => {
  loadTickets()
})
</script>
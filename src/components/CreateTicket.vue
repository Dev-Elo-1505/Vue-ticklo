<template>
  <Modal
    :is-open="onOpen"
    :title="initialData ? 'Edit Ticket' : 'Create New Ticket'"
    :confirm-text="submitText"
    cancel-text="Cancel"
    cancel-button-class="bg-transparent text-primary"
    confirm-button-class="bg-primary"
    @confirm="onSubmit"
    @cancel="handleCancel"
  >
    <form class="space-y-4" @submit.prevent="onSubmit">
      <div>
        <label for="title" class="block text-sm mb-1">
          Title
        </label>
        <input
          id="title"
          v-model="title"
          v-bind="titleAttrs"
          type="text"
          placeholder="Title"
          class="w-full border border-gray-300 bg-transparent rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p v-if="errors.title" class="text-sm text-red-500">
          {{ errors.title }}
        </p>
      </div>

      <div>
        <label for="status" class="block text-sm mb-1">Status</label>
        <select
          id="status"
          v-model="status"
          v-bind="statusAttrs"
          class="w-full border border-gray-300 bg-transparent rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <p v-if="errors.status" class="text-sm text-red-500">
          {{ errors.status }}
        </p>
      </div>

      <div>
        <label for="description" class="block text-sm mb-1">
          Description
        </label>
        <textarea
          id="description"
          v-model="description"
          v-bind="descriptionAttrs"
          rows="5"
          placeholder="Description(optional)"
          class="w-full border border-gray-300 bg-transparent rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import Modal from './Modal.vue'
import { ticketSchema, type Ticket } from '../types'

interface Props {
  onOpen: boolean
  initialData?: Ticket | null
  submitText?: string
}

const props = withDefaults(defineProps<Props>(), {
  initialData: null,
  submitText: 'Create'
})

const emit = defineEmits<{
  cancel: []
  create: [data: Ticket]
}>()

// Setup form with VeeValidate + Zod
const { handleSubmit, defineField, errors, resetForm, setValues } = useForm<Ticket>({
  validationSchema: toTypedSchema(ticketSchema),
  initialValues: {
    status: 'open'
  }
})

// Define form fields
const [title, titleAttrs] = defineField('title')
const [status, statusAttrs] = defineField('status')
const [description, descriptionAttrs] = defineField('description')

// Watch for modal open/close and initialData changes
watch(() => props.onOpen, (isOpen) => {
  if (isOpen && props.initialData) {
    setValues(props.initialData)
  }
  if (!isOpen) {
    resetForm({
      values: { status: 'open' } as Partial<Ticket>
    })
  }
})

watch(() => props.initialData, (newData) => {
  if (props.onOpen && newData) {
    setValues(newData)
  }
})

// Form submission handler
const onSubmit = handleSubmit(async (values) => {
  emit('create', values)
  resetForm({
    values: { status: 'open' } as Partial<Ticket>
  })
})

const handleCancel = () => {
  emit('cancel')
}
</script>
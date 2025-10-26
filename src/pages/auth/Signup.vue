<template>
  <section class="p-6 md:p-12 font-inter">
    <div class="max-w-5xl mx-auto">
      <header class="mb-6">
        <router-link to="/" class="text-2xl font-bold text-primary">
          Ticklo
        </router-link>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="w-full max-w-md mx-auto">
          <h1 class="font-semibold text-2xl mb-2">Get Started</h1>
          <p class="text-sm text-gray-primary mb-4">
            Welcome to Ticklo — create your account to get started.
          </p>

          <form class="space-y-4" @submit="onSubmit">
            <div>
              <label for="email" class="block text-sm mb-1">
                Email
              </label>
              <input
                id="email"
                v-model="email"
                v-bind="emailAttrs"
                type="email"
                placeholder="Enter Email"
                class="w-full border border-gray-300 bg-transparent rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p v-if="errors.email" class="text-sm text-red-500">
                {{ errors.email }}
              </p>
            </div>

            <div>
              <label for="password" class="block text-sm mb-1">
                Password
              </label>
              <input
                id="password"
                v-model="password"
                v-bind="passwordAttrs"
                type="password"
                placeholder="Enter Password"
                class="w-full border border-gray-300 bg-transparent rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p v-if="errors.password" class="text-sm text-red-500">
                {{ errors.password }}
              </p>
            </div>

            <Button
              type="submit"
              title="Create account"
              :disabled="isSubmitting"
            />

            <p class="text-center text-sm text-gray-primary">
              Already have an account?
              <router-link to="/auth/login" class="text-primary">
                Log in
              </router-link>
            </p>
          </form>
        </div>

        <div
          class="hidden md:flex items-center justify-center rounded-md"
          style="background-color: var(--color-primary,#5bb0fe); min-height: 80vh"
        >
          <div class="w-full max-w-md p-8">
            <div
              aria-hidden="true"
              class="w-full h-full"
              v-html="processedAuthSvg"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import Button from '../../components/Button.vue'
import { authSchema, type AuthForm } from '../../types'
import { signup as signupRequest } from '../../utils/auth'
import { useToast } from '../../composables/useToast'
import authSvg from '../../assets/auth.svg?raw'

const router = useRouter()
const { showToast } = useToast()

// Setup form with VeeValidate + Zod
const { handleSubmit, defineField, errors, isSubmitting, resetForm } = useForm<AuthForm>({
  validationSchema: toTypedSchema(authSchema)
})

// Define form fields
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

// Process SVG for display
const processedAuthSvg = computed(() => {
  const raw = authSvg ?? ''
  // Replace the illustration's purple with the app primary variable
  const withPrimary = raw.replace(
    /#6c63ff/gi,
    'var(--color-primary,#5bb0fe)'
  )
  // Remove fixed width/height on svg and make it responsive
  return withPrimary.replace(/<svg([^>]*)>/i, (_m, attrs) => {
    const cleaned = attrs.replace(/\s(width|height)="[^"]*"/gi, '')
    return `<svg${cleaned} style="width:100%;height:auto;display:block;">`
  })
})

// Form submission handler
const onSubmit = handleSubmit(async (values) => {
  try {
    await signupRequest(values)
    showToast('Account created — signed in', 'success')
    resetForm()
    router.push('/dashboard')
  } catch (error: any) {
    showToast(error?.message ?? 'Signup failed', 'error')
  }
})
</script>
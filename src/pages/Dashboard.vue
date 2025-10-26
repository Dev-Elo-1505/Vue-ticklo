<template>
  <div class="p-4 md:px-12 md:py-6 font-inter mx-auto max-w-[1440px]">
    <AppNavbar :is-loading="loading" @logout="showConfirm = true" />

    <main class="mt-4">
      <h1 class="text-lg font-semibold">Welcome there!</h1>
      <p class="text-sm md:text-md">Here's a summary of all your tickets!</p>

      <div class="mt-4">
        <div class="flex gap-2 mb-3 md:block">
          <div
            class="bg-primary/10 border border-primary/30 rounded-md w-full h-32 p-2 md:p-4 md:mb-3 flex flex-col justify-between"
          >
            <p class="flex items-center gap-2">
              <Icon icon="ion:ticket-outline" class="text-xl" /> Total Tickets
            </p>
            <p class="text-4xl font-bold mt-2">{{ tickets.length }}</p>
          </div>

          <div
            class="bg-[#fef2f2] border border-[#fca5a1] rounded-md w-full h-32 p-2 md:p-4 flex flex-col justify-between"
          >
            <p class="flex items-center gap-2">
              <Icon icon="ion:folder-open-outline" class="text-xl" /> Open Tickets
            </p>
            <p class="text-4xl font-bold mt-2">
              {{ openTicketsCount }}
            </p>
          </div>
        </div>

        <div class="flex gap-2 mb-3 md:block">
          <div
            class="bg-[#fff7ed] border border-[#f7d56f] rounded-md w-full h-32 p-2 md:p-4 md:mb-3 flex flex-col justify-between"
          >
            <p class="flex items-center gap-2">
              <Icon icon="ri:progress-3-line" class="text-2xl" /> In Progress Tickets
            </p>
            <p class="text-4xl font-bold mt-2">
              {{ inProgressTicketsCount }}
            </p>
          </div>

          <div
            class="bg-[#f0fdf4] border border-[#6fff9a] rounded-md w-full h-32 p-2 md:p-4 md:mb-3 flex flex-col justify-between"
          >
            <p class="flex items-center gap-2">
              <Icon icon="ion:checkmark-circle-outline" class="text-xl"  /> Closed Tickets
            </p>
            <p class="text-4xl font-bold mt-2">
              {{ closedTicketsCount }}
            </p>
          </div>
        </div>
      </div>

      <ButtonLink
        location="/tickets"
        title="Manage tickets"
        custom-class="bg-primary text-white w-full block text-center mt-4"
      />
    </main>

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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Icon } from '@iconify/vue';
import AppNavbar from "../components/AppNavbar.vue";
import ButtonLink from "../components/ButtonLink.vue";
import Modal from "../components/Modal.vue";
import { logout } from "../utils/auth";
import { getTickets } from "../utils/tickets";
import type { Ticket } from "../types";
import { useToast } from "../composables/useToast";

const router = useRouter();
const { showToast } = useToast();

const loading = ref(false);
const showConfirm = ref(false);
const tickets = ref<Ticket[]>([]);

// Computed properties for ticket counts
const openTicketsCount = computed(
  () => tickets.value.filter((t) => t.status === "open").length
);

const inProgressTicketsCount = computed(
  () => tickets.value.filter((t) => t.status === "in_progress").length
);

const closedTicketsCount = computed(
  () => tickets.value.filter((t) => t.status === "closed").length
);

// Load tickets on mount
const loadTickets = async () => {
  try {
    loading.value = true;
    const data = await getTickets();
    tickets.value = data;
  } catch (err) {
    showToast("Failed to load tickets", "error");
  } finally {
    loading.value = false;
  }
};

// Handle logout
const handleLogout = async () => {
  try {
    loading.value = true;
    await Promise.resolve(logout());
    showToast("You have been logged out", "success");
    router.push("/");
  } catch (error: any) {
    showToast(error?.message ?? "Logout failed", "error");
  } finally {
    loading.value = false;
    showConfirm.value = false;
  }
};

onMounted(() => {
  loadTickets();
});
</script>

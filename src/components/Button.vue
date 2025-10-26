<template>
  <button :class="customClass">{{ title }}</button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ButtonType } from "../types";
import { cn } from "../lib/utils";

interface Props {
  title: string;
  type?: ButtonType;
  customClass?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: undefined,
  customClass: "",
  disabled: false,
});

const buttonClasses = computed(() =>
  cn(
    `bg-primary text-white w-full p-2 rounded-full text-sm md:text-md hover:opacity-90 active:scale-95 cursor-pointer ${props.customClass}`
  )
);
</script>

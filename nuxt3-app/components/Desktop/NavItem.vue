<!-- components/NavItem.vue -->
<script setup lang="ts">
const props = defineProps({
  label: { type: String as PropType<string>, required: true },
  iconPath: { type: String as PropType<string>, required: true },
  isActive: { type: Boolean as PropType<boolean>, default: false },
});
</script>

<template>
  <div
    :class="[
      'flex flex-col items-center cursor-pointer select-none transition-colors',
      isActive ? 'text-pink-500' : 'text-white hover:text-pink-500',
    ]"
    style="width: 70px"
  >
    <!-- Icon -->
    <div class="flex justify-center items-center h-16">
      <img :src="iconPath" :alt="label" class="w-12 h-12" />
    </div>

    <!-- Label -->
    <!-- <div class="flex justify-center items-center h-6">
      <span class="text-sm font-semibold text-center">{{ label }}</span>
    </div> -->
  </div>
</template>

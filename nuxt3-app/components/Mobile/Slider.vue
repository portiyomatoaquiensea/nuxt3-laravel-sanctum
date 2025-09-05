<script setup lang="ts">
import { Carousel, Slide, Navigation } from "vue3-carousel";
const slider = ref<any>(null);

onMounted(async () => {
  try {
    await $fetch("/api/auth/csrf", { credentials: "include" });
    const response = await $fetch("/api/slider", {
      method: "GET",
      credentials: "include",
    });
    if (response && response.data) {
      slider.value = response.data;
    }
  } catch (err) {
    console.error("User fetch error:", err);
  }
});
</script>
<template>
  <Carousel
    :items-to-show="1"
    :wrap-around="true"
    :autoplay="4000"
    class="rounded-none overflow-hidden shadow-lg"
  >
    <Slide v-for="item in slider" :key="item.id">
      <img
        :src="item.img"
        :alt="item.title"
        class="w-full h-full object-cover"
      />
    </Slide>
    <!-- keep Navigation arrows, remove Pagination -->
    <template #addons> <Navigation /> </template>
  </Carousel>
</template>

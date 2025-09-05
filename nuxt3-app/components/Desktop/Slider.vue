<template>
  <section class="relative mx-auto h-64 md:h-96 overflow-hidden">
    <!-- Slides -->
    <div
      v-for="(slide, index) in slides"
      :key="index"
      class="absolute inset-0 transition-opacity duration-700"
      :class="{
        'opacity-100 z-10': currentSlide === index,
        'opacity-0 z-0': currentSlide !== index,
      }"
    >
      <img :src="slide" class="w-full h-full object-cover" />
    </div>

    <!-- Previous / Next Buttons -->
    <button
      @click="prevSlide"
      class="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
    >
      ‹
    </button>
    <button
      @click="nextSlide"
      class="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
    >
      ›
    </button>

    <!-- Dots -->
    <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
      <span
        v-for="(slide, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        :class="[
          'w-3 h-3 rounded-full cursor-pointer',
          currentSlide === index ? 'bg-white' : 'bg-white/50',
        ]"
      ></span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const slides = [
  "/images/sliders/1.jpg",
  "/images/sliders/2.jpg",
  "/images/sliders/3.png",
];

const currentSlide = ref(0);
let interval: number;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
};

const goToSlide = (index: number) => {
  currentSlide.value = index;
};

onMounted(() => {
  interval = window.setInterval(nextSlide, 5000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

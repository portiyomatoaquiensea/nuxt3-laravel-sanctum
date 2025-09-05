<script setup lang="ts">
import { ref } from 'vue'

const container = ref<HTMLDivElement | null>(null)

// Categories example
const categories = [
  { name: 'HOT GAMES', img: '/images/mobile/hotgame.png', link: '/hot-games' },
  { name: 'SPORTS', img: '/images/mobile/sport.png', link: '/sports' },
  { name: 'SLOTS', img: '/images/mobile/slot.png', link: '/slots' },
  { name: 'LIVE CASINO', img: '/images/mobile/casino.png', link: '/live-casino' },
  { name: 'POKER', img: '/images/mobile/casino.png', link: '/poker' },
  { name: 'LOTTERY', img: '/images/mobile/casino.png', link: '/lottery' },
  { name: 'ARCADE', img: '/images/mobile/casino.png', link: '/arcade' },
]

// Dynamic scroll amount (width of one item + gap)
const scrollAmount = () => {
  if (!container.value) return 0
  const firstItem = container.value.querySelector<HTMLElement>('a')
  if (!firstItem) return 0
  const style = getComputedStyle(firstItem)
  const marginRight = parseInt(style.marginRight || '0')
  return firstItem.offsetWidth + marginRight
}

// Arrow scroll functions
const scrollLeft = () => {
  if (container.value) {
    container.value.scrollBy({ left: -scrollAmount(), behavior: 'smooth' })
  }
}
const scrollRight = () => {
  if (container.value) {
    container.value.scrollBy({ left: scrollAmount(), behavior: 'smooth' })
  }
}

// Touch tracking to prevent accidental click during swipe
let startX = 0
let isDragging = false

const onTouchStart = (e: TouchEvent) => {
  startX = e.touches[0].clientX
  isDragging = false
}

const onTouchMove = (e: TouchEvent) => {
  const deltaX = Math.abs(e.touches[0].clientX - startX)
  if (deltaX > 10) isDragging = true
}

const onClick = (e: MouseEvent) => {
  if (isDragging) e.preventDefault()
}
</script>

<template>
  <div class="px-[15px]">
    <div class="relative w-full flex items-center mt-[38px] max-md:px-[5px] pb-[20px]">
      <!-- Left Arrow -->
      <button
        @click="scrollLeft"
        class="absolute max-md:relative left-0  z-10 p-2 bottom-[15px] max-md:bottom-[-20px]"
      >
        <svg width="16" height="16" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.66666 14.9414C2.98478 14.9414 6.92736e-07 11.7393 3.70857e-07 7.7894C4.89742e-08 3.83945 2.98475 0.637366 6.66666 0.637366C10.1235 0.637366 12.9659 3.46004 13.3004 7.07418L4.50553 7.07421L6.66666 4.75505L5.72384 3.7436L2.42403 7.28368L1.95259 7.7894L5.72384 11.8352L6.66666 10.8238L4.50478 8.50459L13.3004 8.50459C12.9659 12.1187 10.1235 14.9414 6.66666 14.9414Z" fill="white"/>
        </svg>

      </button>

      <!-- Scrollable container -->
      <div
        ref="container"
        class="flex mx-auto overflow-x-auto scroll-smooth gap-[1.2rem] px-10 snap-x snap-mandatory scrollbar-hide max-md:mx-[15px]"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
      >
        <NuxtLink
          v-for="cat in categories"
          :key="cat.name"
          :to="cat.link"
          @click="onClick"
          class="flex-shrink-0 flex flex-col items-center space-y-1 hover:text-pink-400 text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 transition transform hover:scale-110 snap-start"
        >
          <img :src="cat.img" :alt="cat.name" class="w-[61.68px] h-[66px]" loading="lazy" />
          <!-- <span class="text-sm sm:text-xs font-bold">{{ cat.name }}</span> -->
        </NuxtLink>
      </div>

      <!-- Right Arrow -->
      <button
        @click="scrollRight"
        class="absolute max-md:relative right-0 p-2 bottom-[15px] max-md:bottom-[-20px]"
      >
        <svg width="16" height="16" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.63375 0.63736C10.3156 0.63736 13.3004 3.83944 13.3004 7.78936C13.3004 11.7393 10.3157 14.9414 6.63375 14.9414C3.17687 14.9414 0.3345 12.1187 0 8.50459L8.79488 8.50455L6.63375 10.8237L7.57656 11.8352L10.8764 8.29509L11.3478 7.78936L7.57656 3.74356L6.63375 4.75501L8.79562 7.07417L0 7.07417C0.3345 3.46004 3.17687 0.63736 6.63375 0.63736Z" fill="white"/>
        </svg>
      </button>
    </div>
    <svg class="text-center mx-auto h-[2px] max-md:w-[316px] w-full" width="316" height="1" viewBox="0 0 316 1" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="316" height="1" fill="#803A89"/>
    </svg>

  </div>
</template>

<style scoped>
/* Hide scrollbar but allow scrolling */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

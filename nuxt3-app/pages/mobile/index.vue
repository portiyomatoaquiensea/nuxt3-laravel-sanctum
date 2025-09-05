<script setup lang="ts">
useSeoMeta({
  title: "Home",
});
definePageMeta({
  layout: "mobile",
});
const popularGames = [
  {
    id: 1,
    title: "CELEST DAYS OLYMPUS",
    image: "/images/mobile/pp-olympus.png",
  },
  {
    id: 2,
    title: "Starlight Princess",
    image: "/images/mobile/pp-princess.png",
  },
  {
    id: 3,
    title: "Mahjong Ways 2",
    image: "/images/mobile/pp-princess.png",
  },
  {
    id: 4,
    title: "Sugar Pop",
    image: "/images/mobile/pp-princess.png",
  },
];
</script>

<template>
  <div class="bg-[#0d0d26] min-h-screen text-white font-sans">
    <div class="relative mx-auto overflow-hidden shadow-lg">
      <MobileSlider />
      <MobileRunningText />
      <MobileMenu />
    </div>

    <!-- Jackpot Play Section -->
    <div class="px-[15px]">
      <MobileJackpot />
    </div>

    <div class="max-w-4xl mx-auto mt-10 px-4 sm:px-0">

      <!-- Jackpot Games -->
      <div class="mt-6 grid grid-cols-2 gap-6">
        <div
          class="jackpot-card relative rounded-lg overflow-hidden shadow-lg cursor-pointer border border-pink-600 hover:border-pink-400 transition"
        >
          <img
            src="/images/mobile/pp-mahjong.gif"
            alt="Mahjong Ways"
            class="w-full h-48 object-cover"
          />
          <div
            class="absolute top-2 left-10 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded flex flex-col items-center justify-center text-center space-y-0.5"
          >
            <!-- First row: SVG + JACKPOT -->
            <div class="flex items-center justify-center space-x-1">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17 9V7a5 5 0 00-10 0v2H6a2 2 0 00-2 2v5a2 2 0 002 2h12a2 2 0 002-2v-5a2 2 0 00-2-2h-1z"
                />
              </svg>
              <span class="leading-none">JACKPOT</span>
            </div>

            <!-- Second row: amount -->
            <div class="text-xs font-extrabold">Rp 850,208,157</div>
          </div>
        </div>

        <div
          class="jackpot-card relative rounded-lg overflow-hidden shadow-lg cursor-pointer border border-pink-600 hover:border-pink-400 transition"
        >
          <img
            src="/images/mobile/pp-mahjong-ways.gif"
            alt="Mahjong Ways 2"
            class="w-full h-48 object-cover"
          />
          <div
            class="absolute top-2 left-10 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded flex flex-col items-center justify-center text-center space-y-0.5"
          >
            <!-- First row: SVG + JACKPOT -->
            <div class="flex items-center justify-center space-x-1">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17 9V7a5 5 0 00-10 0v2H6a2 2 0 00-2 2v5a2 2 0 002 2h12a2 2 0 002-2v-5a2 2 0 00-2-2h-1z"
                />
              </svg>
              <span class="leading-none">JACKPOT</span>
            </div>

            <!-- Second row: amount -->
            <div class="text-xs font-extrabold">Rp 850,208,157</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Popular Games (Horizontal Scroll) -->
    <section class="max-w-4xl mx-auto mt-10 px-4 sm:px-0 pb-20">
      <h3 class="text-white font-semibold text-lg mb-4">Popular Game</h3>

      <div class="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        <div
          v-for="game in popularGames"
          :key="game.id"
          class="min-w-[140px] rounded-lg overflow-hidden cursor-pointer shadow-lg border border-pink-600 hover:border-pink-400 transition"
        >
          <img
            :src="game.image"
            :alt="game.title"
            class="w-full h-[100px] object-cover"
          />
          <div class="p-2 text-center text-sm font-semibold text-pink-300">
            {{ game.title }}
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom Navigation with Center Button -->
    <nav
      class="fixed bottom-0 left-0 right-0 bg-[#0b0b1f] flex justify-around items-center py-3 border-t border-pink-600"
    >
      <!-- Left buttons -->
      <button class="flex flex-col items-center text-pink-500">
        <img
          src="/images/mobile/tabs/main.png"
          alt="Home"
          class="w-6 h-6 mb-1"
        />
        <span class="text-xs">Home</span>
      </button>

      <button class="flex flex-col items-center text-pink-500">
        <img
          src="/images/mobile/tabs/promo.png"
          alt="Promo"
          class="w-6 h-6 mb-1"
        />
        <span class="text-xs">Promo</span>
      </button>

      <!-- Center MASUK / DAFTAR button -->
      <div class="relative">
        <div
          class="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white rounded-full px-8 py-3 font-bold shadow-lg cursor-pointer hover:bg-pink-500 transition z-10"
        >
          MASUK / DAFTAR
        </div>
      </div>

      <!-- Right buttons -->
      <button class="flex flex-col items-center text-pink-500">
        <img
          src="/images/mobile/tabs/chat.png"
          alt="Chat"
          class="w-6 h-6 mb-1"
        />
        <span class="text-xs">Chat</span>
      </button>

      <button class="flex flex-col items-center text-pink-500">
        <img
          src="/images/mobile/tabs/profile.png"
          alt="Profile"
          class="w-6 h-6 mb-1"
        />
        <span class="text-xs">Profile</span>
      </button>
    </nav>
  </div>
</template>

<style>
/* Hide scrollbar for WebKit & Firefox */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

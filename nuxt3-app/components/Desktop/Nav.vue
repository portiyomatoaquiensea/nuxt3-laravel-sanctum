<!-- components/DesktopNav.vue -->
<script setup lang="ts">
const navItems = [
  { label: "HOT GAMES", iconPath: "images/icons/casino.png" },
  { label: "SPORTS", iconPath: "images/icons/casino.png" },
  { label: "SLOTS", iconPath: "images/icons/casino.png" },
  { label: "LIVE CASINO", iconPath: "images/icons/casino.png" },
  { label: "ARCADE", iconPath: "images/icons/casino.png" },
  { label: "LOTTERY", iconPath: "images/icons/casino.png" },
  { label: "COCKFIGHT", iconPath: "images/icons/casino.png" },
  { label: "LUCKY SPIN", iconPath: "images/icons/casino.png" },
  { label: "PROMOTION", iconPath: "images/icons/casino.png" },
  { label: "RANKING", iconPath: "images/icons/casino.png" },
  { label: "LOYALTY", iconPath: "images/icons/casino.png" },
  { label: "TOURNAMENT", iconPath: "images/icons/casino.png" },
];
</script>

<template>
  <nav
    class="flex items-center justify-between py-2 px-5 border-b-4 border-[#be04be] bg-[#100f43]"
  >
    <!-- Left: Logo -->
    <div class="flex items-center">
      <img src="/images/logo.png" alt="Logo" class="h-24 w-auto" />
    </div>

    <!-- Right: Navigation Items -->
    <div class="flex space-x-6 text-lg">
      <DesktopNavItem
        v-for="(item, index) in navItems"
        :key="index"
        :label="item.label"
        :iconPath="item.iconPath"
        class="text-white text-lg"
      />
    </div>
  </nav>
</template>

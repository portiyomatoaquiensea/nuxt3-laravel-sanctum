<template>
    <nav class="h-[93px] fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0b0b1f]">
      <!-- Left side: Dark mode toggle -->
      <div class="flex items-center space-x-3">
        <button
          aria-label="Toggle theme"
          class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition"
        >
          <svg
            class="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
          </svg>
        </button>
      </div>

      <!-- Center the logo absolutely -->
      <div
        class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <img src="../../public/images/logo.png" alt="Joker logo" class="h-[4.5rem]" />
      </div>

      <!-- Right side: Hamburger menu -->
      <button aria-label="Menu" class="text-white md:hidden">
        <!-- <svg
          class="w-8 h-8"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          viewBox="0 0 24 24"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg> -->
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect width="25.5185" height="13" fill="url(#pattern0_1_73)"/>
            <defs>
            <pattern id="pattern0_1_73" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlink:href="#image0_1_73" transform="scale(0.0188679 0.037037)"/>
            </pattern>
            <image id="image0_1_73" width="53" height="27" preserveAspectRatio="none" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAAbCAYAAADcQMc2AAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAb0lEQVRYhe3YwQ2AUAgE0cFQmhbwq9HetDa0CcwGwqtgNuGErYiXZjZ1wB9mVBUOXOqIbLYi1A3pWp7fjKpiRlXhwK2OyObAro7I1vL8Wo5y4FFHZHPgUEdka3l+M6qKGVWFA6c6IpvNi6yIGVXFB7K6DBRqQtKSAAAAAElFTkSuQmCC"/>
            </defs>
        </svg>
      </button>
    </nav>
</template>
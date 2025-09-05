<!-- components/TopBar.vue -->
<script setup lang="ts">
import { FetchError } from "ofetch";
import { useAuthStore } from "@/stores/auth"; // import Pinia store
const auth = useAuthStore(); // access auth store
// Logout function
const logoutUser = async () => {
  try {
    await $fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    auth.logout(); // clear Pinia state
  } catch (err) {
    console.error("Logout error:", err);
  }
};

// Fetch user on mount
onMounted(async () => {
  try {
    await $fetch("/api/auth/csrf", { credentials: "include" });

    const res = await $fetch("/api/auth/user", {
      method: "GET",
      credentials: "include",
    });
    if (res && res.data) {
      auth.setUser(res.data || null);
    }
  } catch (err) {
    auth.logout();
    console.error("User fetch error:", err);
  }
});

const form = ref({
  email: "",
  password: "",
});
const busy = ref(false);
const errors = ref<Record<string, string[]>>({});
const submitForm = async () => {
  errors.value = {};
  busy.value = true;

  try {
    await $fetch("/api/auth/csrf", { credentials: "include" });
    // 2️⃣ Call proxy login endpoint
    const res = await $fetch("/api/auth/login", {
      method: "POST",
      body: form.value,
      credentials: "include",
    });
    if (res && res.data) {
      console.log(res);

      busy.value = false;
      auth.setUser(res.data || null);
      // 3️⃣ Redirect to dashboard after successful login
    }
  } catch (err) {
    busy.value = false;

    if (err instanceof FetchError) {
      if (err.response?.status === 422) {
        errors.value = err.response._data?.errors || {};
      } else {
        console.error("Login error:", err.response || err);
      }
    } else {
      console.error("Unexpected error:", err);
    }
  }
};

const openFlag = ref(false);
const flags = [
  { value: "id", label: "Indonesia", icon: "/images/flags/id.svg" },
  { value: "us", label: "United States", icon: "/images/flags/us.svg" },
];
const selectedFlag = ref(flags[0]);

function selectFlag(flag: any) {
  selectedFlag.value = flag;
  openFlag.value = false;
}
</script>

<template>
  <div
    class="flex items-center justify-between px-6 py-2 bg-[#0b0c3a] border-b-4 border-[#be04be]"
  >
    <!-- Left -->
    <div class="flex items-center space-x-4">
      <button
        class="bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 text-sm rounded-md font-semibold flex items-center space-x-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          viewBox="0 0 1024 1024"
          fill="#ffffff"
        >
          <path
            fill="#ffffff"
            d="M896 832v192q-7-4-20-12t-54-44t-82-84q-49 12-100 12q-73 0-134.5-15T405 844t-66.5-49t-39-50t-11.5-41h96q129 0 229.5-45T773 526t59-206q192 97 192 272q0 143-128 240zm-64-512zM384 640q-51 0-100-12q-41 48-80 83t-58 46l-18 11V576Q0 479 0 336q0-91 51.5-168.5T191.5 45t193-45t193 45T717 167.5T768 336t-52 161t-139 106.5T384 640zm0-576q-87 0-160.5 34T107 191T64 319.5T107 448t116.5 93.5T384 576t160.5-34.5T661 448t43-128.5T661 191T544.5 98T384 64z"
          />
        </svg>
        <span>LIVE CHAT</span>
      </button>

      <label class="flex items-center justify-between space-x-2 cursor-pointer">
        <span>MOBILE VERSION</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 16 16"
          fill="#ffffff"
        >
          <path
            fill="#ffffff"
            d="M6 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5"
          />
          <path
            fill="#ffffff"
            fill-rule="evenodd"
            d="M4.5 0A1.5 1.5 0 0 0 3 1.5v13A1.5 1.5 0 0 0 4.5 16h7a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 11.5 0zM4 1.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V4H4zM4 13v1.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V13zm0-1h8V5H4z"
            clip-rule="evenodd"
          />
        </svg>
      </label>

      <div class="relative inline-block w-14">
        <button
          @click="openFlag = !openFlag"
          class="flex items-center justify-center w-full bg-transparent rounded px-2 py-1 text-xs text-white"
        >
          <img :src="selectedFlag.icon" alt="" class="w-5 h-5 rounded-full" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 ml-1"
            viewBox="0 0 20 20"
            fill="#ffffff"
          >
            <path fill="#ffffff" d="m15 8l-4.03 6L7 8h8z" />
          </svg>
        </button>

        <div
          v-if="openFlag"
          class="absolute mt-1 w-full bg-gray-800 rounded shadow-lg z-10"
        >
          <div
            v-for="flag in flags"
            :key="flag.value"
            @click="selectFlag(flag)"
            class="flex items-center justify-center px-2 py-1 cursor-pointer hover:bg-gray-700"
          >
            <img :src="flag.icon" alt="" class="w-5 h-5 rounded-full" />
          </div>
        </div>
      </div>
    </div>
    <template v-if="!auth.isLoggedIn">
      <form
        @submit.prevent="submitForm"
        class="flex items-start space-x-2 text-xs"
      >
        <!-- Username -->
        <div class="flex flex-col">
          <input
            id="email"
            type="email"
            v-model="form.email"
            placeholder="USERNAME"
            class="bg-[#12123a] border border-[#3f31cc] rounded px-2 py-1 text-sm placeholder:text-[#6666f7] focus:outline-none focus:ring-1 focus:ring-[#6a5fff]"
          />
          <span class="text-sm text-red-600 mt-1" v-if="errors.email">
            {{ errors.email[0] }}
          </span>
        </div>

        <!-- Password -->
        <div class="flex flex-col">
          <input
            id="password"
            type="password"
            v-model="form.password"
            placeholder="PASSWORD"
            class="bg-[#12123a] border border-[#3f31cc] rounded px-2 py-1 text-sm placeholder:text-[#6666f7] focus:outline-none focus:ring-1 focus:ring-[#6a5fff]"
          />
          <p class="text-red-500 text-xs mt-1 cursor-pointer hover:underline">
            *Lupa Kata Sandi ?
          </p>
          <span class="text-sm text-red-600 mt-1" v-if="errors.password">
            {{ errors.password[0] }}
          </span>
        </div>

        <!-- Buttons -->
        <div class="flex space-x-2">
          <button
            type="submit"
            class="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1 rounded font-bold tracking-wide hover:opacity-90"
          >
            DAFTAR
          </button>
          <button
            type="submit"
            class="bg-gradient-to-r from-teal-400 to-cyan-600 px-4 py-1 rounded font-bold tracking-wide hover:opacity-90"
          >
            MASUK
          </button>
        </div>
      </form>
    </template>

    <template v-if="auth.isLoggedIn">
      <div
        v-if="auth.user"
        class="p-4 flex items-center justify-between rounded-md"
      >
        <!-- Left: User Initial -->
        <div
          class="flex-shrink-0 text-white font-bold tracking-wide text-lg mr-4"
        >
          {{ auth.user?.name }}
        </div>

        <!-- Center: Account Balance -->
        <div
          class="flex-grow mx-4 bg-[#0f111f] rounded-md px-4 py-2 text-center text-sm font-semibold text-white shadow-[0_0_10px_rgba(171,0,255,0.8)] select-none"
        >
          IDR <span class="text-[#00ff9b]">{{ auth.user.balance ?? 0 }}</span>
          <span class="text-[#00ff9b] font-normal">
            [{{ auth.user.point ?? 0 }}]
          </span>
          <div class="mt-0.5 text-xs text-[#ffdd00] font-medium">
            ACCOUNT VERIFIED
          </div>
        </div>

        <!-- Right: Buttons -->
        <div class="flex-shrink-0 flex space-x-2">
          <button
            class="bg-gradient-to-r from-purple-600 to-purple-700 px-2 py-1 text-xs rounded-md font-semibold flex flex-col items-center space-y-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="#fb009a"
            >
              <path
                fill="#fb009a"
                d="M0 4c0-1.1.9-2 2-2h15a1 1 0 0 1 1 1v1H2v1h17a1 1 0 0 1 1 1v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm16.5 9a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3z"
              />
            </svg>
            <span>DEPOSIT</span>
          </button>

          <button
            class="bg-gradient-to-r from-purple-600 to-purple-700 px-2 py-1 text-xs rounded-md font-semibold flex flex-col items-center space-y-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="#fb009a"
            >
              <path
                fill="#fb009a"
                fill-rule="evenodd"
                d="M8 7a4 4 0 1 1 8 0a4 4 0 0 1-8 0Zm0 6a5 5 0 0 0-5 5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3a5 5 0 0 0-5-5H8Z"
                clip-rule="evenodd"
              />
            </svg>
            <span>MY ACCOUNT</span>
          </button>

          <button
            @click="logoutUser"
            class="bg-gradient-to-r from-purple-600 to-purple-700 px-2 py-1 text-xs rounded-md font-semibold flex items-center space-x-1"
            type="button"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

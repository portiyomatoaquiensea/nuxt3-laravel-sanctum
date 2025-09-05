<script setup lang="ts">
const { isLoggedIn, user, logout } = useSanctum<User>();
const logoutUser = () => logout();
</script>

<template>
  <div class="h-screen">
    <MobileHeader />
    <div class="pt-[5.8rem]">
      <slot />
    </div>
  </div>
</template>

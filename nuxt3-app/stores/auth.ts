// stores/auth.ts
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<any>(null);
  const isLoggedIn = ref(false);

  const setUser = (data: any) => {
    user.value = data;
    isLoggedIn.value = !!data?.id;
  };

  const logout = () => {
    user.value = null;
    isLoggedIn.value = false;
  };

  return { user, isLoggedIn, setUser, logout };
});

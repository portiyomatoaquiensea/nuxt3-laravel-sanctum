// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  devServer: {
    host: process.env.NUXT_DEV_SERVER_HOST,
  },

  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    "@pinia/nuxt",
    "@qirolab/nuxt-sanctum-authentication",
    "vue3-carousel-nuxt",
  ],

  carousel: {
    prefix: "MyPrefix",
  },

  laravelSanctum: {
    apiUrl: process.env.NUXT_SANCTUM_API_URL,
    authMode: (process.env.NUXT_AUTH_MODE as "token" | "cookie") || "cookie",

    userResponseWrapperKey: "data",
    sanctumEndpoints: {
      csrf: "/api/auth/csrf",
      login: "/api/auth/login",
      logout: "/api/auth/logout",
      user: "/api/auth/user",
    },

    redirect: {
      // Preserve the originally requested route, redirecting users there after login
      enableIntendedRedirect: false,

      // Path to redirect users when a page requires authentication
      loginPath: "/auth/login",

      // URL to redirect users to when guest-only access is required
      guestOnlyRedirect: "/dashboard",

      // URL to redirect to after a successful login
      redirectToAfterLogin: "/",

      // URL to redirect to after logging out
      redirectToAfterLogout: "/",
    },
  },
  runtimeConfig: {
    apiBase: process.env.API_BASE_URL || "",
  },
  routeRules: {
    "/robots.txt": { static: true },
  },
});

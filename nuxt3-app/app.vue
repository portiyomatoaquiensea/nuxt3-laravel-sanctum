<script setup lang="ts">
import { useHead } from "#imports";
const headData = ref<any>(null);

onMounted(async () => {
  try {
    await $fetch("/api/auth/csrf", { credentials: "include" });
    const res = await $fetch("/api/head-config", {
      method: "GET",
      credentials: "include",
    });
    if (res && res.data) {
      headData.value = res.data;
    }
  } catch (err) {
    console.error("User fetch error:", err);
  }

  if (process.client) {
    // Apply <head> dynamically
    if (headData.value.head) {
      useHead({
        title: headData.value.head.title,
        link: headData.value.head.link || [],
        meta: headData.value.head.meta || [],
        script: headData.value.head.scripts || [],
      });
    }

    // Inject jQuery if provided
    if (headData.value.body?.jquerySrc) {
      const jq = document.createElement("script");
      jq.src = headData.value.body.jquerySrc;
      jq.async = true;
      document.body.appendChild(jq);

      jq.onload = () => {
        // Floating panel toggle
        $(".fixed-arrow").click(function () {
          $(".fixed-left").toggleClass("nganu");
        });
      };
    }

    // Inject floating panel HTML
    if (headData.value.body?.floatingPanelHtml) {
      const panel = document.createElement("div");
      panel.innerHTML = headData.value.body.floatingPanelHtml;
      document.body.appendChild(panel);
    }

    // Inject floating button HTML
    if (headData.value.body?.floatingButtonHtml) {
      const button = document.createElement("div");
      button.innerHTML = headData.value.body.floatingButtonHtml;
      document.body.appendChild(button);
    }
  }
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* Fixed left panel */
.fixed-left {
  zoom: 0.85;
  position: fixed;
  z-index: 99;
  bottom: 90px;
  left: -10px;
  width: 110px;
  padding: 15px 15px 15px 20px;
  background-color: rgba(38, 38, 38, 0.82);
  border-radius: 10px;
  border: 3px solid transparent;
  transition: 0.5s ease-in-out;
}
.fixed-left.nganu {
  left: -110px;
}
.fixed-left a {
  display: block;
}
.fixed-img-100 {
  width: 100%;
}
.fixed-arrow {
  position: absolute;
  right: -25px;
  top: 10px;
  bottom: 10px;
  background: linear-gradient(to bottom, #000 0%, #39ff14 50%, #000 100%);
  width: 25px;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
}
.img-xxs {
  height: 20px;
}
@media (max-width: 1366px) {
  .img-xxs {
    height: 15px;
  }
}

/* Floating button */
.floatingButton {
  display: none;
}
@media (max-width: 1500px) {
  .floatingButton {
    position: fixed;
    bottom: 55px;
    right: 14px;
    z-index: 9;
    width: 70px;
    height: 70px;
    display: block;
  }
}

/* Additional styles for animation if needed */
.animated {
  animation: bounce 1s infinite alternate;
}
@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}
</style>

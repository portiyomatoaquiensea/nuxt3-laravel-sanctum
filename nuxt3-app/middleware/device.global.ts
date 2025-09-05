export default defineNuxtRouteMiddleware((to) => {
  const userAgent = process.client
    ? navigator.userAgent
    : useRequestHeaders(["user-agent"])["user-agent"] || "";
  const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);

  // Don't break Sanctum redirects
  if (to.path.startsWith("/api")) return;

  if (isMobile && !to.path.startsWith("/mobile")) {
    return navigateTo("/mobile" + to.path);
  }
});

import { defineEventHandler, setHeader } from "h3";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiBase = config.apiBase;

  const laravelUrl = `${apiBase}/sanctum/csrf-cookie`;

  const res = await fetch(laravelUrl, {
    method: "GET",
    headers: {
      cookie: event.req.headers.cookie || "",
    },
  });

  // Forward all Set-Cookie headers to browser
  const setCookieHeaders = res.headers.get("set-cookie");
  if (setCookieHeaders) {
    // If multiple cookies, Node fetch might combine into a string, split by comma
    setHeader(event, "Set-Cookie", setCookieHeaders.split(", "));
  }

  return { message: "CSRF cookies forwarded" };
});

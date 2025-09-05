// server/routes/amp.ts
import { parse } from "cookie";

export default defineEventHandler(async (event) => {
  const cookieHeader = event.req.headers.cookie || "";
  const cookies = parse(cookieHeader);

  // Laravel expects X-XSRF-TOKEN header for stateful requests
  const xsrfToken = cookies["XSRF-TOKEN"]
    ? decodeURIComponent(cookies["XSRF-TOKEN"])
    : "";

  const config = useRuntimeConfig();
  const apiBase = config.apiBase;

  // 👇 Update this to your Laravel AMP endpoint
  const laravelUrl = `${apiBase}/amp`;

  const res = await fetch(laravelUrl, {
    method: "GET",
    headers: {
      Accept: "text/html", // AMP usually returns HTML
      "X-XSRF-TOKEN": xsrfToken,
      Cookie: cookieHeader, // forward cookies
    },
    credentials: "include",
  });

  // Forward cookies from Laravel if needed
  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    setHeader(event, "Set-Cookie", setCookie.split(/,(?=\s*\w+=)/));
  }

  // Make sure the response is AMP-compatible HTML
  const contentType = res.headers.get("content-type") || "text/html";
  setHeader(event, "Content-Type", contentType);

  return await res.text();
});

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
  const laravelUrl = `${apiBase}/head-config`;

  const res = await fetch(laravelUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "X-XSRF-TOKEN": xsrfToken,
      Cookie: cookieHeader, // forward cookies
    },
    credentials: "include", // needed for session cookies
  });

  // Forward any Set-Cookie from Laravel
  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    setHeader(event, "Set-Cookie", setCookie.split(/,(?=\s*\w+=)/));
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return await res.json();
  } else {
    // Optional: log for debugging
    const text = await res.text();
    console.error("Laravel /user returned:", text);
    return {
      error: true,
      message: "Invalid response from Laravel",
      html: text,
    };
  }
});

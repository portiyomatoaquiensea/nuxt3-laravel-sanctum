import { parse, serialize } from "cookie";
import { setHeader, defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const cookieHeader = event.req.headers.cookie || "";
  const cookies = parse(cookieHeader);

  const xsrfToken = cookies["XSRF-TOKEN"]
    ? decodeURIComponent(cookies["XSRF-TOKEN"])
    : "";
  const config = useRuntimeConfig();
  const apiBase = config.apiBase;
  const laravelUrl = `${apiBase}/logout`;

  const res = await fetch(laravelUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "X-XSRF-TOKEN": xsrfToken,
      Cookie: cookieHeader,
    },
    credentials: "include",
  });

  // Clear Laravel cookies in Nuxt
  setHeader(event, "Set-Cookie", [
    serialize("laravel_session", "", { path: "/", expires: new Date(0) }),
    serialize("XSRF-TOKEN", "", { path: "/", expires: new Date(0) }),
  ]);

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return await res.json();
  } else {
    const text = await res.text();
    console.error("Laravel /logout returned:", text);
    return {
      error: true,
      message: "Invalid response from Laravel",
      html: text,
    };
  }
});

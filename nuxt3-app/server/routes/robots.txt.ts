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
  const laravelUrl = `${apiBase}/robots-txt`;

  const res = await fetch(laravelUrl, {
    method: "GET",
    headers: {
      Accept: "text/plain",
      "X-XSRF-TOKEN": xsrfToken,
      Cookie: cookieHeader,
    },
    credentials: "include",
  });

  // Forward cookies from Laravel
  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    setHeader(event, "Set-Cookie", setCookie.split(/,(?=\s*\w+=)/));
  }

  // Always return plain text
  setHeader(event, "Content-Type", "text/plain");
  return await res.text();
});

import { parse } from "cookie";

export default defineEventHandler(async (event) => {
  const cookieHeader = event.req.headers.cookie || "";
  const cookies = parse(cookieHeader);

  const xsrfToken = cookies["XSRF-TOKEN"]
    ? decodeURIComponent(cookies["XSRF-TOKEN"])
    : "";

  const config = useRuntimeConfig();
  const apiBase = config.apiBase;
  const laravelUrl = `${apiBase}/sitemap-xml`;

  const res = await fetch(laravelUrl, {
    method: "GET",
    headers: {
      Accept: "application/xml",
      "X-XSRF-TOKEN": xsrfToken,
      Cookie: cookieHeader,
    },
    credentials: "include",
  });

  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    setHeader(event, "Set-Cookie", setCookie.split(/,(?=\s*\w+=)/));
  }

  setHeader(event, "Content-Type", "application/xml");
  return await res.text();
});

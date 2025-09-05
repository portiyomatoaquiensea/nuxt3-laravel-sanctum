import { parse } from "cookie";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const cookieHeader = event.req.headers.cookie || "";
  const cookies = parse(cookieHeader);

  const config = useRuntimeConfig();
  const apiBase = config.apiBase;
  const laravelUrl = `${apiBase}/login`;

  // Laravel expects header X-XSRF-TOKEN (decoded from cookie)
  const xsrfToken = cookies["XSRF-TOKEN"]
    ? decodeURIComponent(cookies["XSRF-TOKEN"])
    : "";

  const res = await fetch(laravelUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-XSRF-TOKEN": xsrfToken,
      cookie: cookieHeader, // forward cookies
    },
    body: JSON.stringify(body),
    credentials: "include",
  });

  const setCookie = res.headers.get("set-cookie");
  if (setCookie) setHeader(event, "Set-Cookie", setCookie.split(", "));

  return await res.json();
});

const API_BASE = "https://apiorion7.orion7.ai/api";
const API_CLIENT_BASE = "https://apirh.orion7.ai/api";

export async function apiRequest(
  endpoint: string,
  payload: Object,
  token?: string,
  type: "client" | "auth" = "client",
) {
  return await fetch(
    `${type === "client" ? API_CLIENT_BASE : API_BASE}${endpoint}`,
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
    },
  );
}

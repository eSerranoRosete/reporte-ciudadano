const API_BASE = "https://apirh.orion7.ai";

export async function apiRequest(endpoint: string, payload: Object) {
  return await fetch(`${API_BASE}/api${endpoint}`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

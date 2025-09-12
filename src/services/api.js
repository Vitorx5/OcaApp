// src/services/api.js
const BASE_URL = "https://socaunida.com.br/api"; // ajuste

export async function postCoord({ usuario_id, latitude, longitude, token }) {
  const resp = await fetch(`${BASE_URL}/coords`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify({ usuario_id, latitude, longitude })
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new Error(`Falha ao enviar coordenada (${resp.status}): ${text}`);
  }

  return resp.json().catch(() => ({}));
}

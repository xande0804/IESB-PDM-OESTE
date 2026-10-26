const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

/** Faz requisições JSON; falhas de rede ou HTTP chegam ao chamador. */
async function request(resource, options = {}) {
  if (!BASE_URL) throw new Error('EXPO_PUBLIC_API_URL não configurada.');
  const response = await fetch(BASE_URL.replace(/\/$/, '') + '/' + resource, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  if (!response.ok) throw new Error('Erro HTTP ' + response.status);
  return response.json();
}
const send = (method, body) => ({ method, body: JSON.stringify(body) });

export const api = {
  list: (resource) => request(resource),
  create: (resource, body) => request(resource, send('POST', body)),
  update: (resource, id, body) => request(resource + '/' + id, send('PUT', body)),
  remove: (resource, id) => request(resource + '/' + id, { method: 'DELETE' }),
};

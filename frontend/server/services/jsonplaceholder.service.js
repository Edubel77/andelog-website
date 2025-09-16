import { config } from '../config.js';

const BASE = config.MOCK_BASE_URL;

async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      ...(options.headers || {}),
    },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err = new Error(`Upstream HTTP ${res.status}`);
    err.status = res.status;
    err.body = text;
    throw err;
  }
  return res.json();
}

export async function listUsers() {
  return apiFetch('/users');
}

export async function getUserById(id) {
  return apiFetch(`/users/${encodeURIComponent(id)}`);
}

export async function createUser(data) {
  return apiFetch('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

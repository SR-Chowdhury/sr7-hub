const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const TOKEN_KEY = 'sr7_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const t = getToken();
    if (t) headers.Authorization = `Bearer ${t}`;
  }

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let json = null;
  try {
    json = await res.json();
  } catch {
    /* empty body */
  }

  if (!res.ok) {
    const msg = json?.error?.message || `Request failed (${res.status})`;
    const err = new Error(msg);
    err.status = res.status;
    if (res.status === 401) clearToken();
    throw err;
  }
  return json;
}

/* ---------- Auth ---------- */
export const login = (email, password) =>
  request('/auth/login', { method: 'POST', body: { email, password } }).then((r) => {
    setToken(r.data.token);
    return r.data.user;
  });

export const me = () => request('/auth/me', { auth: true }).then((r) => r.data);


/* ---------- Resource factory ---------- */
const makeResource = (path) => ({
  list: (params = {}) => {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v != null))
    ).toString();
    return request(`${path}${qs ? `?${qs}` : ''}`);
  },
  get: (id) => request(`${path}/${id}`).then((r) => r.data),
  create: (data) => request(path, { method: 'POST', body: data, auth: true }).then((r) => r.data),
  update: (id, data) =>
    request(`${path}/${id}`, { method: 'PATCH', body: data, auth: true }).then((r) => r.data),
  remove: (id) => request(`${path}/${id}`, { method: 'DELETE', auth: true }),
});

export const labs = makeResource('/labs');
export const machines = makeResource('/machines');
export const walkthroughs = makeResource('/walkthroughs');
export const audits = makeResource('/audits');
export const gigs = makeResource('/gigs');

// Profile is a singleton — no list/remove, just get + update
export const profile = {
  get: () => request('/profile').then((r) => r.data),
  update: (data) => request('/profile', { method: 'PUT', body: data, auth: true }).then((r) => r.data),
};


/* Backwards-compat aliases so existing Labs pages keep working */
export const listLabs = labs.list;
export const getLab = labs.get;
export const createLab = labs.create;
export const updateLab = labs.update;
export const deleteLab = labs.remove;
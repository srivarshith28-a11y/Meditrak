
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export const getSummary = () => apiRequest('/api/summary');

export const getReport = () => apiRequest('/api/getReport');

export const addWaste = (data) =>
  apiRequest('/api/addWaste', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const optimizeRoute = (data) =>
  apiRequest('/api/optimizeRoute', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const login = (username, password) =>
  apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
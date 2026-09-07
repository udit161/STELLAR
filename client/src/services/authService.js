/**
 * SatQuery AI - Authentication Service Layer
 * Handles signup, login, token storage, and user session management.
 * Communicates with FastAPI auth endpoints on the AI Agent microservice.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const TOKEN_KEY = 'satquery_token';
const USER_KEY = 'satquery_user';

/**
 * Store auth data in localStorage
 */
function saveAuthData(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/**
 * Clear auth data from localStorage
 */
export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * Get stored JWT token
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Get stored user object
 */
export function getUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Check if user is currently authenticated
 */
export function isAuthenticated() {
  return !!getToken();
}

/**
 * Register a new user account
 * @param {{ email: string, username: string, password: string, full_name?: string }} payload
 * @returns {Promise<{ access_token: string, user: object }>}
 */
export async function signup(payload) {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ detail: 'Signup failed' }));
    throw new Error(err.detail || `Server error ${response.status}`);
  }

  const data = await response.json();
  saveAuthData(data.access_token, data.user);
  return data;
}

/**
 * Login with username/email and password
 * @param {{ username_or_email: string, password: string }} payload
 * @returns {Promise<{ access_token: string, user: object }>}
 */
export async function login(payload) {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ detail: 'Login failed' }));
    throw new Error(err.detail || `Server error ${response.status}`);
  }

  const data = await response.json();
  saveAuthData(data.access_token, data.user);
  return data;
}

/**
 * Fetch current user profile using stored JWT
 * @returns {Promise<object>}
 */
export async function fetchCurrentUser() {
  const token = getToken();
  if (!token) throw new Error('No auth token');

  const response = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    logout();
    throw new Error('Session expired');
  }

  return await response.json();
}

export default {
  signup,
  login,
  logout,
  getToken,
  getUser,
  isAuthenticated,
  fetchCurrentUser,
};

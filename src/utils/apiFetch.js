// import { jwtDecode } from 'jwt-decode'

let API_BASE = import.meta.env.VITE_API_URL


export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('jwt')
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  if (!res.ok) {
    // 401: non authentifié, 403: authentifié mais non autorisé
    const text = await res.text()
    throw new Error(`HTTP ${res.status} ${text || ''}`.trim())
  }
  if (res.status === 204) return null
  return res.json()
}

// export function isTokenValid() {
//   const token = localStorage.getItem('jwt')
//   if (!token) return false
//   try {
//     const { exp } = jwtDecode(token)
//     return Date.now() < exp * 1000
//   } catch {
//     return false
//   }
// }

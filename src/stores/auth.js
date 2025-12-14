import { defineStore} from 'pinia'
import { ref } from 'vue'
import { computed } from 'vue'

const API_URL = import.meta.env.VITE_API_URL

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)


  const setToken = (newToken) => {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
  }

  const setUser = (userData) => {
    user.value = userData
    if (userData) {
    localStorage.setItem('user', JSON.stringify(userData))
    } else {
    localStorage.removeItem('user')
  }

  }

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      if (response.ok) {
        const { token: newToken, user: userData } = await response.json()
        setToken(newToken)
        setUser(userData)
        return { success: true }
      } else {
        const error = await response.json()
        return { success: false, error }
      }
    } catch (err) {
      console.error('Login error:', err)
      return
    }
  }

  const isAdmin = computed(() => user.value?.is_admin === true)
  console.log('user',user)
  const logout = () => {
    setToken(null)
    setUser(null)
  }

  const isAuthenticated = computed(() => !!token.value)

  return { token, isAdmin,user, login, logout, isAuthenticated, setToken, setUser }
})

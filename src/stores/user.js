import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth.js'

const API_URL = import.meta.env.VITE_API_URL

export const useUserStore = defineStore('user', () => {
  const profile = ref(null)
  const estAdmin = ref(false)

  const obtenirProfil = async () => {
    try {
      const authStore = useAuthStore()
      const response = await fetch(`${API_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      })
      if (response.ok) {
        profile.value = await response.json()
        estAdmin.value = profile.value.is_admin
      } else if (response.status === 401) {
        authStore.logout()
      }
    } catch (err) {
      console.error('Erreur lors de la recupération du profile', err)
    }
  }

  const mettreAJourProfil = async (updates) => {
    try {
      const authStore = useAuthStore()
      const response = await fetch(`${API_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.token}`,
        },
        body: JSON.stringify(updates),
      })
      if (response.ok) {
        profile.value = { ...profile.value, ...updates }
        return { success: true }
      } else {
        const error = await response.json()
        return { success: false, error }
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour du profil:', err)
      return
    }
  }

  const deleteProfile = async () => {
    try {
      const authStore = useAuthStore()
      const response = await fetch(`${API_URL}/api/users/profile`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authStore.token}` },
      })
      if (response.ok) {
        authStore.logout()
        return { success: true }
      }
    } catch (err) {
      console.error('Erreur lors de la suppression du profil:', err)
    }
  }

  return { profile,estAdmin,obtenirProfil, mettreAJourProfil, deleteProfile }
})

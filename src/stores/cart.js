import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth.js'

const API_URL = import.meta.env.VITE_API_URL

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const total = computed(() => items.value.reduce((sum, item) => sum + (item.livre.prix * item.quantite), 0))

  const obtenirPanier = async () => {
    try {
      const authStore = useAuthStore()
      const response = await fetch(`${API_URL}/api/panier`, {
        headers: { 'Authorization': `Bearer ${authStore.token}` }
      })
      if (response.ok) {
        const valeurs = await response.json()
        items.value = valeurs.items
        console.log('Panier obtenu:', items.value)
      } else if (response.status === 401) {
        authStore.logout()
      }
    } catch (err) {
      console.error('Erreur lors de la récupération du panier', err)
    }
  }

  // Ajoute ou modifie un livre au panier
  const ajouterPanier = async (livreId, quantite = 1) => {
    try {
      const authStore = useAuthStore()
      const response = await fetch(`${API_URL}/api/panier`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authStore.token}`
        },
        body: JSON.stringify({ livreId, quantite })
      })
      if (response.ok) {
        await obtenirPanier()
        return { success: true }
      } else {
        const error = await response.json()
        return { success: false, error } // e.g., stock insufficient
      }
    } catch (err) {
      console.error('Erreur lors de L ajout au panier', err)
      return
    }
  }


  const supprimerItem = async (livreId) => {
    try {
      const authStore = useAuthStore()
      const response = await fetch(`${API_URL}/api/panier/items/${livreId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authStore.token}` }
      })
      if (response.ok) {
        await obtenirPanier()
        return { success: true }
      }
    } catch (err) {
      console.error('Erreur lors du retrait de l item du panier:', err)
    }
  }

  const viderPanier = async () => {
    try {
      const authStore = useAuthStore()
      const response = await fetch(`${API_URL}/api/panier`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authStore.token}` }
      })
      if (response.ok) {
        items.value = []
        return { success: true }
      }
    } catch (err) {
      console.error('Erreur:', err)
    }
  }

  return { items, total,obtenirPanier, ajouterPanier,supprimerItem,viderPanier }
})

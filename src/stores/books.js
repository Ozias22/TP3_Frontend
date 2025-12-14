import { defineStore } from 'pinia'
import { ref} from 'vue'
import { useAuthStore } from './auth.js'
import { apiFetch } from '@/utils/apiFetch.js'

const API_URL = import.meta.env.VITE_API_URL

export const useBooksStore = defineStore('livres', () => {
  const livres = ref([])
  const pageCourante = ref(1)
  const detailLivre = ref(null)
  const totalPages = ref(1)
  const recherche = ref('')
  const filtreCat = ref('')
  const categories = ref([])
  const estFiltre = ref(false)

  const obtenirLivres = async (page = 2, limit = 4, search = '', category = '') => {
    try {
      let url = `${API_URL}/api/livres?`
      const params = new URLSearchParams({ page, limit, recherche: search, categorie: category });
      const response = await fetch(`${url}${params}`)
      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const datas = await response.json()
      livres.value = datas.data
      totalPages.value = datas.pagination.totalPages
    } catch (err) {
      console.error('Error fetching books:', err)
    }
  }

  const rechercheLivre = (nom) => {
    recherche.value = nom
    obtenirLivres(1, estFiltre.value ? null : 4, nom, filtreCat.value)
  }

  const filterParCat = (cat) => {
    filtreCat.value = cat
    obtenirLivres(1, estFiltre.value ? null : 4, recherche.value, cat)
  }

  const resetSearch = () => {
    recherche.value = ''
    filtreCat.value = ''
    estFiltre.value = false
    obtenirLivres(1, 4)
  }

  const ajouterLivre = async (bookData) => {
    try {
      const authStore = useAuthStore()
      const response = await fetch(`${API_URL}/api/livres`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authStore.token}`
        },
        body: JSON.stringify(bookData)
      })
      if (response.ok) {
        await obtenirLivres(pageCourante.value)
        return { success: true }
      } else {
        const error = await response.json()
        return { success: false, error }
      }
    } catch (err) {
      console.error('Error adding book:', err)
      return
    }
  }
  const livreDetail = async (id) => {
    try {
      const response = await fetch(`/api/livres/${id}`)
      if (!response) return null
      detailLivre.value = await response.json()
    } catch (err) {
      console.error('Erreur lors de la récupération du livre', err)
    }
  }

  const getCategory = async () => {
    try {
      const response = await fetch(`/api/categories`)
      if (!response) return null
      categories.value = await response.json()
    } catch (err) {
      console.error('Erreur lors de la récupération du livre par catégorie', err)
    }
  }

  return {livres,detailLivre,pageCourante,categories, totalPages,recherche,filtreCat, isFiltered: estFiltre, obtenirLivres,rechercheLivre, filterParCat, resetSearch,getCategory, ajouterLivre,livreDetail }
})

<template>
  <div class="p-4 container mx-auto">
    <div v-if="message" :class="messageType" class="mb-4 p-2 rounded mt-5">
      {{ message }}
    </div>
    <h1 class="font-bold mb-2">Catalogue des Livres</h1>

    <div class="d-flex justify-content-between mx-2">
      <div>
        <input
          v-model="recherche"
          placeholder="Rechercher par titre ou auteur"
          class="border rounded-lg px-4 py-2"
        />
        <button @click="resetSearch" class="text-white px-3 py-2 rounded">Réinitialiser</button>
        <select
          v-model="selectedCategory"
          @change="filterParCat"
          class="border rounded-lg px-4 py-2"
        >
          <option value="">Toutes catégories</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>
      <div v-if="estAdmin">
        <button @click="ajoutLivre" class="btn btn-info">Ajouter un livre</button>
      </div>
    </div>

    <div class="d-flex flex-wrap gap-6 justify-content-center align-content-center">
      <BookCard v-for="livre in livres" :key="livre.id" :livre="livre" />
    </div>

    <div v-if="!isFiltered" class="flex justify-content-center gap-2">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="obtenirLivres(page)"
        :class="[
          'px-4 py-2 rounded-lg',
          pageCourante === page ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300',
        ]"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useBooksStore } from '@/stores/books'
import { useUserStore } from '@/stores/user'
import { useRouter,useRoute } from 'vue-router'
import BookCard from '@/components/BookCard.vue'

const router = useRouter()
const route = useRoute()
const livresStore = useBooksStore()
const UserStore = useUserStore()
const { estAdmin } = storeToRefs(UserStore)
const { obtenirProfil } = UserStore
const message = ref(null)
const messageType = ref(null)




const { livres, pageCourante, totalPages, recherche, categories, filtreCat, isFiltered } =
  storeToRefs(livresStore)

const { obtenirLivres, rechercheLivre, filterParCat, resetSearch, getCategory } = livresStore

const selectedCategory = ref('')

const filterByCategory = () => {
  livresStore.filterParCat(selectedCategory.value)
}

watch(recherche, (newVal) => {
  if (newVal) {
    rechercheLivre(newVal)
  } else {
    obtenirLivres(1)
  }
})

function showMessage() {
    let message = route.query.message
    let messageType = route.query.messageType

    setTimeout(() => {
      message.value = null
      messageType.value = null
    }, 3000)
  }

onMounted(() => {
  obtenirLivres(1, 4)
  getCategory()
  obtenirProfil()
  showMessage(message,messageType)
})
function ajoutLivre() {
  router.push('/livres/nouveau')
}
</script>

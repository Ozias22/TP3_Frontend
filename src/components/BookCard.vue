<template>
  <div class="rounded p-4 shadow-md col-lg-3 col-md-4 col-sm-6 mb-4 m-2">
    <img :src="livre.couverture" :alt="livre.titre" class=" h-50 object-cover mb-2" />
    <h3 class="font-bold">{{ livre.titre }}</h3>
    <p class="text-gray-600">Auteurs: {{ livre.auteurs?.join(', ') || 'N/A' }}</p>
    <p>Prix: {{ livre.prix }} $</p>
    <p>{{ livre.quantite > 0 ? `En stock (${livre.quantite})` : 'Rupture de stock' }}</p>
    <p class="text-sm">Catégories: {{ livre.categories?.join(', ') || 'N/A' }}</p>
    <button
      @click="ajoutPanier"
      :disabled="livre.stock === 0"
      class="mt-2 text-white px-4 py-2 rounded"
    >
      Ajouter au panier
    </button>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart.js'
import { useRouter } from 'vue-router'


const router = useRouter()
const props = defineProps({
  livre: {
    type: Object,
    required: true
  }
})

// defineProps(['book'])
const cartStore = useCartStore()

const ajoutPanier = () => {
  cartStore.ajouterPanier(props.livre._id)
  router.push('/panier')
}
</script>

<style scoped>
  img{
    width: 100%;
  }
  button {
    background-color: #a52a2a;
  }
  div{
    border: 3px solid #ddd;
  }
</style>

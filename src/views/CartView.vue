
<template>
  <div class="container mx-auto">
    <div v-if="message" :class="messageType" class="mb-4 p-2 rounded mt-5">
      {{ message }}
    </div>
    <h2 class="mt-4">Panier d'achat</h2>

    <div v-if="items.length === 0" class="text-center text-gray-500 py-12 italic">
      Votre panier est vide
    </div>

    <div v-else class="row">
      <table class="col-lg-8 col-md-10 mx-auto">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-2">Titre</th>
            <th class="text-left p-4">Auteur</th>
            <th class="text-left p-4">Prix unitaire</th>
            <th class="text-left p-4">Quantité</th>
            <th class="text-left p-4">Sous-total</th>
            <th class="text-left p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          <CartItemRow
            v-for="item in items"
            :key="item.livreId"
            :item="item"
            @feedback="({ message, type }) => showMessage(message, type)"
          />
        </tbody>
      </table>

      <div class="my-4 font-bold">Total : {{ total.toFixed(2) }} €</div>

      <div class="mt-6 text-right">
        <button @click="viderPanier" class="btn-danger">Vider le panier</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

table {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

thead th {
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #d1d5db;
}

tbody tr:nth-child(even) {
  background-color: #f9fafb;
}

tbody tr:hover {
  background-color: #f3f4f6;
  transition: background-color 0.2s ease;
}

.btn-danger {
  background-color: #dc2626;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
}

.btn-danger:hover {
  background-color: #b91c1c;
  transform: scale(1.05);
}

/* Message box */
.message-box {
  border: 1px solid #d1d5db;
  background-color: #f9fafb;
  font-weight: 500;
}

.success {
  border-color: #10b981;
  background-color: #d1fae5;
  color: #065f46;
}

.error {
  border-color: #ef4444;
  background-color: #fee2e2;
  color: #991b1b;
}
</style>

<script setup>
import { onMounted, ref } from 'vue'
import { useCartStore } from '../stores/cart'
import CartItemRow from '../components/CartItemRow.vue'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()

const { items, total } = storeToRefs(cartStore)
const { obtenirPanier } = cartStore

const message = ref('')
const messageType = ref('')

  function showMessage(text, type) {
    message.value = text
    messageType.value = type

    setTimeout(() => {
      message.value = null
      messageType.value = null
    }, 3000)
  }

onMounted(() => {
  obtenirPanier()
})

const viderPanier = async () => {
  const result = await cartStore.viderPanier()
  if (result?.success) {
    showMessage('Panier vidé avec succès', 'alert alert-success')
  } else {
    showMessage('Erreur lors de la vidange du panier', 'alert alert-danger')
  }

}
</script>

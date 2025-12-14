<template>
  <tr class="mx-4">
    <td class="px-2">{{ item.livre.titre }}</td>
    <td>{{ item.auteurPrincipal }}</td>
    <td>{{ item.livre.prix }} $</td>
    <td>
      <input
        type="number"
        v-model="localQuantity"
        min="1"
        :max="item.stock"
        @change="updateQuantity"
        class="w-16 border rounded px-2"
      />
    </td>
    <td>{{ item.livre.prix * localQuantity }} $</td>
    <td><button @click="removeItem" class="text-danger"><i class="bi bi-trash"></i></button></td>
  </tr>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart.js'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
const emits = defineEmits(['feedback'])
const cartStore = useCartStore()
const localQuantity = ref(props.item.quantite)

const updateQuantity = async () => {
  const resultat = await cartStore.ajouterPanier(props.item.livre._id, localQuantity.value)
  if (resultat.success) {
      emits('feedback', { message: 'Quantité mise à jour avec succès', type: 'alert alert-success' })

  }
  else {
      emits('feedback', { message: `Erreur: ${resultat.error.message || 'Erreur inconnue'}`, type: 'alert alert-danger' })

  }

}

const removeItem = () => {
  cartStore.supprimerItem(props.item.livre._id)
}
</script>

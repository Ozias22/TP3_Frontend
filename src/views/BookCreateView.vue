<!-- <template>
  <div class="max-w-md mx-auto p-4">
    <h1 class="text-2xl mb-4">Ajouter un Livre</h1>
    <form @submit.prevent="handleAddBook" class="space-y-4">
      <div>
        <label>Titre</label>
        <input v-model="form.title" required class="w-full border rounded px-2 py-1" />
        <p v-if="errors.title" class="text-red-500 text-sm">{{ errors.title }}</p>
      </div>
      <div>
        <label>Auteurs (IDs séparés par virgule)</label>
        <input v-model="form.auteurs" required class="w-full border rounded px-2 py-1" />
        <p v-if="errors.auteurs" class="text-red-500 text-sm">{{ errors.auteurs }}</p>
      </div>
      <div>
        <label>Catégories (IDs séparés par virgule)</label>
        <input v-model="form.categories" required class="w-full border rounded px-2 py-1" />
        <p v-if="errors.categories" class="text-red-500 text-sm">{{ errors.categories }}</p>
      </div>
      <div>
        <label>Prix</label>
        <input
          v-model="form.price"
          type="number"
          step="0.01"
          required
          class="w-full border rounded px-2 py-1"
        />
        <p v-if="errors.price" class="text-red-500 text-sm">{{ errors.price }}</p>
      </div>
      <div>
        <label>Stock</label>
        <input
          v-model="form.stock"
          type="number"
          required
          class="w-full border rounded px-2 py-1"
        />
        <p v-if="errors.stock" class="text-red-500 text-sm">{{ errors.stock }}</p>
      </div>
      <div>
        <label>Couverture (URL)</label>
        <input v-model="form.cover" type="url" class="w-full border rounded px-2 py-1" />
        <p v-if="errors.cover" class="text-red-500 text-sm">{{ errors.cover }}</p>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded w-full">Ajouter</button>
    </form>
    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
  </div>
</template> -->
<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <h1 class="h3 mb-4 text-center">Ajouter un Livre</h1>

            <form @submit.prevent="ajouterLivre">
              <div class="mb-3">
                <label class="form-label">Titre</label>
                <input
                  v-model="form.titre"
                  required
                  class="form-control"
                  :class="{'is-invalid': !!erreurs.titre}"
                />
                <div v-if="erreurs.titre" class="invalid-feedback">
                  {{ erreurs.titre }}
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Auteurs (IDs séparés par virgule)</label>
                <input
                  v-model="form.auteurs"
                  required
                  class="form-control"
                  :class="{'is-invalid': !!erreurs.auteurs}"
                />
                <div v-if="erreurs.auteurs" class="invalid-feedback">
                  {{ erreurs.auteurs }}
                </div>
              </div>

              <!-- Catégories -->
              <div class="mb-3">
                <label class="form-label">Catégories (IDs séparés par virgule)</label>
                <input
                  v-model="form.categories"
                  required
                  class="form-control"
                  :class="{'is-invalid': !!erreurs.categories}"
                />
                <div v-if="erreurs.categories" class="invalid-feedback">
                  {{ erreurs.categories }}
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">ISBN</label>
                <input
                  v-model="form.isbn"
                  required
                  class="form-control"
                  :class="{'is-invalid': !!erreurs.isbn}"
                />
                <div v-if="erreurs.isbn" class="invalid-feedback">
                  {{ erreurs.isbn }}
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Prix</label>
                <input
                  v-model="form.prix"
                  type="number"
                  step="0.01"
                  required
                  class="form-control"
                  :class="{'is-invalid': !!erreurs.prix}"
                />
                <div v-if="erreurs.prix" class="invalid-feedback">
                  {{ erreurs.prix }}
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Stock</label>
                <input
                  v-model="form.quantite"
                  type="number"
                  required
                  class="form-control"
                  :class="{'is-invalid': !!erreurs.quantite}"
                />
                <div v-if="erreurs.quantite" class="invalid-feedback">
                  {{ erreurs.quantite }}
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Couverture (URL)</label>
                <input
                  v-model="form.couverture"
                  type="url"
                  class="form-control"
                  :class="{'is-invalid': !!erreurs.couverture}"
                />
                <div v-if="erreurs.couverture" class="invalid-feedback">
                  {{ erreurs.couverture }}
                </div>
              </div>
              <div v-if="form.couverture" class="mb-3">
                <div class="text-center">
                  <img
                    :src="form.couverture"
                    alt="Aperçu de la couverture"
                    class="img-fluid rounded"
                    style="max-height: 220px; object-fit: cover;"
                    onerror="this.style.display='none'"
                  />
                </div>
              </div>
              <button type="submit" class="btn btn-primary w-100">
                Ajouter
              </button>
            </form>
            <div v-if="erreur" class="alert alert-danger mt-3" role="alert">
              {{ erreur }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBooksStore } from '../stores/books.js'

const router = useRouter()
const booksStore = useBooksStore()

const form = ref({
  titre: '',
  auteurs: '',
  isbn: '',
  categories: '',
  prix: 0,
  quantite: 0,
  couverture: '',
})
const erreurs = ref({})
const erreur = ref('')

function validerForm(){
  if(form.value.titre.length === 0){
    erreurs.value.titre = "Veuiller entrer un titre valide"
  }
  if(form.value.isbn.length === 0){
    erreurs.value.titre = "Veuiller entrer un isbn valide pour le livre"
  }
  if(form.value.quantite <= 0){
    erreurs.value.titre = "Veuiller entrer une quantité valide"
  }
}
const ajouterLivre = async () => {
  validerForm()
  if(erreurs.value)
  {
    const bookData = {
    ...form.value,
    auteurs: form.value.auteurs.split(',').map((id) => id.trim()),
    categories: form.value.categories.split(',').map((id) => id.trim()),
  }
  erreurs.value = {}
  const resultat = await booksStore.ajouterLivre(bookData)
  if (resultat.success) {
      router.push({ path: '/', query: { message: 'Livre ajouté avec succès !',messageType:'alert alert-success' } })

  } else {
    erreur.value = resultat.error.message || "Erreur d'ajout"
    if (resultat.error.errors) {
      erreurs.value = resultat.error.errors
    }
  }
  }

}
</script>

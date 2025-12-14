<template>
  <div class="max-w-md mx-auto p-4">
    <h2 class="text-2xl mb-4">Profil Utilisateur</h2>
    <div class="container">
      <div v-show="message" :class="messageType" class="mb-4 p-2 rounded">
        {{ message }}

      </div>
      <div class="row">
        <div class="blocProfil col-md-5">
          <div v-if="profile" class="space-y-4">
            <img
              v-if="profile.avatar"
              :src="profile.avatar"
              alt="Avatar"
              class="rounded-circle w-25 d-flex justify-content-center"
            />
            <form @submit.prevent="handleUpdate" class="d-flex justify-content-center align-content-center mt-4">
              <div class="row mb-3 g-2">
                <div class="mb-2 row">
                  <label class="col-sm-2 col-form-label">Prénom</label>
                  <div class="col-sm-10">
                    <input v-model="updates.first_name" class="form-control" />
                  </div>
                </div>
                <div class="mb-2 row">
                  <label class="col-sm-2 col-form-label">Nom</label>
                  <div class="col-sm-10">
                    <input v-model="updates.last_name" class="form-control" />
                  </div>
                </div>
                <div class="mb-2 row">
                  <label class="col-sm-2 col-form-label">Mail</label>
                  <div class="col-sm-10">
                    <input v-model="updates.email" type="email" class="form-control" />
                  </div>
                </div>
                <button type="submit" class="btn btn-light w-25 rounded">
                  Mettre à jour
                </button>
              </div>
            </form>
            <button @click="confirmDelete = true" class="btn btn-danger text-white rounded">
              Supprimer mon compte
            </button>
            <div v-if="confirmDelete" class="bg-yellow-100 p-4 rounded">
              <p>Êtes-vous sûr ?</p>
              <button @click="handleDelete" class="btn btn-secondary rounded">
                Oui
              </button>
              <button @click="confirmDelete = false" class="bg-gray-500 text-white px-2 py-1">
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-if="error" class="text-red-500">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'
import { useAuthStore } from '../stores/auth.js'

const router = useRouter()
const userStore = useUserStore()

const profile = ref(null)
const updates = ref({ first_name: '', last_name: '', email: '' })
const confirmDelete = ref(false)
const error = ref('')
const message = ref('')
const messageType = ref('')

onMounted(async () => {
  await userStore.obtenirProfil()
  profile.value = userStore.profile
  if (profile.value) {
    updates.value = {
      first_name: profile.value.first_name,
      last_name: profile.value.last_name,
      email: profile.value.email,
    }
  }
})

const handleUpdate = async () => {
  const result = await userStore.updateProfile(updates.value)
  if (result.success) {
    profile.value = { ...profile.value, ...updates.value }
    message.value = 'Profil mis à jour avec succès.'
    messageType.value = 'alert alert-success'
  } else {
    error.value = result.error.message || 'Erreur de mise à jour'
    messageType.value = 'alert alert-danger'
    message.value = error.value
  }
}

const handleDelete = async () => {
  await userStore.deleteProfile()
  confirmDelete.value = false
  router.push('/')
}
</script>

<style scoped>
.blocProfil {
  background-color: #f5f3f1;
  padding: 18px;
  border-radius: 8px;
  margin: 0 auto;
  max-width: 500px;
}
</style>

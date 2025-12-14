<template>
  <div class="form-container">
    <div class="form-card">
      <h1>Connexion</h1>
      <form @submit.prevent="envoiDonneesLogin">
        <div>
          <label>Email</label>
          <input v-model="email" type="email" required />
          <p v-if="errors.email">{{ errors.email }}</p>
        </div>
        <div>
          <label>Mot de passe</label>
          <input v-model="password" type="password" required />
          <p v-if="errors.password">{{ errors.password }}</p>
        </div>
        <button type="submit">Se connecter</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const errors = ref({})
const error = ref('')

const envoiDonneesLogin = async () => {
  errors.value = {}
  const result = await authStore.login(email.value, password.value)
  if (result.success) {
    router.push('/')
  } else {
    error.value = result.error.message || 'Erreur de connexion'
    // Map validation errors
    if (result.error.errors) {
      errors.value = result.error.errors
    }
  }
}
</script>

<style>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* plein écran */
  background: #f5f7fa;
}

.form-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}

.form-card h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-card input {
  width: 100%;
  padding: 0.6rem;
  margin-top: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.form-card button {
  margin-top: 1rem;
  width: 100%;
  padding: 0.7rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.form-card button:hover {
  background: #0056b3;
}

.form-card p {
  color: red;
  font-size: 0.85rem;
}
</style>

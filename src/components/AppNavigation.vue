<template>
  <nav class="p-4 text-white d-flex justify-content-between align-items-center">
    <div class="mx-2 d-flex align-content-center">
      <router-link to="/" class="logo">Ma Librairie</router-link>
      <div class="flex mx-4" id="liens">
        <router-link class="mx-2" active-class="estActive" to="/"
          ><i class="bi bi-house-door"></i> Accueil</router-link
        >
        <router-link class="mx-2" active-class="estActive" to="/panier"
          ><i class="bi bi-cart"></i> Panier</router-link
        >
        <router-link class="mx-2" active-class="estActive" to="/profil"
          ><i class="bi bi-person"></i> Profil</router-link
        >
      </div>
    </div>
    <div v-if="isAuthenticated" class="d-flex align-content-center space-x-2">
      <img :src="user?.avatar" alt="Avatar" class="w-8 h-8 rounded-full" />
      <span>{{ user.username }}</span>
      <button @click="logout" class="btn btn-danger mx-3">Déconnexion</button>
    </div>
    <div v-else class="d-flex justify-content-between" id="connexion">
      <router-link class="mx-2" active-class="estActive" to="/login">Connexion</router-link>
      <router-link to="/signup" active-class="estActive">Inscription</router-link>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth.js'
import { useUserStore } from '../stores/user.js'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const isAuthenticated = computed(() => authStore.isAuthenticated)

const userStore = useUserStore()
const user = computed(() => userStore.obtenirProfil)

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
nav {
  background-color: #c57858;
  font-size: 1.2rem;
}

a {
  color: white;
  text-decoration: none;
}
.logo {
  font-weight: bold;
  font-size: 1.4rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin-right: 1.8rem;
}

a:hover, .estActive{
  border-bottom: 3px solid white;
}
</style>

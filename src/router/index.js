import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import HomeView from '../views/HomeView.vue'
import ConnexionView from '../views/ConnexionView.vue'
import InscriptionView from '../views/InscriptionView.vue'
import CartView from '../views/CartView.vue'
import ProfileView from '../views/ProfilView.vue'
import BookCreateView from '../views/BookCreateView.vue'
import NotFoundView from '../views/NotFoundView.vue'
// import { Connect } from 'vite'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: ConnexionView },
    { path: '/signup', name: 'signup', component: InscriptionView },
    { path: '/panier', name: 'cart', component: CartView, meta: { requiresAuth: true, requiresAdmin: true } },
    { path: '/profil', name: 'profile', component: ProfileView, meta: { requiresAuth: true, requiresAdmin: true } },
    { path: '/livres/nouveau', name: 'bookCreate', component: BookCreateView, meta: { requiresAuth: true, requiresAdmin: true } },
    { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFoundView }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next('/')
  } else {
    next()
  }
})

export default router

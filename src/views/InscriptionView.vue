
<template>
  <div class="d-flex justify-content-center align-items-center pb-4 row">
    <div class="card shadow-lg p-4 mt-4 col-md-7 col-lg-5">
      <h1 class="h4 text-center mb-4">Inscription</h1>

      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title fs-5" id="exampleModalLabel">Inscription</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body bg-success text-white text-center">
              Inscription réussie
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Formulaire -->
      <form @submit.prevent="envoiDonnees" novalidate>
        <div class="mb-3" :class="{ 'is-invalid': first_nameValide }">
          <label for="first_name" class="form-label">Prénom</label>
          <input
            type="text"
            class="form-control"
            id="first_name"
            v-model.trim="first_name"
            @blur="validerForm"
          />
          <div v-if="first_nameValide" class="invalid-feedback">
            Veuillez saisir un prénom valide
          </div>
        </div>

        <div class="mb-3" :class="{ 'is-invalid': last_nameValide }">
          <label for="last_name" class="form-label">Nom</label>
          <input
            type="text"
            class="form-control"
            id="last_name"
            v-model.trim="last_name"
            @blur="validerForm"
          />
          <div v-if="last_nameValide" class="invalid-feedback">
            Veuillez saisir un nom valide
          </div>
        </div>

        <div class="mb-3" :class="{ 'is-invalid': userNameValide }">
          <label for="username" class="form-label">Nom d'utilisateur</label>
          <input
            type="text"
            class="form-control"
            id="username"
            v-model.trim="userName"
            @blur="validerForm"
          />
          <div v-if="userNameValide" class="invalid-feedback">
            Veuillez saisir un nom d'utilisateur
          </div>
        </div>

        <div class="mb-3" :class="{ 'is-invalid': emailValide }">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model.trim="email"
            @blur="validerForm"
          />
          <div v-if="emailValide" class="invalid-feedback">
            Veuillez saisir une adresse email valide
          </div>
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Mot de passe</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model.trim="password"
            @blur="validerForm"
          />
        </div>

        <div class="mb-3" :class="{ 'is-invalid': confirmPasswordValide }">
          <label for="confirmPassword" class="form-label">Confirmer le mot de passe</label>
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            v-model.trim="confirmPassword"
            @blur="validerForm"
          />
          <div v-if="confirmPasswordValide" class="invalid-feedback">
            {{ msgErrMdp }}
          </div>
        </div>

        <button type="submit" class="btn btn-primary w-100">S'inscrire</button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import { bootstrap } from 'bootstrap'

const router = useRouter()


const first_name = ref('')
const last_name = ref('')
const userName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
const msgErrMdp = ref('')
const apiUrl = import.meta.env.VITE_API_URL

const first_nameValide = ref(false)
const last_nameValide = ref(false)
const userNameValide = ref(false)
const emailValide = ref(false)
const passwordValide = ref(false)
const confirmPasswordValide = ref(false)
const formIsValid = ref(false)

const validerForm = () => {
  formIsValid.value = true
  first_nameValide.value = false
  last_nameValide.value = false
  userNameValide.value = false
  emailValide.value = false
  passwordValide.value = false
  confirmPasswordValide.value = false

  if (userName.value.length === 0) {
    userNameValide.value = true
    formIsValid.value = false
  }

  if (first_name.value.length === 0) {
    first_nameValide.value = true
    formIsValid.value = false
  }
  if (last_name.value.length === 0) {
    last_nameValide.value = true
    formIsValid.value = false
  }
  if (!regexEmail.test(email.value) || email.value.length === 0) {
    emailValide.value = true
    formIsValid.value = false
  }
  if (password.value !== confirmPassword.value || password.value.length === 0) {
    confirmPasswordValide.value = true
    formIsValid.value = false
    msgErrMdp.value = 'Les mots de passe ne correspondent pas'
  }
  if (password.value.length < 6) {
    passwordValide.value = true
    formIsValid.value = false
    msgErrMdp.value = 'Le mot de passe doit contenir au moins 6 caractères'
  }
}

const envoiDonnees = async () => {
  validerForm()
  if (!formIsValid.value) {
    console.log('Formulaire invalide')
    return
  }
  try {
    const response = await fetch(`${apiUrl}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: first_name.value,
        last_name: last_name.value,
        username: userName.value,
        email: email.value,
        password: password.value,
      }),
    })
    if (!response.ok) {
      throw new Error("Erreur lors de l'inscription de l'utilisateur")
    }
    first_name.value = ''
    last_name.value = ''
    userName.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    const data = await response.json()
    console.log(data)
    // Afficher la modale de succès
    const modalElement = document.getElementById('exampleModal')
    // const modal = new bootstrap.Modal(modalElement)
    // modal.show()

    //rediriger vers la page de connexion après un délai
    setTimeout(() => {
      router.push('/login')
    }, 2000)

  } catch (error) {
    console.error('Erreur:', error)
  }
}
</script>


<style>
.card {
  border-radius: 10px;
}

h1 {
  font-weight: bold;
  color: #333;
}

form-control.is-invalid {
  border-color: red;
}

.invalid-feedback {
  display: block; /* toujours visible quand v-if est vrai */
  color: red;
  font-size: 0.85rem;
}

</style>

<!-- <style scoped>
#app form div {
  margin: 1rem 0;
}

.form-control.invalid input,
.form-control.invalid select {
  border-color: red;
}

.form-control.invalid p {
  color: red;
}

.error-message {
  color: red;
  font-size: 0.9rem;
}

.form-control label {
  margin-right: 1rem;
  width: 7rem;
  display: inline-block;
}

input,
select {
  font: inherit;
  margin-top: 0.5rem;
  padding: 0.4rem;
}
</style> -->

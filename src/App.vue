<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import AppNavigationVue from './components/AppNavigation.vue'
</script>

<template>
  <AppNavigationVue />
  <main>
    <section>
      <RouterView />
    </section>
  </main>
  <footer>
    <p>Réalisé par : Ozias Tasse Douanla </p>
    <p>TP3 A25</p>
  </footer>

</template>

<style scoped>
/* main{
  background: #f5f7fa;
} */

body{
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 19px;
}
footer{
  background-color: #271d25;
  padding: 1rem;
  color: white;
}
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

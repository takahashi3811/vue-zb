<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="layout">
    <header class="layout__header">
      <RouterLink to="/" class="brand">Vue Sample</RouterLink>
      <nav class="nav">
        <RouterLink class="nav__link" to="/">Home</RouterLink>
        <RouterLink class="nav__link" to="/regist-user">Register</RouterLink>
      </nav>
    </header>

    <main class="layout__main">
      <div class="layout__container">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
}

.layout__header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e4e7ec;
  background-color: #fff;
}

.brand {
  font-weight: 700;
  font-size: 1.1rem;
  color: #111827;
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 1rem;
}

.nav__link {
  text-decoration: none;
  color: #475467;
  font-weight: 500;
}

.nav__link.router-link-active {
  color: #2563eb;
}

.layout__main {
  flex: 1;
  width: 100%;
  background-color: #f8fafc;
  display: flex;
  justify-content: center;
}

.layout__container {
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: 2.5rem 1.5rem 3.5rem;
}
</style>

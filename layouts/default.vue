<template>
  <div class="app-wrapper">
    <nav class="main-nav">
      <div class="nav-container">
        <h1 class="nav-title">🛒 Список покупок</h1>
        <ul class="nav-links">
          <li>
            <NuxtLink to="/" class="nav-link">Главная</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/history" class="nav-link">История</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about" class="nav-link">О приложении</NuxtLink>
          </li>
        </ul>
      </div>
    </nav>

    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.app-wrapper {
  min-height: 100vh;
}

.main-nav {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.nav-title {
  color: #2c3e50;
  font-size: 1.4em;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.nav-link {
  text-decoration: none;
  color: #2c3e50;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s;
}

.nav-link:hover {
  background: #ecf0f1;
}

.nav-link.router-link-active {
  background: #3498db;
  color: white;
}

.main-content {
  max-width: 900px;
  margin: 30px auto;
  padding: 0 20px;
}
</style>
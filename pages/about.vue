<template>
  <div class="about-page">
    <div class="about-header">
      <h1>ℹ️ О приложении</h1>
      <p>Узнайте больше о нашем приложении "Список покупок"</p>
    </div>

    <div class="about-content">
      <div class="feature-card">
        <h2>✨ Возможности</h2>
        <ul>
          <li>Создание и управление списком покупок</li>
          <li>Сортировка товаров по различным критериям</li>
          <li>Поиск товаров по названию</li>
          <li>Отслеживание прогресса покупок</li>
          <li>Редактирование товаров прямо в списке</li>
          <li>Просмотр истории и архива</li>
        </ul>
      </div>

      <div class="tech-card">
        <h2>🛠️ Технологии</h2>
        <div class="tech-list">
          <span class="tech-badge">Nuxt 3</span>
          <span class="tech-badge">Vue.js 3</span>
          <span class="tech-badge">Pinia</span>
          <span class="tech-badge">Composition API</span>
          <span class="tech-badge">SSR</span>
          <span class="tech-badge">CSS3</span>
        </div>
      </div>

      <div class="instructions-card">
        <h2>📖 Как использовать</h2>
        <ol>
          <li>Добавьте товары через форму на главной странице</li>
          <li>Используйте поле поиска для быстрого нахождения товара</li>
          <li>Сортируйте список для удобного просмотра</li>
          <li>Отмечайте купленные товары галочкой</li>
          <li>Следите за статистикой внизу страницы</li>
        </ol>
      </div>

      <div class="info-card">
        <h2>🎓 Что такое Nuxt?</h2>
        <p>
          <strong>Nuxt</strong> — это фреймворк высокого уровня, созданный на основе Vue.js.
          Он предоставляет серверный рендеринг (SSR), автоматическую маршрутизацию через
          файловую систему, автоимпорты компонентов и множество других удобств для
          разработки современных веб-приложений.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Страница "О приложении" не требует логики
</script>

<style scoped>
.about-page {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.about-header {
  text-align: center;
  margin-bottom: 30px;
}

.about-header h1 {
  color: #2c3e50;
  font-size: 2em;
  margin-bottom: 10px;
}

.about-header p {
  color: #7f8c8d;
  font-size: 1.1em;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.feature-card,
.tech-card,
.instructions-card,
.info-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #3498db;
}

.feature-card h2,
.tech-card h2,
.instructions-card h2,
.info-card h2 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.3em;
}

.feature-card ul,
.instructions-card ol {
  padding-left: 20px;
  color: #34495e;
  line-height: 1.8;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tech-badge {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  transition: transform 0.2s;
}

.tech-badge:hover {
  transform: scale(1.05);
}

.info-card p {
  color: #34495e;
  line-height: 1.7;
}
</style>
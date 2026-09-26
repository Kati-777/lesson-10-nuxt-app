<template>
  <div class="history-page">
    <div class="page-header">
      <h1>📜 История покупок</h1>
      <p>Просмотр ваших выполненных покупок</p>
    </div>

    <div class="history-stats">
      <div class="stat-card">
        <h3>Всего выполнено</h3>
        <span class="stat-number">{{ shoppingList.completedList.length }}</span>
      </div>
      <div class="stat-card">
        <h3>Выполнено сегодня</h3>
        <span class="stat-number">{{ todayCompleted }}</span>
      </div>
      <div class="stat-card">
        <h3>Всего товаров</h3>
        <span class="stat-number">{{ shoppingList.totalQuantity }}</span>
      </div>
    </div>

    <div v-if="shoppingList.completedList.length === 0" class="empty-state">
      <p>У вас еще нет выполненных покупок</p>
      <p>Отмечайте товары как выполненные на главной странице!</p>
    </div>

    <ul v-else class="history-list">
      <li v-for="item in shoppingList.completedList" :key="item.id" class="history-item">
        <div class="item-info">
          <span class="item-name">{{ item.name }}</span>
          <span class="item-quantity">× {{ item.quantity }}</span>
          <span class="completion-date">{{ formatDate(item.createdAt) }}</span>
        </div>
        <button @click="shoppingList.toggleItem(item.id)" class="restore-btn">
          ↩️ Вернуть в список
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useShoppingListStore } from '~/stores/shoppingList'

const shoppingList = useShoppingListStore()

const todayCompleted = computed(() => {
  const today = new Date().toDateString()
  return shoppingList.completedList.filter(item =>
    new Date(item.createdAt).toDateString() === today
  ).length
})

function formatDate(date) {
  return new Date(date).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.history-page {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.page-header {
  text-align: center;
  margin-bottom: 25px;
}

.page-header h1 {
  color: #2c3e50;
  font-size: 2em;
  margin-bottom: 8px;
}

.page-header p {
  color: #7f8c8d;
}

.history-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
}

.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
}

.stat-card h3 {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 8px;
}

.stat-number {
  font-size: 1.8em;
  font-weight: bold;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  background: #f8f9fa;
  border-radius: 12px;
  color: #7f8c8d;
}

.empty-state p:first-child {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.history-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #e8f8f5;
  padding: 15px 20px;
  border-radius: 12px;
  margin-bottom: 10px;
  border-left: 4px solid #27ae60;
  transition: all 0.2s;
}

.history-item:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.item-info {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}

.item-name {
  font-size: 16px;
  font-weight: 500;
  color: #2c3e50;
}

.item-quantity {
  color: #7f8c8d;
  font-size: 14px;
}

.completion-date {
  color: #27ae60;
  font-size: 13px;
  font-style: italic;
}

.restore-btn {
  padding: 8px 16px;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}

.restore-btn:hover {
  background: #229954;
  transform: scale(1.05);
}
</style>
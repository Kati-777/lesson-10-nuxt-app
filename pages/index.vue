<template>
  <div class="shopping-list-app">
    <div class="page-header">
      <h1>🛒 Мой список покупок</h1>
      <p>Полноценное full-stack приложение на Nuxt 3</p>
    </div>

    <!-- Панель фильтров -->
    <div class="filters-panel">
      <div class="filter-group">
        <input
          v-model="filters.search"
          @input="loadItems"
          placeholder="Поиск товаров..."
          class="filter-input"
        />
        <select v-model="filters.category" @change="loadItems" class="filter-select">
          <option value="">Все категории</option>
          <option value="Молочные">Молочные</option>
          <option value="Хлебобулочные">Хлебобулочные</option>
          <option value="Фрукты">Фрукты</option>
          <option value="Овощи">Овощи</option>
        </select>
        <select v-model="filters.completed" @change="loadItems" class="filter-select">
          <option value="">Все статусы</option>
          <option value="false">Не выполнено</option>
          <option value="true">Выполнено</option>
        </select>
      </div>
      <div class="stats-refresh">
        <button @click="loadStats" class="refresh-btn" :disabled="loadingStats">
          {{ loadingStats ? 'Обновление...' : 'Обновить статистику' }}
        </button>
      </div>
    </div>

    <!-- Форма добавления товара -->
    <div class="add-item-card">
      <h3>Добавить новый товар</h3>
      <div class="add-item-form">
        <input
          v-model="newItem.name"
          placeholder="Название товара"
          class="form-input"
          :disabled="addingItem"
        />
        <input
          v-model.number="newItem.quantity"
          type="number"
          min="1"
          placeholder="Количество"
          class="form-input"
          :disabled="addingItem"
        />
        <select v-model="newItem.category" class="form-select" :disabled="addingItem">
          <option value="">Выберите категорию</option>
          <option value="Молочные">Молочные</option>
          <option value="Хлебобулочные">Хлебобулочные</option>
          <option value="Фрукты">Фрукты</option>
          <option value="Овощи">Овощи</option>
          <option value="Бакалея">Бакалея</option>
        </select>
        <button @click="addItem" class="add-btn" :disabled="addingItem">
          {{ addingItem ? 'Добавление...' : 'Добавить' }}
        </button>
      </div>
      <!-- Сообщения об ошибках/успехе -->
      <div v-if="message" class="message" :class="message.type">
        {{ message.text }}
      </div>
    </div>

    <!-- Основной контент с загрузкой -->
    <div class="content-area">
      <!-- Загрузка -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Загружаем список покупок...</p>
      </div>

      <!-- Ошибка -->
      <div v-else-if="error" class="error-state">
        <p>Ошибка: {{ error }}</p>
        <button @click="loadItems" class="retry-btn">Повторить попытку</button>
      </div>

      <!-- Пустой список -->
      <div v-else-if="!items || !items.length" class="empty-state">
        <p>📭 Ваш список покупок пуст</p>
        <p>Добавьте первый товар!</p>
      </div>

      <!-- Список товаров -->
      <div v-else class="items-section">
        <div class="section-header">
          <h2>Список товаров ({{ items.length }})</h2>
          <div class="section-actions">
            <button @click="loadItems" class="action-btn" :disabled="loading">
              {{ loading ? '...' : 'Обновить' }}
            </button>
          </div>
        </div>
        <div class="items-grid">
          <ProductCard
            v-for="item in items"
            :key="item.id"
            :product="item"
            @delete="deleteItem(item.id)"
            @toggle="toggleItem(item)"
            @edit="editItem(item)"
          />
        </div>
      </div>
    </div>

    <!-- Панель статистики -->
    <div class="stats-panel" v-if="stats">
      <div class="stats-header">
        <h3>📊 Статистика</h3>
        <span class="timestamp">Обновлено: {{ formatTime(stats.timestamp) }}</span>
      </div>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">{{ stats.data.totalItems }}</div>
          <div class="stat-label">Всего товаров</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ stats.data.totalQuantity }}</div>
          <div class="stat-label">Общее количество</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ stats.data.completedItems }}</div>
          <div class="stat-label">Выполнено</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ stats.data.remainingItems }}</div>
          <div class="stat-label">Осталось</div>
        </div>
      </div>
      <div class="stats-details">
        <h4>По категориям:</h4>
        <div class="categories-list">
          <span
            v-for="(count, category) in stats.data.categories"
            :key="category"
            class="category-tag"
          >
            {{ category }}: {{ count }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// ВАЖНО: Сначала объявляем все реактивные переменные
const filters = reactive({
  search: '',
  category: '',
  completed: ''
})

const newItem = reactive({
  name: '',
  quantity: 1,
  category: ''
})

const message = ref(null)
const addingItem = ref(false)
const loadingStats = ref(false)

// Теперь используем их в useFetch (filters уже существует)
const { data: items, refresh: refreshItems, pending: loading, error } = await useFetch('/api/items', {
  lazy: true,
  server: true,
  pick: ['data'],
  query: computed(() => ({
    search: filters.search,
    category: filters.category,
    completed: filters.completed
  }))
})

const { data: stats, refresh: refreshStats } = await useFetch('/api/stats', {
  lazy: true,
  server: true
})

const isDevelopment = process.dev

// Функции
const showMessage = (text, type = 'success') => {
  message.value = { text, type }
  setTimeout(() => { message.value = null }, 3000)
}

const loadItems = async () => {
  await refreshItems()
  if (!error.value) showMessage('Список обновлен', 'success')
}

const loadStats = async () => {
  loadingStats.value = true
  await refreshStats()
  loadingStats.value = false
  showMessage('Статистика обновлена', 'info')
}

const addItem = async () => {
  if (!newItem.name.trim()) {
    showMessage('Введите название товара', 'error')
    return
  }
  addingItem.value = true
  try {
    const { data: result } = await useFetch('/api/items', {
      method: 'POST',
      body: newItem
    })
    if (result.value?.status === 'success') {
      showMessage('Товар успешно добавлен!', 'success')
      newItem.name = ''
      newItem.quantity = 1
      newItem.category = ''
      await Promise.all([refreshItems(), refreshStats()])
    }
  } catch (err) {
    showMessage('Ошибка при добавлении товара', 'error')
  } finally {
    addingItem.value = false
  }
}

const deleteItem = async (id) => {
  if (!confirm('Удалить этот товар?')) return
  try {
    await $fetch(`/api/items/${id}`, { method: 'DELETE' })
    showMessage('Товар удален', 'success')
    await Promise.all([refreshItems(), refreshStats()])
  } catch (err) {
    showMessage('Ошибка при удалении товара', 'error')
  }
}

const toggleItem = async (item) => {
  try {
    await $fetch(`/api/items/${item.id}`, {
      method: 'PUT',
      body: { ...item, completed: !item.completed }
    })
    showMessage(`Товар ${!item.completed ? 'выполнен' : 'возвращен в список'}`, 'info')
    await Promise.all([refreshItems(), refreshStats()])
  } catch (err) {
    showMessage('Ошибка при обновлении товара', 'error')
  }
}

const editItem = async (item) => {
  const newName = prompt('Введите новое название:', item.name)
  if (!newName || newName === item.name) return
  try {
    await $fetch(`/api/items/${item.id}`, {
      method: 'PUT',
      body: { ...item, name: newName }
    })
    showMessage('Название обновлено', 'success')
    await refreshItems()
  } catch (err) {
    showMessage('Ошибка при редактировании товара', 'error')
  }
}

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}
</script>

<style scoped>
.shopping-list-app {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  color: #2c3e50;
  font-size: 2em;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #7f8c8d;
}

.filters-panel {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  flex-grow: 1;
}

.filter-input,
.filter-select,
.form-input,
.form-select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.filter-input:focus,
.filter-select:focus,
.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #3498db;
}

.add-item-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.add-item-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.add-item-form {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.form-input {
  flex-grow: 1;
  min-width: 150px;
}

.add-btn,
.refresh-btn,
.retry-btn,
.action-btn {
  padding: 0.5rem 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s;
}

.add-btn:hover,
.refresh-btn:hover,
.retry-btn:hover,
.action-btn:hover {
  background: #2980b9;
}

.add-btn:disabled,
.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.message {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: 500;
}

.message.success {
  background: #d4edda;
  color: #155724;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
}

.message.info {
  background: #d1ecf1;
  color: #0c5460;
}

.content-area {
  margin-bottom: 2rem;
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  color: #7f8c8d;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.items-section h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.items-grid {
  display: grid;
  gap: 1rem;
}

.stats-panel {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f1f3f5;
  border-radius: 8px;
}

.stats-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.stats-header h3 {
  color: #2c3e50;
}

.timestamp {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.stat-card {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
}

.stat-label {
  font-size: 0.85rem;
  color: #7f8c8d;
  margin-top: 0.25rem;
}

.stats-details h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.categories-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-tag {
  display: inline-block;
  background: #e9ecef;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #495057;
}
</style>
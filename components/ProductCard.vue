<template>
  <div class="product-card" :class="{ 'completed': product.completed }">
    <div class="card-content">
      <div class="product-main">
        <div class="product-info">
          <h4 class="product-name" :class="{ 'completed': product.completed }">
            {{ product.name }}
          </h4>
          <div class="product-meta">
            <span class="product-quantity">Количество: {{ product.quantity }}</span>
            <span class="product-category" v-if="product.category"> • {{ product.category }}</span>
          </div>
          <div class="product-status">
            <span class="status-badge" :class="product.completed ? 'completed' : 'pending'">
              {{ product.completed ? 'Выполнено' : 'В процессе' }}
            </span>
            <span class="product-date" v-if="product.createdAt">
              Добавлен: {{ formatDate(product.createdAt) }}
            </span>
          </div>
        </div>
        <div class="product-actions">
          <button @click="$emit('toggle', product)" class="action-btn toggle-btn" :class="{ 'completed': product.completed }" :title="product.completed ? 'Вернуть в список' : 'Отметить как выполненное'">
            {{ product.completed ? 'Назад' : 'Готово' }}
          </button>
          <button @click="$emit('edit', product)" class="action-btn edit-btn" title="Редактировать">
            Редактировать
          </button>
          <button @click="$emit('delete', product.id)" class="action-btn delete-btn" title="Удалить">
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: { type: Object, required: true }
})

defineEmits(['toggle', 'edit', 'delete'])

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}
</script>

<style scoped>
.product-card { background: white; border: 1px solid #e9ecef; border-radius: 8px; padding: 1rem; transition: all 0.2s; border-left: 4px solid #3498db; }
.product-card.completed { border-left-color: #27ae60; opacity: 0.8; }
.product-card.completed .product-name { text-decoration: line-through; color: #95a5a6; }
.product-main { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }
.product-info { flex: 1; }
.product-name { margin: 0 0 0.5rem 0; font-size: 1.1rem; color: #2c3e50; }
.product-meta { font-size: 0.9rem; color: #7f8c8d; margin-bottom: 0.5rem; }
.product-status { display: flex; align-items: center; gap: 1rem; font-size: 0.85rem; }
.status-badge { padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.75rem; font-weight: bold; }
.status-badge.pending { background: #fff3cd; color: #856404; }
.status-badge.completed { background: #d4edda; color: #155724; }
.product-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.action-btn { padding: 0.4rem 0.8rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.85rem; font-weight: 500; transition: 0.2s; }
.toggle-btn { background: #3498db; color: white; }
.toggle-btn.completed { background: #95a5a6; }
.edit-btn { background: #f39c12; color: white; }
.delete-btn { background: #e74c3c; color: white; }
.action-btn:hover { opacity: 0.9; transform: translateY(-1px); }
</style>
<template>
  <div class="cart-summary">
    <div class="summary-item">
      <span class="summary-label">📦 Всего товаров:</span>
      <span class="summary-value">{{ totalItems }}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">🔢 Общее количество:</span>
      <span class="summary-value">{{ totalQuantity }} шт.</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">✅ Куплено:</span>
      <span class="summary-value completed">{{ completedItems }}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">⏳ Осталось:</span>
      <span class="summary-value remaining">{{ remainingItems }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps(['totalItems', 'totalQuantity', 'completedItems', 'remainingItems'])
</script>

<style scoped>
.cart-summary {
  margin-top: 25px;
  padding: 20px;
  background: #34495e;
  border-radius: 12px;
  color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.summary-label {
  font-size: 14px;
  opacity: 0.9;
}

.summary-value {
  font-weight: bold;
  font-size: 16px;
}

.summary-value.completed {
  color: #2ecc71;
}

.summary-value.remaining {
  color: #f39c12;
}
</style>
<template>
  <div class="shopping-list-app">
    <div class="page-header">
      <h1> Мой список покупок</h1>
      <p>Управляйте вашими покупками на Nuxt!</p>
    </div>

    <!-- Форма добавления товара -->
    <div class="add-item-section">
      <input
        v-model="shoppingList.newItem.name"
        @keyup.enter="shoppingList.addItem"
        placeholder="Что купить?"
        class="item-input"
      />
      <input
        v-model.number="shoppingList.newItem.quantity"
        type="number"
        min="1"
        placeholder="Кол-во"
        class="quantity-input"
      />
      <button @click="shoppingList.addItem" class="add-button">➕ Добавить</button>
    </div>

    <!-- Список товаров -->
    <div class="products-section">
      <h2>Текущие товары ({{ shoppingList.totalItems }})</h2>

      <div v-if="shoppingList.items.length === 0" class="empty-state">
        <p>📭 Ваш список покупок пуст</p>
        <p>Добавьте первый товар!</p>
      </div>

      <ul v-else class="products-list">
        <ProductCard
          v-for="item in shoppingList.sortedItems"
          :key="item.id"
          :product="item"
          @increase="shoppingList.increaseQuantity(item.id)"
          @decrease="shoppingList.decreaseQuantity(item.id)"
          @toggle="shoppingList.toggleItem(item.id)"
          @remove="shoppingList.removeItem(item.id)"
          @edit="shoppingList.updateItemName(item.id, $event)"
        />
      </ul>
    </div>

    <!-- Статистика -->
    <CartSummary
      :total-items="shoppingList.totalItems"
      :total-quantity="shoppingList.totalQuantity"
      :completed-items="shoppingList.completedItems"
      :remaining-items="shoppingList.remainingItems"
    />
  </div>
</template>

<script setup>
import { useShoppingListStore } from '~/stores/shoppingList'

const shoppingList = useShoppingListStore()
</script>

<style scoped>
.shopping-list-app {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
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

.add-item-section {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.item-input {
  flex-grow: 1;
  min-width: 200px;
  padding: 12px 15px;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 15px;
}

.quantity-input {
  width: 100px;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 15px;
  text-align: center;
}

.add-button {
  padding: 12px 20px;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
}

.add-button:hover {
  background: #229954;
}

.products-section h2 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.3em;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  background: #f8f9fa;
  border-radius: 12px;
  color: #7f8c8d;
}

.products-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
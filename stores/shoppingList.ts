import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface Product {
  id: number
  name: string
  quantity: number
  completed: boolean
  createdAt: Date
}

export const useShoppingListStore = defineStore('shoppingList', () => {
  // State
  const items = ref<Product[]>([
    { id: 1, name: 'Молоко', quantity: 1, completed: false, createdAt: new Date() },
    { id: 2, name: 'Хлеб', quantity: 2, completed: false, createdAt: new Date() },
    { id: 3, name: 'Яйца', quantity: 10, completed: false, createdAt: new Date() },
    { id: 4, name: 'Сыр', quantity: 1, completed: false, createdAt: new Date() }
  ])

  const newItem = ref({ name: '', quantity: 1 })
  const sortOption = ref('name')

  // Getters
  const totalItems = computed(() => items.value.length)
  const totalQuantity = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )
  const completedItems = computed(() =>
    items.value.filter(item => item.completed).length
  )
  const remainingItems = computed(() => totalItems.value - completedItems.value)

  const sortedItems = computed(() => {
    return [...items.value].sort((a, b) => {
      if (sortOption.value === 'name') {
        return a.name.localeCompare(b.name, 'ru')
      } else if (sortOption.value === 'quantity') {
        return a.quantity - b.quantity
      } else if (sortOption.value === 'completed') {
        return a.completed === b.completed ? 0 : a.completed ? 1 : -1
      }
      return 0
    })
  })

  const completedList = computed(() =>
    items.value.filter(item => item.completed)
  )

  // Actions
  function addItem() {
    if (newItem.value.name.trim()) {
      items.value.push({
        id: Date.now(),
        name: newItem.value.name.trim(),
        quantity: newItem.value.quantity,
        completed: false,
        createdAt: new Date()
      })
      resetNewItem()
    }
  }

  function removeItem(id: number) {
    const index = items.value.findIndex(item => item.id === id)
    if (index !== -1) items.value.splice(index, 1)
  }

  function toggleItem(id: number) {
    const item = items.value.find(item => item.id === id)
    if (item) item.completed = !item.completed
  }

  function increaseQuantity(id: number) {
    const item = items.value.find(item => item.id === id)
    if (item) item.quantity++
  }

  function decreaseQuantity(id: number) {
    const item = items.value.find(item => item.id === id)
    if (item && item.quantity > 1) item.quantity--
  }

  function updateItemName(id: number, newName: string) {
    const item = items.value.find(item => item.id === id)
    if (item && newName.trim()) item.name = newName.trim()
  }

  function setSortOption(option: string) {
    sortOption.value = option
  }

  function resetNewItem() {
    newItem.value = { name: '', quantity: 1 }
  }

  function clearCompleted() {
    items.value = items.value.filter(item => !item.completed)
  }

  return {
    items, newItem, sortOption,
    totalItems, totalQuantity, completedItems, remainingItems,
    sortedItems, completedList,
    addItem, removeItem, toggleItem, increaseQuantity, decreaseQuantity,
    updateItemName, setSortOption, resetNewItem, clearCompleted
  }
})
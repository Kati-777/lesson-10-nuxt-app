<script setup>
// 1. СНАЧАЛА объявляем все реактивные переменные
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

// 2. ТЕПЕРЬ используем их в useFetch (filters уже существует)
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

// 3. Функции (могут быть после useFetch)
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
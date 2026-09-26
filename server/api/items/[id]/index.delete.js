export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    // Имитация удаления из БД
    return {
      status: 'success',
      message: 'Товар успешно удален',
      data: { id: Number(id) },
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при удалении товара'
    })
  }
})
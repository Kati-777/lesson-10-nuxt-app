export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    // Имитация обновления в БД
    return {
      status: 'success',
      message: 'Товар успешно обновлен',
      data: { id: Number(id), ...body },
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при обновлении товара'
    })
  }
})
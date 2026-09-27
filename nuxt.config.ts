export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  nitro: {
    preset: 'vercel'
  },
  app: {
    head: {
      title: 'Список покупок - Nuxt 3 Full-stack',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Приложение для управления списком покупок' },
        { name: 'keywords', content: 'Nuxt, Vue, Pinia, список покупок, full-stack' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  app: {
    // ⚠️ 替换成你的 GitHub 仓库名，例如 "/my-nuxt-ui-app/"
    baseURL: '/仓库名/'
  },
  nitro: {
    preset: 'static'
  },
  routeRules: {
    '/**': { static: true }
  }
})
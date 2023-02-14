export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxt/devtools'
  ],
  runtimeConfig: {
    apiKey: '',
    apiBaseUrl: '',
    public: {
      imgBaseUrl: '',
    }
  },
})

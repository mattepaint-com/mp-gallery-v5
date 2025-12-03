// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      title: 'MattePaint V5',
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/images/logos/logo-white-icon-only.svg',
        },
      ],
    },
  },
})
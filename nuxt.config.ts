// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    'nuxt-simple-sitemap',
    // '@nuxtjs/stylelint-module',
  ],

  // Global page headers: https://go.nuxtjs.dev/config-head
  app: {
    head: {
      title: 'Pride is Political — Independent platform for alternative Pride events in Copenhagen',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [{
          charset: 'utf-8'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          name: 'format-detection',
          content: 'telephone=no'
        }
      ],
      link: [{
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png'
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest'
        }
      ]
    },
  },

  site: {
    url: 'https://prideispolitical.dk',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main.scss',
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/variables.scss" as *;'
        },
      },
    },
  },

  styleResources: {
    scss: [
      '@/assets/scss/variables.scss'
    ]
  }
})
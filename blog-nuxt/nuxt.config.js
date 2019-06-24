import pkg from './package'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // { name: 'yandex-verification', content: 'nndn3s43sbhkf' },
      // { name: 'google-site-verification', content: 'hsjs4b-dsdg-454' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    { src: '~/assets/scss/main.scss', lang: 'scss' },
     // lib css
     'codemirror/lib/codemirror.css',
     // merge css
     'codemirror/addon/merge/merge.css',
     // theme css
     'codemirror/theme/base16-dark.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/app-components.js',
    { src: '~plugins/nuxt-codemirror-plugin.js', ssr: false }
    // { src: '~plugins/ace-vue.js',  ssr: false },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}

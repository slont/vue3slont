module.exports = {
  productionSourceMap: 'prod' !== process.env.VUE_APP_ENV,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/sass/common.sass"`
      }
    }
  },
  pwa: {
    name: 'My App',
    themeColor: '#ffffff',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    skipWaiting: true,
    clientsClaim: true,
    workboxOptions: {
      exclude: []
    }
  },
  crossorigin: 'use-credentials'
}

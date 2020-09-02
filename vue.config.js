module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: 'Freeing Returns',
    themeColor: '#0AA8ED',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest'

  }
}

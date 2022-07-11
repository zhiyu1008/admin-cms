 module.exports = {
   publicPath: './',
   devServer: {
     open: true,
     host: 'localhost',
     port: 8787,
     https: false,
     proxy: {
       [process.env.VUE_APP_BASE_API]: {
         target: process.env.VUE_APP_SERVICE_URL,
         changeOrigin: true,
         pathRewrite: {
           ['^' + process.env.VUE_APP_BASE_API]: ''
         }
       }
     }
   },
   css: {
     loaderOptions: {
       sass: {
         additionalData: '@import "@/styles/common.scss";'
       }
     }
   }
 }

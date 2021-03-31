module.exports = {
  lintOnSave: false,
  devServer: {
    port: 3333,
    open: true
    //proxy:{}
  },
  css:{
    loaderOptions:{
      sass:{
        prependData:`@import "@/assets/scss/_variable.scss";`
      }
    }
  }
}

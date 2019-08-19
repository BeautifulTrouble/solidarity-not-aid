module.exports = {
  chainWebpack: config => {
    config.module
      .rule('archieml')
      .test(/.+\.aml$/)
      .use('@newsdev/archieml-loader')
        .loader('@newsdev/archieml-loader')
        .end()
  }
}

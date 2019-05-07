module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('vue-svg-loader').loader('vue-svg-loader')

    config.module.rule('docx').test(/\.docx$/).use('binary-loader').loader('binary-loader')
  }
}

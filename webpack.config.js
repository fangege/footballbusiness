const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = (webpackConfig, env) => {
  const production = env === 'production'
  // FilenameHash
  webpackConfig.output.chunkFilename = '[name].[chunkhash].js'
  webpackConfig.output.publicPath = "https://business-1252878496.cos.ap-chengdu.myqcloud.com/"

 // webpackConfig.output.publicPath = "/"

  webpackConfig.plugins = webpackConfig.plugins.concat([
   
    new webpack.optimize.CommonsChunkPlugin({
      name:['vendor','manifest'], // 上面入口定义的节点组
  }),
  ])


  return webpackConfig
}

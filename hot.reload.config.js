/*
*  Vuex热重载生成实例
*  @author by Mason
* */
const webpack = require('webpack')

// 注意：不要在生产环境( production )下启用 HMR
module.exports = new webpack.HotModuleReplacementPlugin()

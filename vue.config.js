// 预渲染配置
const preRenderConfig = require('./pre-render.config')
// 雪碧生成图配置
const spriteConfig = require('./sprite.config')
// Vuex热重载生成实例
const HotModuleConfig = require('./hot.reload.config')
// 操作js 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// 生产环境、测试环境 插件配置
let pluginArr = []
if (process.env.NODE_ENV === 'production') {
    // 生产环境plugin配置
    pluginArr = [
        spriteConfig,
        preRenderConfig
    ]
} else {
    // 测试环境plugin配置
    pluginArr = [
        spriteConfig,
        HotModuleConfig
    ]
}
const plugins = pluginArr
console.log(process.env.NODE_ENV)
// 基础路径
let baseUrl = '/'
// 开发环境服务配置
module.exports = {
    // 这里使用publicPath代替baseUrl   因为baseUrl不推荐使用
    publicPath: baseUrl,

    // 关闭代码检查
    lintOnSave: false,

    // 并行执行   thread-loader 会在多核机器上默认开启
    parallel: false,

    devServer: {
        host: process.env.VUE_APP_HOST || '172.16.12.81',
        port: process.env.VUE_APP_PORT || 8080,
        open: true, // 自动打开浏览器
        hot: true, // 热更新
        // 代理
        proxy: {
            '/mobileApi': {
                target: process.env.VUE_APP_BASE_API,
                changeOrigin: true,
                pathRewrite: { '^/mobileApi': '' }
            }
        }
    },
    chainWebpack: config => {
        /**
         * 删除懒加载模块的 prefetch preload，降低带宽压力
         * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
         */
        config.plugins
            .delete('prefetch')
            .delete('preload')
        // 解决 cli3 热更新失效
        config.resolve
            .symlinks(true)
            // 非开发环境
            .when(process.env.NODE_ENV === 'production', configs => {
                configs.parent.optimization.minimizer([
                    new UglifyJsPlugin({
                        sourceMap: process.env.NODE_ENV === 'production', // 打包后是否允许生成map文件（map文件不是压缩后的代码）
                        uglifyOptions: {
                            // 移除 console
                            compress: {
                                warnings: false,
                                drop_console: true,
                                drop_debugger: true,
                                pure_funcs: ['console.log']
                            }
                        }
                    })
                ])
            })
    },

    configureWebpack: {
        plugins: plugins
    },
    // 在 multi-page 模式下构建应用
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '阿卡迪亚',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        console: {
            // 应用入口配置，相当于单页面应用的main.js，必需项
            entry: 'src/views/console/console.js',

            // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
            template: 'public/console.html',

            // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
            filename: 'console.html',

            // 标题，可选项，一般情况不使用，通常是在路由切换时设置title
            // 需要注意的是使用title属性template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'console page',

            // 包含的模块，可选项
            chunks: ['console']
        },
        // 只有entry属性时，直接用字符串表示模块入口
        client: {
            entry: 'src/views/client/client.js',
            title: 'client page'
        }
    },
    css: {
        loaderOptions: {
            less: {
                // 使用less提供的modifyVars修改vant-ui默认样式
                modifyVars: {
                    green: '#000'
                }
            }
        }
    }
}

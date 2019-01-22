vue-cli3项目安装指导：
1、初始项目

2、安装依赖
根目录下：cnpm install
npm i axios -S
npm i vuex -S
npm i webpack-spritesmith -S    // 雪碧图自动生成
npm i amfe-flexible -S    // 移动端自适应
npm i dayjs -S    // 时间插件
npm i normalizr -S    // 数据扁平化处理
npm i prerender-spa-plugin -S    // 预渲染
npm i vant -S    // vantUI
npm i vue-wechat-title -S    // 配置多页面应用title插件
main.js中使用use

3、修改配置
（1）按需引用：可在main.js中按需引用vant组件

4、雪碧图生成配置
vue.config.js中
+ const SpritesmithPlugin = require('webpack-spritesmith');
添加+
const templateFunction = function (data) {
    const shared = `.sprite { background: url(I) no-repeat; background-size: ${data.spritesheet.width}px ${data.spritesheet.height}px;}`
        .replace('I', "../../" + data.spritesheet.image);
    const perSprite = data.sprites.map(function (sprite) {
        return '.icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
            .replace('N', sprite.name)
            .replace('W', sprite.width + 6)
            .replace('H', sprite.height + 6)
            .replace('X', sprite.offset_x + 3)
            .replace('Y', sprite.offset_y + 3);
    }).join('\n');
    return shared + '\n' + perSprite;
};
 configureWebpack: {
         plugins: [
             new SpriteSmithPlugin({
                 src: {
                     cwd: path.resolve(__dirname, './src/assets/images/sprite_icons/'),
                     glob: '*.png'
                 },
                 target: {
                     image: path.resolve(__dirname, './src/assets/images/css_sprites.png'),
                     css: [
                         [path.resolve(__dirname, './src/stylus/base/sprites.css'), {
                             format: 'function_based_template'
                         }]
                     ]
                 },
                 apiOptions: {
                     cssImageRef: 'assets/images/css_sprites.png'
                 },
                 customTemplates: {
                     'function_based_template': templateFunction
                 },
                 spritesmithOptions: {
                     algorithm: 'binary-tree',
                     padding: 20
                 }
             })
         ]
     }
5、px单位自动转为rem
卸载默认的postcss-px2rem，改用postcss-pxtorem（拥有更多的配置参数）
.postcssrc.js中修改为：
-> "postcss-pxtorem": {
      rootValue: 75,
      unitPrecision: 5,   // 精度，小数点后5位
      propWhiteList: ['*'],   // 白名单，全部
      selectorBlackList: [/^.cube-/,/^.wheel-/,/^.px-/], // 黑名单
      replace: true,
      mediaQuery: false,
      minPixelValue: 2    // 最小转化值，1px则不转换
    }
6、VantUI默认样式修改配置
vue.config.js里配置
css: {
        loaderOptions: {
            less: {
                // 使用less提供的modifyVars修改vant-ui默认样式
                modifyVars: {
                    green: '#000'  // 修改后的样式
                }
            }
        }
    }
7、 预渲染配置
 vue.config.js configureWebpack.plugin配置
 new PrerenderSPAPlugin({
     // 生成文件的路径，也可以与webpakc打包的一致。
     // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
     staticDir: path.join(__dirname, 'dist'),

     // Required - Routes to render.
     // 需要渲染的文件
     routes: ['/'],
     // The actual renderer to use. (Feel free to write your own)
     // Available renderers: https://github.com/Tribex/prerenderer/tree/master/renderers
     // 这个很重要，如果没有配置这段，也不会进行预编译
     renderer: new Renderer({
         // Optional - Wait to render until the specified event is dispatched on the document.
         // eg, with `document.dispatchEvent(new Event('custom-render-trigger'))`
         // 在 main.js 中 document.dispatchEvent(new Event('custom-render-trigger'))，两者的事件名称要对应上。
         renderAfterDocumentEvent: 'custom-render-trigger',

         // Other puppeteer options.
         // (See here: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions)
         headless: false // Display the browser window when rendering. Useful for debugging.
     })
 })
 8、Vuex热重载配置（注意：不要在生产环境( production )下启用 HMR）
 new webpack.HotModuleReplacementPlugin()
 9、在 multi-page 模式下构建应用配置
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




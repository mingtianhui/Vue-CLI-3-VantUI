/*
*  预渲染配置
*  @author by Mason
* */
const path = require('path')
// 预渲染
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
console.log(__dirname)
// 预渲染配置
module.exports = new PrerenderSPAPlugin({
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

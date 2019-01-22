// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
    "plugins": {
        // to edit target browsers: use "browserslist" field in package.json
        "autoprefixer": {
            browsers: ['Android >= 4.0', 'iOS >= 7']
        },
        "postcss-pxtorem": {
            rootValue: 75,
            unitPrecision: 5,   // 精度，小数点后5位
            propWhiteList: ['*'],   // 白名单，全部
            selectorBlackList: [/^.vant/,/^.wheel-/,/^.px-/], // 黑名单
            replace: true,
            mediaQuery: false,
            propList: ['*'],
            minPixelValue: 2    // 最小转化值，1px则不转换
        }
    }
}

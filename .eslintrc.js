module.exports = {
    root: true,
    // 环境定义了预定义的全局变量。
    env: {
        browser: true,
        es6: true,
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    /**
     * "off" 或 0 - 关闭规则
     * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
     * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
     */
    rules: {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        'no-console': process.env.NODE_ENV === 'production' ? 0 : 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 0 : 2,
        // 使用 === 替代 == allow-null允许null和undefined==
        'eqeqeq': [2, "allow-null"],
        // 禁用 alert、confirm 和 prompt
        'no-alert': process.env.NODE_ENV === 'production' ? 0 : 2,
        // 要求或禁止 var 声明中的初始化(初值)
        "init-declarations": process.env.NODE_ENV === 'production' ? 0 : 2,
        //缩进关掉
        "indent": 0
    },
    // JavaScript 语言选项
    parserOptions: {
        // ECMAScript 版本
        ecmaVersion: 6,
        parser: 'babel-eslint',
        //想使用的额外的语言特性:
        ecmaFeatures: {
            // 允许在全局作用域下使用 return 语句
            globalReturn: true,
            modules: true
        }
    }
}

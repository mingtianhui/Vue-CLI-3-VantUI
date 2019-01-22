/*
*  雪碧生成图配置
*  @author by Mason
* */
const path = require('path')
// 雪碧图
const SpriteSmithPlugin = require('webpack-spritesmith')
const templateFunction = function (data) {
    const shared = `.sprite { background: url(I) no-repeat; background-size: ${data.spritesheet.width}px ${data.spritesheet.height}px;}`
        .replace('I', '../../' + data.spritesheet.image)
    const perSprite = data.sprites.map(function (sprite) {
        return '.icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
            .replace('N', sprite.name)
            .replace('W', sprite.width + 6)
            .replace('H', sprite.height + 6)
            .replace('X', sprite.offset_x + 3)
            .replace('Y', sprite.offset_y + 3)
    }).join('\n')
    return shared + '\n' + perSprite
}
// 雪碧图生成配置
module.exports = new SpriteSmithPlugin({
    src: {
        cwd: path.resolve(__dirname, './src/assets/images/sprite_icons/'),
        glob: '*.png'
    },
    target: {
        image: path.resolve(__dirname, './src/assets/images/css_sprites.png'),
        css: [
            [path.resolve(__dirname, './src/less/base/sprites.css'), {
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

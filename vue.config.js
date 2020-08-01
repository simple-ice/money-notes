const path = require('path')

module.exports = {
    lintOnSave: false,
    chainWebpack: config => {

        const dir = path.resolve(__dirname, 'src/assets/icons')
        // config.module.rule('svg').exclude.add(dir) //将其他路径下的svg排除
        config.module
            .rule('svg-sprite')
            .test(/\.svg$/)
            .include.add(dir).end() //只包含icons目录
            .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract: false}).end()
            .use('svgo-loader').loader('svgo-loader')
            .tap(options => ({...options, plugins: [{removeAttrs: {attrs: 'fill'}}]})).end()
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])
        config.module.rule('svg').exclude.add(dir) //将其他路径下的svg排除
    }
}

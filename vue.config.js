const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    publicPath: './', // vue-cli3.3+,部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
    assetsDir: 'static', // 静态资源地址
    productionSourceMap: false,
    // scss 全局引入
    css: {
        extract: isProd, // 开发环境下关闭，true 和热更新不兼容，保证 css 热更新
        sourceMap: !isProd,
        loaderOptions: {
            sass: {
                prependData: `
                    @import "@/styles/variables.scss";
                    @import "@/styles/mixins.scss";
                `,
            },
        },
    },
    // 配置代理
    devServer: {
        // 配置代理
        proxy: {
            '/v1': {
                target: '', // 目标代理接口地址
                changeOrigin: true,
                secure: false,
                header: {
                    Referer: '',
                },
            },
        },
    },
    chainWebpack: config => {
        // 只引入 moment 中国语言包
        config
            .plugin('ignore')
            .use(
                new webpack.ContextReplacementPlugin(
                    /moment[/\\]locale$/,
                    /(zh-cn)$/,
                ),
            )

        // 修复HMR
        config.resolve.symlinks(true)
        return config
    },
    // 配置 webpack
    configureWebpack: config => {
        // 添加对 pdf 文件的处理 loader
        config.module.rules = [...config.module.rules, {
            test: /\.pdf$/,
            use: 'url-loader',
        }]

        // gzip 压缩
        if (isProd) {
            config.plugins = [
                ...config.plugins,
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: /\.(js|css|html|svg)(\?.*)?$/i,
                    threshold: 10240,
                    minRatio: 0.8,
                }),
            ]
        }

        // 生成可调试的代码
        if (!isProd) {
            config.output.devtoolModuleFilenameTemplate = info => {
                const resPath = info.resourcePath

                if ((/\.vue$/.test(resPath) && !/type=script/.test(info.identifier)) ||
                    /node_modules/.test(resPath)) {
                    return `webpack:///${resPath}?${info.hash}`
                }
                return `webpack:///${resPath.replace('./src', 'uncompiled-code/src')}`
            }
        }
    },
}

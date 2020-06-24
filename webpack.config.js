const { resolve } = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    // mode: 'development',
    mode: 'production',

    // devtool: 'eval-source-map',
    // devtool: 'eval-cheap-module-source-map',

    entry: './src/index.js',

    output: {
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname, 'build'),
        // all resource refer this path
        publicPath: '/',
        // name for non-entry file，like import()
        chunkFilename: '[name]_chunk.js',
    },

    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.m?js$/i,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: 'babel-loader',
                                options: {
                                    presets: [
                                        [
                                            '@babel/preset-env',
                                            {
                                                targets: {
                                                    edge: '17',
                                                    firefox: '60',
                                                    chrome: 67,
                                                    safari: '11.1',
                                                    ie: '9',
                                                },
                                                // useBuiltIns: 'usage',
                                                // corejs: 3,
                                            },
                                        ],
                                    ],
                                    plugins: [
                                        [
                                            '@babel/plugin-transform-runtime',
                                            {
                                                corejs: 3,
                                            },
                                        ],
                                    ],
                                    cacheDirectory: true,
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },

    plugins: [new CleanWebpackPlugin()],

    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    name: 'vendors',
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    // priority: -20,
                    reuseExistingChunk: true,
                },
                'core-jsBase': {
                    test: (module) => {
                        return /core-js/.test(module.context)
                    },
                    chunks: 'initial',
                    name: 'core-jsBase',
                    priority: 10,
                },
            },
        },
    },
}

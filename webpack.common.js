const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
    entry: {
        'app': './crm/index.jsx',
        // 'vendor': [
        //     'react', 'redux', 'react-dom', 'react-router', 'react-router-dom', 'react-redux', 'axios', 'react-loadable', 'moment', 
        //     'prop-types', 'redux-form', 'redux-logger', 'redux-promise-middleware', 'redux-thunk', 'react-autosuggest', 'react-color', 
        //     'react-copy-to-clipboard', 'react-cropper', 'react-datetime', 'react-modal', 'react-timekeeper', 'react-widgets', 
        //     'recharts', 'nouislider', 'react-lazy-load-image-component'
        // ],
    },
    output: {
        path: path.resolve(__dirname, 'crmBuild'),
        filename: '[name].bundle.js',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons1',
                    chunks: 'initial',
                    minChunks: 2,
                    enforce: true,
                }
            }
        },
    },
    plugins: [
        new NodePolyfillPlugin(),
        new HtmlWebpackPlugin({
            template: './crm/template/index.html',
            filename: path.resolve(__dirname, 'crm.html'), // Output crm.html in the parent directory
            minify: {
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: true,
                removeRedundantAttributes: false,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
    ],
    watchOptions: {
        aggregateTimeout: 100,
        poll: true,
    },
    module: {
        rules: [
            {
                test: /\.png$/,
                loader: 'url-loader',
                dependency: { not: ['url'] },
                options: {
                    mimetype: 'image/png'
                }
            },
            {
                test: /\.jpg$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader',
                dependency: { not: ['url'] },
                options: { limit: 100000 }
            }
        ]
    },
    resolve: {
        modules: [
            path.join(__dirname, '/'),
            'node_modules'
        ],
        extensions: ['.js', '.jsx'],
        alias: {
            css: 'crm/media/css',
            '@': path.resolve(__dirname, './')
        },
        fallback: {
            "crypto": require.resolve('crypto-browserify'),
        }
    }
};

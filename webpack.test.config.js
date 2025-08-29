const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const fs = require('fs');
const Dotenv = require('dotenv-webpack');


module.exports = merge(common, {
    mode: 'development',
    output: {
      path: path.resolve(__dirname, 'crmBuild'),
      publicPath: '/crmBuild/',
      filename: (fileData) => {
        const entryName = fileData.chunk.name
        return `${entryName}.js`
      },
      chunkFilename: (fileData) => {
        const entryName = fileData.chunk.hash
        return `${entryName}.js`
      }
    },
    watch: false,
    plugins: [
      new Dotenv({
        path: 'config/.env'
      })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", 'css-loader']
            },
            {
                test: /crm.*\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                  loader: 'babel-loader',
                  options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                    plugins: ["@babel/plugin-syntax-dynamic-import", "@babel/plugin-transform-class-properties"]
                  }
                }]
              }
        ]
    }
})
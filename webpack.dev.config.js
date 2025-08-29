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
  watch: true,
  devtool : 'source-map',
  plugins: [
    new Dotenv({
      path: 'config/.env'
    })
  ],
  module: {
    rules: [
      {
        test: /crm.*\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-transform-class-properties"
            ]
          }
        }]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", 'postcss-loader']
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  
})
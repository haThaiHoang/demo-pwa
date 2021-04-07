/* eslint-disable */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const lodash = require('lodash')
const path = require('path')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const WorkboxPlugin = require('workbox-webpack-plugin')

function getAppConfig(env) {
  return {}
}

module.exports = (env) => {
  const NODE_ENV = (env && env.NODE_ENV) || 'development'
  const IS_DEV = NODE_ENV === 'local'

  process.env.NODE_ENV = NODE_ENV

  console.log('Node ENV: %s', NODE_ENV)

  let plugins = [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.ejs'),
      favicon: path.resolve(__dirname, 'src/resources/images/favicon.svg')
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      'window._CONFIG': JSON.stringify(getAppConfig(NODE_ENV))
    }),
    new webpack.HotModuleReplacementPlugin()
  ]

  if (!IS_DEV) {
    plugins = plugins.concat([
      new WebpackPwaManifest({
        name: 'Demo PWA',
        short_name: 'Demo PWA',
        description: 'Demo PWA',
        background_color: '#069',
        theme_color: '#069',
        orientation: 'portrait',
        icons: [{
          src: path.resolve('src/resources/images/favicon.png'),
          sizes: [96, 128, 192, 256, 384, 512, 1024],
          ios: true
        }, {
          src: path.resolve('src/resources/images/favicon.png'),
          size: '1024x1024',
          purpose: 'maskable'
        }],
        inject: true,
        ios: true,
        display: 'standalone',
        start_url: '.'
      }),
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true
      })
    ])
  }

  return {
    devtool: IS_DEV ? 'eval-cheap-module-source-map' : false,
    entry: path.resolve(__dirname, IS_DEV ? 'src/index.dev.js' : 'src'),
    output: {
      filename: '[name][hash].js',
      path: path.resolve(__dirname, 'build'),
      publicPath: getAppConfig(NODE_ENV).PUBLIC_PATH
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      }, {
        test: /\.less$/,
        use: [
          IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          }
        ]
      }, {
        test: /\.css$/,
        use: [
          IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }, {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: !IS_DEV,
            root: path.resolve(__dirname, 'src')
          }
        }]
      }, {
        test: /\.(jpg|jpeg|png|svg|woff|eot|ttf|otf|pdf)$/,
        use: ['file-loader']
      }]
    },
    plugins,
    devServer: {
      host: '0.0.0.0',
      useLocalIp: true,
      disableHostCheck: true,
      hot: true,
      hotOnly: true,
      open: true,
      overlay: true,
      stats: 'minimal',
      clientLogLevel: 'warning',
      contentBase: path.join(__dirname, 'src'),
      historyApiFallback: true
    },
    stats: 'minimal',
    mode: IS_DEV ? 'development' : 'production'
  }
}

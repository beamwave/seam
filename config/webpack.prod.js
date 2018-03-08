import webpack from 'webpack'
import merge from 'webpack-merge'
import path from 'path'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

import helpers from './helpers'
import commonConfig from './webpack.common'

module.exports = merge(commonConfig, {
  output: {
    // path: path.join(__dirname, '../dist'),
    filename: 'js/bundle.js',
    // filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  mode: 'production'
  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       compressor: {
  //         warnings: false,
  //         screw_ie8: true
  //       },
  //       output: {
  //         comments: false
  //       }
  //     })
  //   ]
  // }
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     compressor: {
  //       warnings: false,
  //       screw_ie8: true
  //     },
  //     output: {
  //       comments: false
  //     }
  //   })
  // ]
})

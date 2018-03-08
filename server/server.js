// default modules
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import fs from 'fs'
import historyApiFallback from 'connect-history-api-fallback'
import mongoose from 'mongoose'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import webpackDevServer from 'webpack-dev-server'
import config from '../config/config'
import webpackConfig from '../webpack.config.babel'

const isDev = process.env.NODE_ENV !== 'production'

// sets heroku port if it exists, otherwise local machine
const port = process.env.PORT || 8080

// Configuration
// ================================================================================================
console.log(`mode: ${isDev}`)

// Set up Mongoose
mongoose.connect(isDev ? config.db_dev : config.db, {
  useMongoClient: true
})
mongoose.Promise = global.Promise

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// API routes
// to convert this => require('./routes')(app), use:
import Routes from './routes'
const routes = Routes(app)

if (isDev) {
  const compiler = webpack(webpackConfig)

  app.use(
    historyApiFallback({
      verbose: false
    })
  )

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      contentBase: path.resolve(__dirname, '../client/public'),
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    })
  )

  app.use(webpackHotMiddleware(compiler))
  app.use(express.static(path.resolve(__dirname, '../dist')))
} else {
  app.use(express.static(path.resolve(__dirname, '../dist')))
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'))
    res.end()
  })
}

// if (isDev) {
//   const compiler = webpack(webpackConfig)

//   new webpackDevServer(webpack(webpackConfig), {
//     contentBase: path.resolve(__dirname, '../client/public'),
//     publicPath: webpackConfig.output.publicPath,
//     hot: true,
//     historyApiFallback: true
// port: port,
// before(app) {
//   webpackDevMiddleware(compiler, {
//     // publicPath: webpackConfig.output.publicPath,
//     // contentBase: path.resolve(__dirname, '../client/public'),
//     stats: {
//       colors: true,
//       hash: false,
//       timings: true,
//       chunks: false,
//       chunkModules: false,
//       modules: false
//     }
//   })
//   app.use(webpackHotMiddleware(compiler))
//   app.use(express.static(path.resolve(__dirname, '../dist')))
// }
//   }).listen(port, '0.0.0.0', err => {
//     if (err) {
//       console.log(err)
//     }

//     console.info(
//       '>>> 🌎 Open http://0.0.0.0:%s/ in your browser. Should have webpack.',
//       port
//     )
//   })
// }

app.listen(port, '0.0.0.0', err => {
  if (err) {
    console.log(err)
  }

  console.info('>>> 🌎 Open http://0.0.0.0:%s/ in your browser.', port)
})

export default app

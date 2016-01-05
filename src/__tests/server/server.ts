'use strict'

import * as https from 'https'
import * as http from 'http'
import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'
import * as express from 'express'
import * as minilog from 'minilog'
import { resource } from '../utils/'

const certPath = (filename) => resource('cert-server/' + filename)

const log = minilog('Test:server')
minilog.enable()

const app = express()

app.get('/0x00', function(req, res) {
  res.send('hello world, protero!')
})

export function createHTTPServer(port) {
  return http.createServer(app).listen(port, () => {
    log.info('HTTP  server run:', 'http://127.0.0.1:' + port)
  })
}

export function createHTTPSServer(port): https.Server {
  const options = {
    key: fs.readFileSync(certPath('localhost.key')),
    cert: fs.readFileSync(certPath('localhost.crt'))
  }

  return https.createServer(options, app).listen(port, () => {
    log.info('HTTPS server run:', 'https://127.0.0.1:' + port)
    log.info('Root CA at:', certPath('rootca.cert'), 'Please install root CA on your OS.')
  })
}

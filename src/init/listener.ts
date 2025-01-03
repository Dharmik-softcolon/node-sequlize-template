import http from 'node:http'

import app from '../app'
import config from '../config/config'
import logger from '../util/logger'

import type { Server as HttpServer } from 'node:http'

const listener = (): HttpServer => {
    const port = config.PORT ?? 5002

    const log = () =>
        logger.info(`APPLICATION_STARTED`, {
            meta: {
                PORT: config.PORT
            }
        })

    const server = http.createServer(app)

    return server.listen(port, log)
}

export default listener

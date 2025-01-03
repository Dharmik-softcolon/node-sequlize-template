/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-plusplus */
import os from 'os'

import notifier from 'node-notifier'
import osUtils from 'os-utils'
import winston from 'winston'

import { sendEmailNotification } from './emailService'

import type { NextFunction, Request, Response } from 'express'

// Logger configuration
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [new winston.transports.File({ filename: 'errors.log' }), new winston.transports.Console()]
})

let activeUsers = 1
const userThreshold = 101

// Monitor memory and CPU usage
export const monitorSystem = (req: Request, res: Response, next: NextFunction): void => {
    activeUsers++ // Increment active user count

    res.on('finish', () => {
        activeUsers-- // Decrement user count after response is sent
    })

    if (activeUsers > userThreshold) {
        osUtils.cpuUsage((cpuUsage) => {
            const memoryUsage = (os.totalmem() - os.freemem()) / os.totalmem()

            if (memoryUsage > 0.8) {
                const message = `High memory usage detected: ${(memoryUsage * 100).toFixed(2)}% with ${activeUsers} active users`
                notifier.notify({ title: 'Memory Alert', message })
                logger.error(message)
                sendEmailNotification('⚠️High Memory Usage Alert', message).catch((err) => logger.error('Error sending email:', err))
            }

            if (cpuUsage > 0.8) {
                const message = `High CPU usage detected: ${(cpuUsage * 100).toFixed(2)}% with ${activeUsers} active users`
                notifier.notify({ title: 'CPU Alert', message })
                logger.error(message)
                sendEmailNotification('⚠️High CPU Usage Alert', message).catch((err) => logger.error('Error sending email:', err))
            }
        })
    }

    // Proceed to the next middleware
    next()
}

// API perfomance
export const apiPerformanceMonitor = (req: Request, res: Response, next: NextFunction): void => {
    const start = process.hrtime()

    res.on('finish', () => {
        const [seconds, nanoseconds] = process.hrtime(start)
        const duration = (seconds * 1000 + nanoseconds / 1e6).toFixed(2) // Convert to ms
        const message = `${req.method} ${req.originalUrl} took ${duration} ms`

        if (+duration > 500) {
            // Threshold in milliseconds
            // logger.warn(`Slow API detected: ${message}`)
            logger.info(`Slow API detected: ${message}`)
        } else {
            logger.info(message)
        }
    })

    next()
}

// Error handling middleware for Express
const errorHandler = (err: Error, req: Request, res: Response): void => {
    const message = `Error: ${err.message}\nStack: ${err.stack}`
    notifier.notify({ title: 'Server Error', message: err.message })
    logger.error(message)
    sendEmailNotification('Server Error Alert', message)
    res.status(500).send('Internal Server Error')
}

export { errorHandler }

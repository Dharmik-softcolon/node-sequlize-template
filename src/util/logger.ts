/* eslint-disable @typescript-eslint/no-shadow */
// import path from 'path'
// import util from 'util'

// import { blue, green, magenta, red, yellow } from 'colorette'
// import * as sourceMapSupport from 'source-map-support'
// import { createLogger, format, transports } from 'winston'

// import 'winston-daily-rotate-file' // Import Daily Rotate File
// import config from '../config/config'
// import { isDevelopment } from '../constant/application'

// // Linking Trace Support
// sourceMapSupport.install()

// const colorizeLevel = (level: string) => {
//     switch (level) {
//         case 'ERROR':
//             return red(level)
//         case 'INFO':
//             return blue(level)
//         case 'WARN':
//             return yellow(level)
//         default:
//             return level
//     }
// }

// const consoleLogFormat = format.printf((info) => {
//     const { level, message, timestamp, meta = {} } = info

//     const customLevel = colorizeLevel(level.toUpperCase())
//     const customTimestamp = green(timestamp as string)
//     const customMeta = util.inspect(meta, { showHidden: false, depth: null, colors: true })

//     return `${customLevel} [${customTimestamp}] ${message}\n${magenta('META')} ${customMeta}\n`
// })

// const consoleTransport = () => {
//     if (isDevelopment) {
//         return [
//             new transports.Console({
//                 level: 'info',
//                 format: format.combine(format.timestamp(), consoleLogFormat)
//             })
//         ]
//     }
//     return []
// }

// const createDailyRotateTransport = (logDir: string, logRetention: string, compression = false) =>
//     new transports.DailyRotateFile({
//         dirname: path.join(__dirname, '../..', 'logs', logDir),
//         filename: `%DATE%.log`,
//         datePattern: 'YYYY-MM-DD',
//         level: 'info',
//         format: format.combine(format.timestamp(), format.json()),
//         zippedArchive: compression,
//         maxFiles: logRetention // Retention policy
//     })

// // Setup different transports for environments
// const transportsList = () => {
//     switch (config.ENV) {
//         case 'production':
//             return [
//                 createDailyRotateTransport('production', '30d', true) // Compress after 30 days
//             ]
//         case 'development':
//             return [
//                 createDailyRotateTransport('development', '7d'), // Retain for 7 days
//                 ...consoleTransport()
//             ]
//         case 'staging':
//             return [
//                 createDailyRotateTransport('staging', '14d') // Retain for 14 days
//             ]
//         default:
//             return consoleTransport() // Default to console transport
//     }
// }

// export default createLogger({
//     defaultMeta: { meta: {} },
//     transports: transportsList()
// })

import path from 'path'
import util from 'util'

import { blue, green, magenta, red, yellow } from 'colorette'
import * as sourceMapSupport from 'source-map-support'
import { createLogger, format, transports } from 'winston'

import 'winston-daily-rotate-file'
import config from '../config/config'
import { isDevelopment } from '../constant/application'

// Enable source map support for better stack traces
sourceMapSupport.install()

// Function to colorize the log level for console output
const colorizeLevel = (level: string) => {
    switch (level) {
        case 'ERROR':
            return red(level)
        case 'INFO':
            return blue(level)
        case 'WARN':
            return yellow(level)
        default:
            return level
    }
}

// Custom console log format
const consoleLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info
    const customLevel = colorizeLevel(level.toUpperCase())
    const customTimestamp = green(timestamp as string)
    const customMeta = util.inspect(meta, { showHidden: false, depth: null, colors: true })

    return `${customLevel} [${customTimestamp}] ${message}\n${magenta('META')} ${customMeta}\n`
})

// Custom JSON format for logs to include additional fields for querying
const jsonLogFormat = format.printf((info) => {
    const { level, message, timestamp, statusCode, path, userId, meta } = info
    return JSON.stringify({
        level,
        timestamp,
        message,
        statusCode,
        path,
        userId,
        meta
    })
})

// Configure console transport for development environment
const consoleTransport = () => {
    if (isDevelopment) {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), consoleLogFormat)
            })
        ]
    }
    return []
}

// Create daily rotating file transport with JSON format
const createDailyRotateTransport = (logDir: string, logRetention: string, compression = false) =>
    new transports.DailyRotateFile({
        dirname: path.join(__dirname, '../..', 'logs', logDir),
        filename: `%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        level: 'info',
        format: format.combine(format.timestamp(), format.json()),
        zippedArchive: compression,
        maxFiles: logRetention
    })

// List of transports based on environment
const transportsList = () => {
    switch (config.ENV) {
        case 'production':
            return [createDailyRotateTransport('production', '30d', true)]
        case 'development':
            return [createDailyRotateTransport('development', '7d'), ...consoleTransport()]
        case 'staging':
            return [createDailyRotateTransport('staging', '14d')]
        default:
            return consoleTransport()
    }
}

// Export logger with custom fields and transports
export default createLogger({
    defaultMeta: { meta: {} },
    format: format.combine(
        format.timestamp(),
        jsonLogFormat // Include JSON format for structured logs
    ),
    transports: transportsList()
})

/* eslint-disable no-promise-executor-return */
// 'use strict'

// import * as fs from 'fs'
// import * as readline from 'readline'
// import * as path from 'path'
// import config from './config/config'

// const env = config.ENV
// const date = '2024-12-03'

// interface Log {
//     meta?: {
//         statusCode?: number
//         success?: boolean
//         request?: {
//             method?: string
//             url?: string
//         }
//     }
// }

// /**
//  * Filters logs by a specific condition.
//  * @param {string} logFilePath
//  * @param {(log: Log) => boolean} filterCondition
//  * @returns {Promise<void>}
//  */
// async function filterLogs(logFilePath: string, filterCondition: (log: Log) => boolean): Promise<void> {
//     try {
//         const resolvedPath = path.resolve(__dirname, logFilePath)
//         const readStream = fs.createReadStream(resolvedPath)
//         const rl = readline.createInterface({
//             input: readStream,
//             output: process.stdout,
//             terminal: false
//         })

//         rl.on('line', (line) => {
//             try {
//                 const log: Log = JSON.parse(line)
//                 if (filterCondition(log)) {
//                     console.log(line)
//                 }
//             } catch (error) {
//                 console.error('Error parsing log line:', (error as Error).message)
//             }
//         })

//         await new Promise<void>((resolve) => rl.on('close', resolve))
//         console.log('Log filtering completed.')
//     } catch (error) {
//         console.error('Error reading log file:', (error as Error).message)
//     }
// }

// /**
//  * Filters logs by status code.
//  * @param {string} logFilePath
//  * @param {number} statusCode
//  */
// async function filterLogsByStatusCode(logFilePath: string, statusCode: number): Promise<void> {
//     await filterLogs(logFilePath, (log) => log.meta?.statusCode === statusCode)
// }

// /**
//  * Filters logs by HTTP method.
//  * @param {string} logFilePath
//  * @param {string} method
//  */
// async function filterLogsByMethod(logFilePath: string, method: string): Promise<void> {
//     await filterLogs(logFilePath, (log) => log.meta?.request?.method === method)
// }

// /**
//  * Filters logs by success status.
//  * @param {string} logFilePath
//  * @param {boolean} success
//  */
// async function filterLogsBySuccess(logFilePath: string, success: boolean): Promise<void> {
//     await filterLogs(logFilePath, (log) => log.meta?.success === success)
// }

// /**
//  * Filters logs by URL.
//  * @param {string} logFilePath
//  * @param {string} url
//  */
// async function filterLogsByURL(logFilePath: string, url: string): Promise<void> {
//     await filterLogs(logFilePath, (log) => log.meta?.request?.url === url)
// }

// // Example Usage
// const logFilePath = `../logs/${env}/${date}.log`

// // Filter by status code
// // filterLogsByStatusCode(logFilePath, 400)

// // Filter by HTTP method
// // filterLogsByMethod(logFilePath, 'POST')

// // Filter by success status
// // filterLogsBySuccess(logFilePath, false)

// // Filter by URL
// filterLogsByURL(logFilePath, '/api/v1/store-owner/register')

import * as fs from 'fs'
import * as path from 'path'
import * as readline from 'readline'

import config from './config/config'
import logger from './util/logger'

const env = config.ENV
const date = '2024-12-10'

interface Log {
    meta?: {
        statusCode?: number
        success?: boolean
        request?: {
            method?: string
            url?: string
        }
    }
}

interface LogFilterConditions {
    statusCode?: number
    method?: string
    success?: boolean
    url?: string
}

/**
 * Filters logs dynamically based on provided conditions.
 * @param {string} logFilePath - Path to the log file.
 * @param {LogFilterConditions} conditions - Filter conditions.
 * @returns {Promise<void>}
 */
async function filterLogsCombined(logFilePath: string, conditions: LogFilterConditions): Promise<void> {
    try {
        const resolvedPath = path.resolve(__dirname, logFilePath)
        const readStream = fs.createReadStream(resolvedPath)
        const rl = readline.createInterface({
            input: readStream,
            output: process.stdout,
            terminal: false
        })

        rl.on('line', (line) => {
            try {
                const log: Log = JSON.parse(line)

                // Check if the log entry satisfies all conditions
                const matches = Object.entries(conditions).every(([key, value]) => {
                    switch (key) {
                        case 'statusCode':
                            return log.meta?.statusCode === value
                        case 'method':
                            return log.meta?.request?.method === value
                        case 'success':
                            return log.meta?.success === value
                        case 'url':
                            return log.meta?.request?.url === value
                        default:
                            return true
                    }
                })

                if (matches) {
                    logger.info(line)
                }
            } catch (error) {
                logger.info('Error parsing log line:', error)
            }
        })

        await new Promise<void>((resolve) => rl.on('close', resolve))
        logger.info('Log filtering completed.')
    } catch (error) {
        logger.warn(error as Error)
    }
}

// Example Usage
const logFilePath = `../logs/${env}/${date}.log`

// Example : Filter logs with statusCode 200 AND URL '/api/v1/resource'
filterLogsCombined(logFilePath, {
    statusCode: 200,
    success: true
    // url: '/api/v1/store-owner/register'
})

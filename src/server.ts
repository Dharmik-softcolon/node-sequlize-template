import { sendEmailNotification } from './emailService'
import listener from './init/listener'
import logger from './util/logger'

// UNHANDLED EXCEPTION, WHEN FACE SOME DEVELOPER ERROR
process.on('uncaughtException', (err) => {
    sendEmailNotification('Critical Server Crash', err.message)
    logger.error('Uncaught Exception! SHUTTING DOWN...', {
        meta: {
            name: err.name,
            message: err.message
        }
    })
    process.exit(1)
})

const listen = listener()

// UNHANDLED REJECTION, WHEN FACE SOME PROGRAMMATIC ERROR
process.on('unhandledRejection', (err: Error) => {
    // const message = `Unhandled Rejection: ${reason}\nPromise: ${promise}`
    sendEmailNotification('Unhandled Rejection', err.message)
    logger.error('Uncaught Rejection! SHUTTING DOWN...', {
        meta: {
            name: err.name,
            message: err.message
        }
    })

    listen.close(() => process.exit(1)) // 0 FOR SUCCESS & 1 FOR UNHANDLED SO CRASHED
})

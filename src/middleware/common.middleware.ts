import rateLimit from 'express-rate-limit'

import responseMessage from '../constant/responseMessage'

import type { ENextHandler } from '../types/express.types'

export const rateLimiter = (): ENextHandler =>
    rateLimit({
        max: 1000,
        windowMs: 60 * 60 * 1000,
        message: { message: responseMessage.TOO_MANY_REQUESTS }
    })

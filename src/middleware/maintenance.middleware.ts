import dotenv from 'dotenv'

import config from '../config/config'
import responseMessage from '../constant/responseMessage'
import httpResponse from '../util/httpResponse'

import type { NextFunction, Request, Response } from 'express'

// Load environment variables
dotenv.config()

/**
 * Middleware to handle maintenance mode based on the environment variable.
 */
export const maintenanceMiddleware = (req: Request, res: Response, next: NextFunction): undefined => {
    if (config.MAINTENANCE_STATUS === 'true') {
        return void httpResponse(req, res, 503, responseMessage.IN_MAINTENANCE_MODE, 'SERVICE_UNAVAILABLE')
    }
    next()
}

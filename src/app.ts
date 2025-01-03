import responseMessage from './constant/responseMessage'
import { apiPerformanceMonitor, errorHandler } from './errorHandler'
import globalErrorHandler from './middleware/globalErrorHandler'
import { maintenanceMiddleware } from './middleware/maintenance.middleware'
import app from './middleware/middleware'
import Router from './router/index'
import httpError from './util/httpError'

import type { NextFunction, Request, Response } from 'express'

// Add the maintenance middleware at the top level
app.use(maintenanceMiddleware)

// Add multi User monitoring middleware
// app.use(monitorSystem)

// Add performance monitoring middleware
app.use(apiPerformanceMonitor)

// Mount the primary router
app.use('/api/v1', Router)

// Error handling middleware for specific errors
app.use(errorHandler)

// 404 Handler: If no routes match, this middleware catches unmatched routes
app.use((req: Request, _: Response, next: NextFunction) => {
    const error = new Error(responseMessage.NOT_FOUND('route'))
    httpError(next, error, req, 404)
})

// Global Error Handler: Handles all errors in one centralized place
app.use(globalErrorHandler)

export default app

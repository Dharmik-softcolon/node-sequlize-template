/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */

import httpError from './httpError'

import type { NextFunction, Request, Response } from 'express'

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>
type SyncRequestHandler = (req: Request, res: Response, next: NextFunction) => void

export const asyncHandler =
    (fn: AsyncRequestHandler) =>
    (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch((err) => httpError(next, err, req))
    }

export const syncHandler =
    (fn: SyncRequestHandler) =>
    (req: Request, res: Response, next: NextFunction): void => {
        try {
            fn(req, res, next)
        } catch (err) {
            httpError(next, err, req)
        }
    }

interface AuthenticatedRequest extends Request {
    userId: string
}

// Helper function to determine if a function is async

type HandlerFunction = (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<any> | any

declare global {
    namespace Express {
        interface Request {
            userId: string
        }
    }
}

const globalHandler =
    (fn: HandlerFunction) =>
    async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            await Promise.resolve(fn(req as AuthenticatedRequest, res, next))
        } catch (error) {
            httpError(next, error, req)
        }
    }

export default globalHandler

import prisma from '../client/prisma'
import config from '../config/config'
import responseMessage, { HTTP_STATUSES } from '../constant/responseMessage'
import { verifyAccessToken } from '../util/auth'
import globalHandler from '../util/globalHandler'
import httpResponse from '../util/httpResponse'
import logger from '../util/logger'

import type { Request, Response } from 'express'

export const isCustomer = globalHandler(async (req: Request, res: Response, next) => {
    const headerToken = req.headers[config.TOKEN_HEADER_NAME] as string | undefined

    const token = headerToken?.startsWith('Bearer') ? headerToken.split(' ')[1] : undefined

    if (!token) return void httpResponse(req, res, HTTP_STATUSES.UNAUTHORIZED, responseMessage.UNAUTHORIZED_ERROR)

    const tokenInfo = await verifyAccessToken(token)

    if (!tokenInfo || tokenInfo === '') return void httpResponse(req, res, HTTP_STATUSES.UNAUTHORIZED, responseMessage.UNAUTHORIZED_ERROR)

    if (!(tokenInfo instanceof Object) || !('id' in tokenInfo))
        return void httpResponse(req, res, HTTP_STATUSES.UNAUTHORIZED, responseMessage.UNAUTHORIZED_ERROR)

    if (!tokenInfo.id) return void httpResponse(req, res, HTTP_STATUSES.UNAUTHORIZED, responseMessage.UNAUTHORIZED_ERROR)

    const user = await prisma.customer.findUnique({ where: { id: tokenInfo.id } })

    if (!user) {
        logger.error(`User with id ${tokenInfo.id} is not an user`)
        return void httpResponse(req, res, HTTP_STATUSES.UNAUTHORIZED, responseMessage.UNAUTHORIZED_ERROR)
    }

    req.userId = user.id

    return void next()
})

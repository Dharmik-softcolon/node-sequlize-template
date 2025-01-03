/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'node:path'

import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import hpp from 'hpp'
import morgan from 'morgan'

import { rateLimiter } from './common.middleware'
import config from '../config/config'
import { isDevelopment } from '../constant/application'

import type { Application, RequestHandler } from 'express'

const app: Application = express()

// Middleware
app.use(cors({ credentials: true, origin: true }))
app.options('*', cors())
app.use(express.static(path.join(__dirname, '../../', 'public'))) // Serving Static files

if (isDevelopment) app.use(morgan('dev')) // Development logging
if (config.RATE_LIMIT === 'ON') app.use('/api', rateLimiter()) // Limit requests from same API

app.use(helmet()) // Set security HTTP headers
app.use(express.json()) // Body parser, convert rawBody into req.body json
app.use(cookieParser()) // Body parser, reading data from cookie
const middlewareWrapper = (middleware: RequestHandler) => middleware

app.use(middlewareWrapper(hpp() as any))
app.use(middlewareWrapper(compression() as any))
export default app

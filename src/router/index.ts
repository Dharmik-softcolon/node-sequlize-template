import { Router as ExpressRouter } from 'express'

import customerRouter from './customerRouter'
import storeOwnerRouter from './storeOwnerRouter'

const Router = ExpressRouter()

Router.use('/customer', customerRouter)
Router.use('/store-owner', storeOwnerRouter)

export default Router

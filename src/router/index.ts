import { Router as ExpressRouter } from 'express'

import companyRoutes from './company.router'
import employeeRouter from './employee.router'

const Router = ExpressRouter()

Router.use('/company', companyRoutes);
Router.use('/employee', employeeRouter)

export default Router

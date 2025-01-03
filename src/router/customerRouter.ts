import { Router as ExpressRouter } from 'express'

// import { customerLogin, customerRegister } from '../controller/customerController'

const Router = ExpressRouter()

// Router.post('/register', customerRegister)
// Router.post('/login', customerLogin)
Router.get('/crash-test', () => {
    throw new Error('Simulated server crash for testing purposes.')
})

export default Router

import { Router as ExpressRouter } from 'express'

// import { addContacts, getContacts, getStoreOwners, phoneNumberUpdate, storeOwnerLogin, storeOwnerRegisters } from '../controller/storeOwnerController'
import { isStoreOwner } from '../middleware/storeOwner.auth.middleware'

const Router = ExpressRouter()

// Router.post('/register', storeOwnerRegisters)
// Router.post('/login', storeOwnerLogin)
// Router.put('/phone-number', isStoreOwner, phoneNumberUpdate)
// Router.post('/contact/add', isStoreOwner, addContacts)
// Router.get('/contact/list', isStoreOwner, getContacts)
// Router.get('/list', isStoreOwner, getStoreOwners)

export default Router

import { Router as ExpressRouter } from 'express'

import { createCompany, deleteCompany, getAllCompanies, getCompanyById, updateCompany } from '../controller/company.Controller'

const router = ExpressRouter()

router.post('/create', createCompany) // Create a new company
router.get('/get-all', getAllCompanies) // Get all companies
router.get('/get/:id', getCompanyById) // Get a single company by ID
router.put('/update/:id', updateCompany) // Update a company by ID
router.delete('/delete/:id', deleteCompany) // Delete a company by ID

export default router

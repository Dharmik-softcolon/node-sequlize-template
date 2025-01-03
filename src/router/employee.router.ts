import { Router as ExpressRouter } from 'express'

import { createEmployee, deleteEmployee, getAllEmployees, getEmployeeById, updateEmployee } from '../controller/employee.Controller'

const router = ExpressRouter()

router.post('/create', createEmployee) // Create a new employee
router.get('/get-all', getAllEmployees) // Get all employees
router.get('/get/:id', getEmployeeById) // Get a single employee by ID
router.put('/update/:id', updateEmployee) // Update an employee by ID
router.delete('/delete/:id', deleteEmployee) // Delete an employee by ID

export default router

import responseMessage from '../constant/responseMessage'
import { Employee } from '../model/employee'
import globalHandler from '../util/globalHandler'
import httpResponse from '../util/httpResponse'

// create Employee
export const createEmployee = globalHandler(async (req, res) => {
    const { name, email, position, companyId } = req.body

    if (!name || !email || !position || !companyId) {
        return void httpResponse(req, res, 400, responseMessage.MISSING_REQUIRED_FIELDS)
    }

    const employee = await Employee.create({ name, email, position, companyId })
    return void httpResponse(req, res, 200, responseMessage.EMPLOYEE_CREATED_SUCCESSFULLY, employee)
})

// get Employee by Id
export const getEmployeeById = globalHandler(async (req, res) => {
    const { id } = req.params

    const employee = await Employee.findByPk(id)

    if (!employee) {
        return void httpResponse(req, res, 404, responseMessage.EMPLOYEE_NOT_FOUND)
    }

    return void httpResponse(req, res, 200, responseMessage.EMPLOYEE_FETCHED_SUCCESSFULLY, employee)
})

// get all Employs
export const getAllEmployees = globalHandler(async (req, res) => {
    const employees = await Employee.findAll()

    return void httpResponse(req, res, 200, responseMessage.EMPLOYEES_FETCHED_SUCCESSFULLY, employees)
})

// Update Employee
export const updateEmployee = globalHandler(async (req, res) => {
    const { id } = req.params
    const { name, email, position, companyId } = req.body

    const employee = await Employee.findByPk(id)

    if (!employee) {
        return void httpResponse(req, res, 404, responseMessage.EMPLOYEE_NOT_FOUND)
    }

    employee.name = name || employee.name
    employee.email = email || employee.email
    employee.position = position || employee.position
    employee.companyId = companyId || employee.companyId

    await employee.save()

    return void httpResponse(req, res, 200, responseMessage.EMPLOYEE_UPDATED_SUCCESSFULLY, employee)
})

// remove Employee
export const deleteEmployee = globalHandler(async (req, res) => {
    const { id } = req.params

    const employee = await Employee.findByPk(id)

    if (!employee) {
        return void httpResponse(req, res, 404, responseMessage.EMPLOYEE_NOT_FOUND)
    }

    await employee.destroy()
    return void httpResponse(req, res, 200, responseMessage.EMPLOYEE_DELETED_SUCCESSFULLY)
})

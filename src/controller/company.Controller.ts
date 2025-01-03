import responseMessage from '../constant/responseMessage'
import { Company } from '../model/company'
import globalHandler from '../util/globalHandler'
import httpResponse from '../util/httpResponse'

// customer register
export const createCompany = globalHandler(async (req, res) => {
    const { name, location } = req.body

    if (!name || !location) {
        return void httpResponse(req, res, 400, responseMessage.NAME_LOCATION_REQUIRE)
    }

    const company = await Company.create({ name, location })
    return void httpResponse(req, res, 200, responseMessage.COMPANY_CREATED_SUCESSFULLY, company)
})

// Get a single company by ID
export const getCompanyById = globalHandler(async (req, res) => {
    const { id } = req.params
    const company = await Company.findByPk(id)

    if (!company) {
        return void httpResponse(req, res, 404, responseMessage.COMPANY_NOT_FOUND)
    }

    return void httpResponse(req, res, 200, responseMessage.COMPANY_GET_SUCESSFULLY, company)
})

// Get all companies
export const getAllCompanies = globalHandler(async (req, res) => {
    const companies = await Company.findAll()
    return void httpResponse(req, res, 200, responseMessage.ALL_COMPANY_GET_SUCESSFULLY, companies)
})

// Update a company by ID
export const updateCompany = globalHandler(async (req, res) => {
    const { id } = req.params
    const { name, location } = req.body

    const company = await Company.findByPk(id)

    if (!company) {
        return void httpResponse(req, res, 404, responseMessage.COMPANY_NOT_FOUND)
    }

    company.name = name || company.name
    company.location = location || company.location
    await company.save()

    return void httpResponse(req, res, 200, responseMessage.COMPANY_UPDATED_SUCESSFULLY, company)
})

// Delete a company by ID
export const deleteCompany = globalHandler(async (req, res) => {
    const { id } = req.params
    const company = await Company.findByPk(id)

    if (!company) {
        return void httpResponse(req, res, 404, responseMessage.COMPANY_NOT_FOUND)
    }

    await company.destroy()
    return void httpResponse(req, res, 200, responseMessage.COMPANY_DELETED_SUCESSFULLY)
})

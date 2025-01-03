import responseMessage from '../constant/responseMessage'
import { comparePasswords, generateTokens, hashPassword } from '../util/auth'
import { convertDatesInResponse } from '../util/functions'
import globalHandler from '../util/globalHandler'
import httpResponse from '../util/httpResponse'

// // shopOwner register
// export const storeOwnerRegisters = globalHandler(async (req, res) => {
//     const data = req?.body
//     // find with Email
//     const userWithEmail = await prisma.store_owner.findUnique({
//         where: {
//             email: data.email
//         }
//     })
//     if (userWithEmail) {
//         return void httpResponse(req, res, 400, responseMessage.EMAIL_ALREADY_EXISTS)
//     }

//     // find with PhoneNumber
//     const userWithPhoneNumber = await prisma.store_owner.findUnique({
//         where: {
//             phone_number: data?.phone_number
//         }
//     })
//     if (userWithPhoneNumber) {
//         return void httpResponse(req, res, 400, responseMessage.PHONE_NUMBER_ALREADY_EXISTS)
//     }

//     const bcryptPassword = await hashPassword(data?.password)
//     await prisma.store_owner.create({
//         data: {
//             name: data.name,
//             email: data.email,
//             password: bcryptPassword,
//             phone_number: data?.phone_number || null
//         }
//     })

//     setTimeout(() => void httpResponse(req, res, 200, responseMessage.USER_CREATED), 1000)
// })

// // shopOwner login
// export const storeOwnerLogin = globalHandler(async (req, res) => {
//     const { email, password } = req.body

//     const user = await prisma.store_owner.findUnique({
//         where: {
//             email
//         }
//     })

//     if (!user) {
//         return void httpResponse(req, res, 404, responseMessage.USER_NOT_FOUND)
//     }

//     const isPasswordMatched = await comparePasswords(password, user.password)

//     if (!isPasswordMatched) {
//         return void httpResponse(req, res, 400, responseMessage.PASSWORD_INVALID)
//     }

//     const tokens = generateTokens(user.id)

//     return void httpResponse(req, res, 200, responseMessage.SUCCESS, tokens)
// })

// // phoneNumber Update
// export const phoneNumberUpdate = globalHandler(async (req, res) => {
//     const userId = req?.userId
//     const phoneNumber = req?.body?.phone_number

//     const user = await prisma.store_owner.findUnique({
//         where: {
//             id: userId
//         }
//     })

//     if (!user) {
//         return void httpResponse(req, res, 404, responseMessage.USER_NOT_FOUND)
//     }

//     // find with PhoneNumber
//     const userWithPhoneNumber = await prisma.store_owner.findUnique({
//         where: {
//             phone_number: phoneNumber
//         }
//     })
//     if (userWithPhoneNumber) {
//         return void httpResponse(req, res, 400, responseMessage.PHONE_NUMBER_ALREADY_EXISTS)
//     }
//     user.phone_number = phoneNumber

//     return void httpResponse(req, res, 200, responseMessage.SUCCESS)
// })

// export const addContacts = globalHandler(async (req, res) => {
//     const userId = req?.userId
//     const data = req?.body

//     const contact = await prisma.contacts.findFirst({
//         where: {
//             store_owner_id: userId,
//             OR: [{ phone_number: data?.phone_number }, { email: data?.email }]
//         }
//     })

//     if (contact) {
//         return void httpResponse(req, res, 400, responseMessage.CONTACT_EXISTS)
//     }

//     await prisma.contacts.create({
//         data: {
//             store_owner_id: userId,
//             name: data?.name,
//             email: data?.email,
//             phone_number: data?.phone_number,
//             gender: data?.gender,
//             address: data?.address || null,
//             tag: data?.tags || null
//         }
//     })
//     return void httpResponse(req, res, 200, responseMessage.CONTACT_CREATED)
// })

// export const getContacts = globalHandler(async (req, res) => {
//     const userId = req?.userId

//     const contact = await prisma.contacts.findMany({
//         where: {
//             store_owner_id: userId
//         },
//         select: {
//             id: true,
//             name: true,
//             email: true,
//             // phone_number: true,
//             gender: true,
//             address: true,
//             tag: true,
//             add_date: true,
//             updated_at: true,
//             store_owner: {
//                 select: {
//                     id: true,
//                     name: true
//                 }
//             }
//         }
//     })

//     if (contact.length === 0) {
//         return void httpResponse(req, res, 400, responseMessage.CONTACT_NOT_EXISTS)
//     }

//     const result = await convertDatesInResponse(contact, 'Asia/Kolkata')

//     return void httpResponse(req, res, 200, responseMessage.CONTACT_GET_SUCESS, result)
// })

// export const getStoreOwners = globalHandler(async (req, res) => {
//     const userId = req?.userId

//     const contact = await prisma.store_owner.findMany({
//         select: {
//             id: true,
//             name: true,
//             email: true,
//             updated_at: true,
//             created_at: true
//         }
//     })

//     if (contact.length === 0) {
//         return void httpResponse(req, res, 400, responseMessage.CONTACT_NOT_EXISTS)
//     }

//     const result = await convertDatesInResponse(contact, 'Asia/Kolkata')

//     return void httpResponse(req, res, 200, responseMessage.CONTACT_GET_SUCESS, result)
// })

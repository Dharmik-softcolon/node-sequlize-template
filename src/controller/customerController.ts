import responseMessage from '../constant/responseMessage'
import User from '../model/company'
import { comparePasswords, generateTokens, hashPassword } from '../util/auth'
import globalHandler from '../util/globalHandler'
import httpResponse from '../util/httpResponse'

// // customer register
// export const customerRegister = globalHandler(async (req, res) => {
//     const data = req?.body

//     if (!data.phone_number) {
//         return void httpResponse(req, res, 400, responseMessage.PHONE_NUMBER_REQUIRE)
//     }

//     // find with Email
//     const userWithEmail = await User.findUnique({
//         where: {
//             email: data.email
//         }
//     })
//     if (userWithEmail) {
//         return void httpResponse(req, res, 400, responseMessage.EMAIL_ALREADY_EXISTS)
//     }

//     // find with PhoneNumber
//     const userWithPhoneNumber = await prisma.customer.findUnique({
//         where: {
//             phone_number: data.phone_number
//         }
//     })
//     if (userWithPhoneNumber) {
//         return void httpResponse(req, res, 400, responseMessage.PHONE_NUMBER_ALREADY_EXISTS)
//     }

//     const bcryptPassword = await hashPassword(data?.password)
//     await prisma.customer.create({
//         data: {
//             name: data.name,
//             email: data.email,
//             password: bcryptPassword,
//             phone_number: data.phone_number
//         }
//     })
//     return void httpResponse(req, res, 200, responseMessage.USER_CREATED)
// })

// // customer login
// export const customerLogin = globalHandler(async (req, res) => {
//     const { email, password } = req.body

//     const user = await prisma.customer.findUnique({
//         where: {
//             email
//         }
//     })

//     if (!user) {
//         return void httpResponse(req, res, 404, responseMessage.USER_NOT_FOUND)
//     }

//     if (!user.password) {
//         return void httpResponse(req, res, 400, responseMessage.PASSWORD_NOT_SET)
//     }

//     const isPasswordMatched = await comparePasswords(password, user.password)

//     if (!isPasswordMatched) {
//         return void httpResponse(req, res, 400, responseMessage.PASSWORD_INVALID)
//     }

//     const tokens = generateTokens(user.id)

//     return void httpResponse(req, res, 200, responseMessage.SUCCESS, tokens)
// })

// import User from './models/user';

// (async () => {
//   // Create a user
//   await User.create({ name: 'John Doe', email: 'john@example.com' });

//   // Fetch all users
//   const users = await User.findAll();
//   console.log(users);
// })();

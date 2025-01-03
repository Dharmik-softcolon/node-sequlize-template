/* eslint-disable @typescript-eslint/no-explicit-any */
// src/utils/auth.ts

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import config from '../config/config'

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

export const generateOTP = (): string => String(Math.floor(100000 + Math.random() * 900000))

export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => bcrypt.compare(password, hashedPassword)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const generateTokens = (id: string) => {
    const accessToken = jwt.sign({ id }, config.JWT_ACCESS_SECRET, { expiresIn: '30m' })
    const refreshToken = jwt.sign({ id }, config.JWT_REFRESH_SECRET, { expiresIn: '24h' })
    return { accessToken, refreshToken }
}

// export const verifyToken = (token: string): any => jwt.verify(token, config.JWT_ACCESS_SECRET)

export const verifyAccessToken = (token: string): any => jwt.verify(token, config.JWT_ACCESS_SECRET)

export const extractNameFromEmail = (email: string): string => email.split('@')[0]

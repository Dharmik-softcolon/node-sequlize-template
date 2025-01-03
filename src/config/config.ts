import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

// Define the database configuration interface for type safety
interface DatabaseConfig {
    username: string
    password: string
    database: string
    host: string
    dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql'
}

// Define the complete configuration interface
interface Config {
    ENV: string
    PORT: string
    RATE_LIMIT?: string

    // Database configurations
    database: {
        development: DatabaseConfig
        test: DatabaseConfig
        production: DatabaseConfig
    }

    // Maintenance mode
    MAINTENANCE_STATUS: string

    // Header
    TOKEN_HEADER_NAME: string
    JWT_ACCESS_SECRET: string
    JWT_REFRESH_SECRET: string
    TOKEN_SECRET: string

    // Logger
    LOG_DATE: string

    // Email
    ALERT_EMAIL_SENDER: string
    ALERT_EMAIL_PASSWORD: string
    ALERT_EMAIL_RECIVER: string
}

// Combine all configurations into one object
const config: Config = {
    // General
    ENV: process.env.ENV ?? 'development',
    PORT: process.env.PORT ?? '3000',
    RATE_LIMIT: process.env.RATE_LIMIT,

    // Database configurations
    database: {
        development: {
            username: process.env.DB_DEV_USERNAME ?? 'root',
            password: process.env.DB_DEV_PASSWORD ?? '',
            database: process.env.DB_DEV_NAME ?? 'database_development',
            host: process.env.DB_DEV_HOST ?? '127.0.0.1',
            dialect: 'postgres'
        },
        test: {
            username: process.env.DB_TEST_USERNAME ?? 'root',
            password: process.env.DB_TEST_PASSWORD ?? '',
            database: process.env.DB_TEST_NAME ?? 'database_test',
            host: process.env.DB_TEST_HOST ?? '127.0.0.1',
            dialect: 'postgres'
        },
        production: {
            username: process.env.DB_PROD_USERNAME ?? 'root',
            password: process.env.DB_PROD_PASSWORD ?? '',
            database: process.env.DB_PROD_NAME ?? 'database_production',
            host: process.env.DB_PROD_HOST ?? '127.0.0.1',
            dialect: 'postgres'
        }
    },

    // Maintenance mode
    MAINTENANCE_STATUS: process.env.MAINTENANCE_MODE ?? 'off',

    // Header
    TOKEN_HEADER_NAME: process.env.TOKEN_HEADER_NAME ?? 'Authorization',
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET ?? 'access_secret',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ?? 'refresh_secret',
    TOKEN_SECRET: process.env.TOKEN_SECRET ?? 'token_secret',

    // Logger
    LOG_DATE: process.env.LOG_DATE ?? new Date().toISOString(),

    // Email
    ALERT_EMAIL_SENDER: process.env.ALERT_EMAIL_USER ?? '',
    ALERT_EMAIL_PASSWORD: process.env.ALERT_EMAIL_PASSWORD ?? '',
    ALERT_EMAIL_RECIVER: process.env.ALERT_EMAIL_RECIPIENT ?? ''
}

export default config

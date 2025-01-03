import config from '../config/config'

export enum EApplicationEnvironment {
    PRODUCTION = 'production',
    STAGING = 'staging',
    DEVELOPMENT = 'development'
}

export const isDevelopment = config.ENV === EApplicationEnvironment.DEVELOPMENT

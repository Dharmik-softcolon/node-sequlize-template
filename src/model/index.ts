import { Sequelize } from 'sequelize'

import config from '../config/config'

const env = config.ENV // Use the environment from the unified config
const dbConfig = config.database[env as keyof typeof config.database]

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect
})

export default sequelize

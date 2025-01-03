import { DataTypes, Model } from 'sequelize'

import sequelize from './index'

export interface CompanyAttributes {
    id?: number
    name: string
    location: string
    createdAt?: Date
    updatedAt?: Date
}

export class Company extends Model<CompanyAttributes> implements CompanyAttributes {
    public id!: number
    public name!: string
    public location!: string
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

Company.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'companies',
        modelName: 'Company'
    }
)

export default Company

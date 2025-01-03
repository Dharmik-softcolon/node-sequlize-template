import { DataTypes, Model } from 'sequelize'

import {Company} from './company'
import sequelize from './index'

export interface EmployeeAttributes {
    id: number
    firstName: string
    lastName: string
    companyId: number
    createdAt?: Date
    updatedAt?: Date
}

export class Employee extends Model<EmployeeAttributes> implements EmployeeAttributes {
    public id!: number
    public firstName!: string
    public lastName!: string
    public companyId!: number
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

Employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        companyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Company,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        tableName: 'employees',
        modelName: 'Employee'
    }
)

// Establish relationship
Employee.belongsTo(Company, { foreignKey: 'companyId' })
Company.hasMany(Employee, { foreignKey: 'companyId' })

export default Employee

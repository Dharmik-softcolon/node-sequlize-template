import { DataTypes, Model } from 'sequelize'

import sequelize from './index'

export interface EmployeeAttributes {
    id?: number
    name: string
    email: string
    position: string
    companyId: number
    createdAt?: Date
    updatedAt?: Date
}

export class Employee extends Model<EmployeeAttributes> implements EmployeeAttributes {
    public id!: number
    public name!: string
    public email!: string
    public position!: string
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
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false
        },
        companyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'companies',
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

export default Employee

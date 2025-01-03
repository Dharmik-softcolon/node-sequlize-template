export const HTTP_STATUSES = {
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    PAYLOAD_LARGE: 413,
    TOO_MANY_REQUESTS: 429,
    SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503
} as const

export default {
    SOMETHING_WENT_WRONG: `An error occurred!`,
    NOT_FOUND: (entity: string): string => `${entity} not found`,
    TOO_MANY_REQUESTS: `Too many requests! Please try again later.`,
    INVALID_REQUEST: (entity: string): string => `Invalid ${entity} request`,
    GET_SUCCESS: (entity: string): string => `Successfully retrieved ${entity}`,
    GET_ERROR: (entity: string): string => `An error occurred while retrieving ${entity}`,
    CREATE_SUCCESS: (entity: string): string => `Successfully created ${entity}`,
    UPDATE_SUCCESS: (entity: string): string => `Successfully updated ${entity}`,
    DELETE_SUCCESS: (entity: string): string => `Successfully deleted ${entity}`,
    ALREADY_EXISTS: (entity: string): string => `${entity} already exists`,

    validation: {
        required: '{#label} is required',
        email: 'Please provide a valid email address',
        min: '{#label} must be at least {#limit} characters long',
        max: '{#label} must be at most {#limit} characters long',
        tokenRequired: 'Token is required',
        otpRequired: 'OTP is required',
        invalidBoolean: 'Invalid boolean value'
    },

    IN_MAINTENANCE_MODE: 'The server is currently in maintenance mode, Please try after sometime!',

    // token
    INVALID_TOKEN: 'Invalid token',
    TOKEN_VERIFIED: 'Token verified successfully',

    // auth
    UNAUTHORIZED_ERROR: 'Unauthorized',
    SUCCESS: 'Operation successful',

    // user
    USER_EXISTS: `User already exists`,
    USER_CREATED: 'User created successfully.',
    USER_REMOVED_SUCCESS: 'User removed successfully',
    USER_FOUND: 'User found',
    USER_NOT_FOUND: 'User not found',
    USER_IS_NOT_VALID: 'User is not valid',

    // otp
    INVALID_OTP: 'Invalid OTP',
    OTP_SEND_SUCCESS: 'OTP sent successfully',
    OTP_VERIFIED: 'OTP verified successfully',

    // password
    PASSWORD_CAN_NOT_CHANGE: 'Password cannot be changed',
    PASSWORD_SET_SUCCESS: 'Password set successfully',
    PASSWORD_NOT_SET: 'Password has not been set',
    PASSWORD_INVALID: 'Invalid Password',

    // email
    EMAIL_ALREADY_EXISTS: 'This email is already registered',

    // require
    FILE_REQUIRED: 'File is required',
    PHONE_NUMBER_REQUIRE: 'phone number is required.',
    NAME_LOCATION_REQUIRE: 'Name and location are required.',

    // Company
    COMPANY_CREATED_SUCESSFULLY: 'Company created sucessfully.',
    COMPANY_GET_SUCESSFULLY: 'Company get sucessfully.',
    ALL_COMPANY_GET_SUCESSFULLY: 'All Company get sucessfully.',
    COMPANY_UPDATED_SUCESSFULLY: 'Company updated sucessfully.',
    COMPANY_DELETED_SUCESSFULLY: 'Company deleted successfully.',
    COMPANY_NOT_FOUND: ' Company not found',

    // Employee
    MISSING_REQUIRED_FIELDS: 'All required fields must be provided.',
    EMPLOYEE_CREATED_SUCCESSFULLY: 'Employee created successfully.',
    EMPLOYEE_FETCHED_SUCCESSFULLY: 'Employee fetched successfully.',
    EMPLOYEES_FETCHED_SUCCESSFULLY: 'All employees fetched successfully.',
    EMPLOYEE_UPDATED_SUCCESSFULLY: 'Employee updated successfully.',
    EMPLOYEE_DELETED_SUCCESSFULLY: 'Employee deleted successfully.',
    EMPLOYEE_NOT_FOUND: 'Employee not found.'
}

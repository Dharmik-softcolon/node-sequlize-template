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

    IN_MAINTENANCE_MODE: 'The server is currently in maintenance mode, Please try after sometime!',

    USER_EXISTS: `User already exists`,
    USER_NAME_REQUIRED: `Name is required`,

    INVALID_TOKEN: 'Invalid token',
    TOKEN_VERIFIED: 'Token verified successfully',

    INVALID_OTP: 'Invalid OTP',

    validation: {
        required: '{#label} is required',
        email: 'Please provide a valid email address',
        min: '{#label} must be at least {#limit} characters long',
        max: '{#label} must be at most {#limit} characters long',
        tokenRequired: 'Token is required',
        otpRequired: 'OTP is required',
        invalidBoolean: 'Invalid boolean value'
    },

    UNAUTHORIZED_ERROR: 'Unauthorized',
    USER_NOT_FOUND: 'User not found',
    USER_PASSWORD_EXISTS: 'User already has a password set',
    USER_FOUND: 'User found',
    USER_CREATED: 'User created successfully.',
    SUCCESS: 'Operation successful',
    OTP_SEND_SUCCESS: 'OTP sent successfully',
    OTP_VERIFIED: 'OTP verified successfully',

    USER_PROFILE_GET_SUCCESS: 'User profile retrieved successfully',
    USER_SURVEY_FORM_SUCCESS: 'Survey form submitted successfully',
    USER_PROFILE_UPDATE_SUCCESS: 'User profile updated successfully',
    USER_SURVEY_FORM_ALREADY_FILLED: 'User has already filled out the survey form',

    PASSWORD_CAN_NOT_CHANGE: 'Password cannot be changed',
    PASSWORD_SET_SUCCESS: 'Password set successfully',
    PASSWORD_NOT_SET: 'Password has not been set',
    PASSWORD_INVALID: 'Invalid Password',

    SURVEY_FORM_NOT_FILLED: 'Survey form not filled',
    EMAIL_ALREADY_EXISTS: 'This email is already registered',

    PHONE_NUMBER_ALREADY_EXISTS: 'This phone number is already registered',

    FILE_REQUIRED: 'File is required',

    USER_IS_NOT_VALID: 'User is not valid',
    USER_REMOVED_SUCCESS: 'User removed successfully',
    ALREADY_MEMBER: 'Already a member',
    MEMBER_ADD_SUCCESS: 'Member added successfully',
    ONLY_ADMIN_CAN_ADD_NEW_ADMIN: 'Only administrators can add new administrators',
    USER_IS_NOT_MEMBER: 'User is not a member',
    MEMBER_REMOVE_SUCCESS: 'Member removed successfully',
    MEMBER_UPDATE_SUCCESS: 'Member updated successfully',

    CONTACT_EXISTS: 'Contact already exists.',
    CONTACT_NOT_EXISTS: 'Contact not exists.',

    CONTACT_CREATED: 'Contact created successfully.',
    CONTACT_GET_SUCESS: 'Contact Get successfully.',

    PHONE_NUMBER_REQUIRE: 'phone number is required.'
}

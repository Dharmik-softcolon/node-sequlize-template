/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateTime } from 'luxon'

/**
 * Recursively traverses an object or array to find and convert date fields.
 * @param data - The object or array to process.
 * @param timeZone - The target timezone (e.g., 'Asia/Tokyo', 'Asia/Kolkata').
 * @returns The transformed object or array with dates converted.
 */
export const convertDatesInResponse = (data: any, timeZone: string): any => {
    if (Array.isArray(data)) {
        return data.map((item) => convertDatesInResponse(item, timeZone))
    }
    if (data && typeof data === 'object') {
        return Object.fromEntries(
            Object.entries(data).map(([key, value]) => {
                // Check if the value is a valid date string or Date object
                if (typeof value === 'string' || typeof value === 'number' || value instanceof Date) {
                    // Try to create a DateTime object from the value
                    const dateTime = DateTime.fromJSDate(new Date(value))
                    if (dateTime.isValid) {
                        // Convert to the specified time zone and format it
                        return [key, dateTime.setZone(timeZone).toFormat('yyyy-MM-dd HH:mm:ss')]
                    }
                }
                // If not a date, keep the value as is
                return [key, value]
            })
        )
    }
    return data
}

import nodemailer from 'nodemailer'

import config from './config/config'
import logger from './util/logger'

// Create a transport for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.ALERT_EMAIL_SENDER,
        pass: config.ALERT_EMAIL_PASSWORD
    }
})

// Function to send email notification
export const sendEmailNotification = async (subject: string, text: string): Promise<void> => {
    const mailOptions = {
        from: config.ALERT_EMAIL_SENDER,
        to: config.ALERT_EMAIL_RECIVER,
        subject,
        text
    }

    try {
        await transporter.sendMail(mailOptions)
        logger.info(`Successfully sent email notification to: ${config.ALERT_EMAIL_RECIVER}`)
    } catch (error) {
        logger.info('Error sending email:', error)
    }
}

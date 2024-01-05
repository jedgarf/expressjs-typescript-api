import dotenv from 'dotenv';
dotenv.config();

// Email Configuration
export const mailer_host: string = process.env.EMAIL_HOST || '';
export const mailer_port: string = process.env.EMAIL_PORT || '';
export const mailer_secure: string = process.env.EMAIL_SECURE || '';
export const mailer_username: string = process.env.EMAIL_USERNAME || '';
export const mailer_password: string = process.env.EMAIL_PASSWORD || '';
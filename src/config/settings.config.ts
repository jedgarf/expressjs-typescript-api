import dotenv from 'dotenv';
dotenv.config();

export const apiKey: string = process.env.API_KEY || '';

// 0 means disabled
export const apicache_min: unknown = process.env.APICACHE_MIN || 0;

// DB Configuration
if (process.env.NODE_ENV === "PRODUCTION") {
    
    var host: string = process.env.PROD_MYSQL_HOST || '';
    var user: string = process.env.PROD_MYSQL_USER || '';
    var password: string = process.env.PROD_MYSQL_PASSWORD || '';
    var db: string = process.env.PROD_MYSQL_DB || '';
    var dialect: any = process.env.PROD_MYSQL_DIALECT || '';
    var pool: any = {
                    max: process.env.PROD_MYSQL_POOL_MAX || 5,
                    min: process.env.PROD_MYSQL_POOL_MIN || 1,
                    acquire: process.env.PROD_MYSQL_POOL_ACQUIRE || 0,
                    idle: process.env.PROD_MYSQL_POOL_IDLE || 0
                };

} else {
    
    var host: string = process.env.DEV_MYSQL_HOST || '';
    var user: string = process.env.DEV_MYSQL_USER || '';
    var password: string = process.env.DEV_MYSQL_PASSWORD || '';
    var db: string = process.env.DEV_MYSQL_DB || '';
    var dialect: any = process.env.DEV_MYSQL_DIALECT || '';
    var pool: any = {
                    max: process.env.DEV_MYSQL_POOL_MAX || 5,
                    min: process.env.DEV_MYSQL_POOL_MIN || 1,
                    acquire: process.env.DEV_MYSQL_POOL_ACQUIRE || 0,
                    idle: process.env.DEV_MYSQL_POOL_IDLE || 0
                };

}

export const mysql_host = host;
export const mysql_user = user;
export const mysql_password = password;
export const mysql_db = db;
export const mysql_dialect = dialect;
export const mysql_pool = pool;

export const mailer_host: string = process.env.EMAIL_HOST || '';
export const mailer_port: string = process.env.EMAIL_PORT || '';
export const mailer_secure: string = process.env.EMAIL_SECURE || '';
export const mailer_username: string = process.env.EMAIL_USERNAME || '';
export const mailer_password: string = process.env.EMAIL_PASSWORD || '';
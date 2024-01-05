import dotenv from 'dotenv';

// Config
import * as config from "./api.config";

dotenv.config();

// DB Configuration
if (config.env === "PRODUCTION") {
    
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
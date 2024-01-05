import dotenv from 'dotenv';
dotenv.config();

export const env: string = process.env.NODE_ENV || 'DEVELOPMENT';
export const apiKey: string = process.env.API_KEY || '';
export const secretAccessKey: string = process.env.SECRET_ACCESS_KEY || '';
export const secretRefreshKey: string = process.env.SECRET_REFRESH_KEY || '';

// 0 means disabled
export const apicache_min: unknown = process.env.APICACHE_MIN || 0;
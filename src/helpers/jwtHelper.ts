import { sign, verify, Secret } from 'jsonwebtoken';
import config from '../config';

const secretKey: Secret = config.api.secretAccessKey;
const refreshSecretKey: Secret = config.api.secretRefreshKey;

interface userTypes {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

interface verifyTokenTypes {
  status: boolean;
  access_token?: string;
}

export const generateAccessToken = (payload: Record<string, any>): string => {
  return sign(payload, secretKey, { expiresIn: '15m' });
};

export const generateRefreshToken = (payload: Record<string, any>): string => {
  return sign(payload, refreshSecretKey);
};

export const verifyAccessToken = (token: string): verifyTokenTypes => {
  let response = { status: false, accessToken: '' };
  verify(token, secretKey, (err, user) => {
    if (err) {
      response = { status: false, accessToken: '' };
    } else {
      const accessToken = sign({ id: (user as userTypes).id, email: (user as userTypes).email }, secretKey, {
        expiresIn: '15m',
      });
      response = { status: true, accessToken: accessToken };
    }
  });
  return response;
};

export const verifyRefreshToken = (refreshToken: string): verifyTokenTypes => {
  let response = { status: false, accessToken: '' };
  verify(refreshToken, refreshSecretKey, (err, user) => {
    if (err) {
      response = { status: false, accessToken: '' };
    } else {
      const accessToken = sign({ id: (user as userTypes).id, email: (user as userTypes).email }, secretKey, {
        expiresIn: '15m',
      });
      response = { status: true, accessToken: accessToken };
    }
  });
  return response;
};

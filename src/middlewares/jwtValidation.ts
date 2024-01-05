import { Request, Response, NextFunction } from 'express';
import helper from '../helpers';

const jwtValidation = (req: Request, res: Response, next: NextFunction) => {

  const accessTokenCookie = req.cookies.access_token;
  if (!accessTokenCookie) {
    return res.status(401).json({ status: false, message: 'Unauthorized - Access token not provided' });
  }

  // Verify the token and decode its payload
  const accessToken = helper.jwt.verifyAccessToken(accessTokenCookie);
  if (accessToken.status === false) {
    const refreshTokenCookie = req.cookies.refresh_token;
    const refreshToken = helper.jwt.verifyRefreshToken(refreshTokenCookie);
    if (refreshToken.status === false) {
      return res.status(401).json({ status: false, message: 'Unauthorized - Invalid access token' }); 
    } else {
      res.cookie('access_token', refreshToken.access_token, { httpOnly: true });
    }
  }
  next();

};

export default jwtValidation;
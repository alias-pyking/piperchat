import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT;
export const jwtRefreshSignature = process.env.JWT_REFRESH_SIGNATURE;
export const jwtSignature = process.env.JWT_SIGNATURE;

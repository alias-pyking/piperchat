import jwt from 'jsonwebtoken';
import { jwtRefreshSignature, jwtSignature } from '../../config.js';

export const getJWT = payload => jwt.sign(payload, jwtSignature, { expiresIn: '10d'});

export const getRefresh = payload => jwt.sign(payload, jwtRefreshSignature, { expiresIn: '30d' });

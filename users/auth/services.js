import bcrypt from 'bcrypt';
import { AuthenticationError } from '../../common/errors.js';
import { userGet } from '../services.js';
import { getJWT, getRefresh } from './jwt-utils.js';

export async function login(username, email, password) {
  let user;

  if (username) {
    user = await userGet({ where: { username } });
  } else {
    user = await userGet({ where: email });
  }

  if (!user) {
    throw new AuthenticationError('No user found with provided credentials.');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new AuthenticationError('Invalid credentials provided.');
  }

  const payload = { id: `${user.id}n` };
  const accessToken = getJWT(payload);
  const refreshToken = getRefresh(payload);
  return { user, accessToken, refreshToken };
}

import jwt from 'jsonwebtoken';
import User from '../models/User';

export const generateAuthToken = (user: User, secret: string) => {
  return jwt.sign({ userId: user.id }, secret, { expiresIn: '2 days' });
};

import jwt from 'jsonwebtoken';
import { Models } from '../models';

export const getAuthUser = async (authToken: string, secret: string, models: Models) => {
  if (!authToken) {
    return null;
  }

  try {
    const payload = jwt.verify(authToken, secret) as { userId: number };
  
    if (!payload.userId) {
      return null;
    }

    return models.User.findByPk(payload.userId, { raw: true });
  } catch (error) {
    console.log(error);

    return null;
  }
};

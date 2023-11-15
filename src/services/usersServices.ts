import envVars from '../configs';
import { LoginData, UserData } from '../types/usersTypes';

export const login = async (
  body: LoginData
) => {
  const response = await fetch(`${envVars.API_HOST}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    return response.json() as Promise<UserData>;
  }
  return null
};

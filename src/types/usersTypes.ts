export interface UserData {
  email: string;
  password: string;
  id: number;
  first_name: string;
  last_name: string;
  token: string;
  is_admin: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

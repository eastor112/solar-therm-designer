import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { LoginData, UserData } from '../types/usersTypes';
import { loginRequest, validateTokenRequest } from '../services/usersServices';

interface UIState {
  userData: UserData | null;
  setUserData: (userData: UserData | null) => void;
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
  setError: (error: string | null) => void;
  loginUser: (loginData: LoginData) => Promise<void>;
  validateToken: (token: string) => Promise<UserData | null>;
  logout: () => void;
}

export const useUserStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        userData: null,

        setUserData: (userData: UserData | null) => set({ userData }),

        isAuthenticated: false,

        token: null,

        error: null,

        setError: (error: string | null) => {
          set({ error });
        },

        loginUser: async (loginData: LoginData) => {
          const userData = await loginRequest(loginData);

          if (userData) {
            localStorage.setItem('data', JSON.stringify(userData));
            set({
              userData,
              isAuthenticated: true,
              error: null,
              token: userData.token
            });
          } else {
            set({
              userData: null,
              isAuthenticated: false,
              error: "Credenciales incorrectas",
              token: null
            });
          }
        },

        validateToken: async (token: string) => {
          const userData = await validateTokenRequest(token);
          if (userData) {
            localStorage.setItem('data', JSON.stringify(userData));
          }
          return userData;
        },

        logout: () => {
          localStorage.removeItem('data');
          set({
            userData: null,
            isAuthenticated: false,
            token: null,
            error: null
          });
        },
      }),
      {
        name: 'userStore',
      },
    ),
  ),
)

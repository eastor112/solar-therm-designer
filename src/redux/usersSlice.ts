import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginData, UserData } from '../types/usersTypes';
import { loginRequest, validateTokenRequest } from '../services/usersServices';

export const loginUser = createAsyncThunk(
  'users/login',
  async (loginData: LoginData) => {
    const userData = await loginRequest(loginData);
    if (userData) {
      localStorage.setItem('data', JSON.stringify(userData));
    }
    return userData;
  }
);

export const validateToken = createAsyncThunk(
  'users/refresh',
  async (token: string) => {
    const userData = await validateTokenRequest(token);
    if (userData) {
      localStorage.setItem('data', JSON.stringify(userData));
    }
    return userData;
  }
);

interface ILocationsState {
  userData: UserData | null;
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
}

const initialState: ILocationsState = {
  userData: null,
  isAuthenticated: false,
  token: null,
  error: null,
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("data")
      state.userData = null;
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
    },
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.userData = action.payload;
          state.isAuthenticated = true;
          state.error = null;
          state.token = action.payload.token;
        } else {
          state.userData = null;
          state.isAuthenticated = false;
          state.error = "Credenciales incorrectas"
          state.token = null;
        }
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        if (action.payload) {
          state.userData = action.payload;
          state.isAuthenticated = true;
          state.error = null;
          state.token = action.payload.token;
        } else {
          state.userData = null;
          state.isAuthenticated = false;
          state.error = "Credenciales incorrectas"
          state.token = null;
        }
      })
  },
});

export const {
  setError,
  logout,
  setUserData
} = locationsSlice.actions;

export default locationsSlice.reducer;

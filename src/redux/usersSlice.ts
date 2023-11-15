import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginData, UserData } from '../types/usersTypes';
import { login } from '../services/usersServices';

export const loginUser = createAsyncThunk(
  'designer/calculateParam',
  async (loginData: LoginData) => {
    const userData = await login(loginData);
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
  },
});

export const {
  setError
} = locationsSlice.actions;

export default locationsSlice.reducer;

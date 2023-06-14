import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUIState {
  openModal: boolean;
  theme: 'dark' | 'light';
  version: string;
}

const initialState: IUIState = {
  openModal: false,
  theme: 'light',
  version: '0.3.12',
};

export const UISlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setOpenModal: (state, action: PayloadAction<boolean>) => {
      state.openModal = action.payload;
    },
  },
});

export const { setOpenModal } = UISlice.actions;

export default UISlice.reducer;

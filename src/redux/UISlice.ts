import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUIState {
  openModal: boolean;
}

const initialState: IUIState = {
  openModal: false,
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

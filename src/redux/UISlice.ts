import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUIState {
  openModal: boolean;
  theme: 'dark' | 'light';
  version: string;
  modalComponent: JSX.Element | undefined
}

const initialState: IUIState = {
  openModal: false,
  theme: 'light',
  version: '0.3.12',
  modalComponent: undefined
};

export const UISlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setOpenModal: (state, action: PayloadAction<boolean>) => {
      state.openModal = action.payload;
    },
    setModalComponent: (state, action: PayloadAction<JSX.Element | undefined>) => {
      state.modalComponent = action.payload
    }
  },
});

export const { setOpenModal, setModalComponent } = UISlice.actions;

export default UISlice.reducer;

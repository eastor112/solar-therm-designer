import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IDesignerState {
  data: any;
}

const initialState: IDesignerState = {
  data: {},
};

export const designerSlice = createSlice({
  name: 'designer',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = designerSlice.actions;

export default designerSlice.reducer;

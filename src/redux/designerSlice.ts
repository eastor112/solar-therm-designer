import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IDesignerState {
  data: any;
  city?: string;
  date?: string;
  lat?: number;
  long?: number;
}

const initialState: IDesignerState = {
  data: [],
  city: 'piura',
};

export const designerSlice = createSlice({
  name: 'designer',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setLat: (state, action: PayloadAction<number>) => {
      state.lat = action.payload;
    },
    setLong: (state, action: PayloadAction<number>) => {
      state.long = action.payload;
    },
    setData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const { setData, setDate, setCity, setLat, setLong } =
  designerSlice.actions;

export default designerSlice.reducer;

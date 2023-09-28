import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IDesignerState {
  data: any;
  city?: string;
  date?: string;
  lat?: number;
  long?: number;
  internalDiameter: number;
  externalDiameter: number;
  pipelineLength: number;
  granularity: number,
  pipelineSeparation: number,
  inclination: number,
  azimuth: number
}

const initialState: IDesignerState = {
  data: [],
  city: 'piura',
  internalDiameter: 43.02,
  externalDiameter: 58.36,
  pipelineLength: 1.8,
  granularity: 12,
  pipelineSeparation: 0.2,
  inclination: 30,
  azimuth: 150
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
    setInternalDiameter: (state, action: PayloadAction<number>) => {
      state.internalDiameter = action.payload;
    },
    setExternalDiameter: (state, action: PayloadAction<number>) => {
      state.externalDiameter = action.payload;
    },
    setPipelineLength: (state, action: PayloadAction<number>) => {
      state.pipelineLength = action.payload;
    },
    setGranularity: (state, action: PayloadAction<number>) => {
      state.granularity = action.payload;
    },
    setPipelineSeparation: (state, action: PayloadAction<number>) => {
      state.pipelineSeparation = action.payload;
    },
    setInclination: (state, action: PayloadAction<number>) => {
      state.inclination = action.payload;
    },
    setAzimuth: (state, action: PayloadAction<number>) => {
      state.azimuth = action.payload;
    }
  },
});

export const {
  setData,
  setDate,
  setCity,
  setLat,
  setLong,
  setInternalDiameter,
  setExternalDiameter,
  setPipelineLength,
  setGranularity,
  setPipelineSeparation,
  setInclination,
  setAzimuth
} = designerSlice.actions;

export default designerSlice.reducer;
